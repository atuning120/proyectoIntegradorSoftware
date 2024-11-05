package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.55

import (
	"context"
	"fmt"
	"log"
	"time"

	crud "github.com/atuning120/proyectoIntegradorSoftware/ms-usuario/internal/CRUD"
	"github.com/atuning120/proyectoIntegradorSoftware/ms-usuario/internal/db"
	"github.com/atuning120/proyectoIntegradorSoftware/ms-usuario/internal/graph/model"
	usuariovalidate "github.com/atuning120/proyectoIntegradorSoftware/ms-usuario/rabbit/usuario_validate"
	jwt "github.com/golang-jwt/jwt/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

// Login is the resolver for the login field.
func (r *mutationResolver) Login(ctx context.Context, username string, password string) (*model.AuthPayload, error) {
	// Conecta a la base de datos
	client, err := db.ConnectToMongoDB()
	if err != nil {
		log.Println("Error de conexión a la base de datos:", err)
		return nil, fmt.Errorf("error de conexión a la base de datos: %v", err)
	}

	// Define la colección de usuarios
	collection := client.Database("Usuario").Collection("usuario")

	// Busca el usuario por nombre de usuario
	var user bson.M
	filter := bson.M{"username": username}
	err = collection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Println("Usuario no encontrado:", username)
			return nil, fmt.Errorf("usuario o contraseña incorrectos")
		}
		log.Println("Error al buscar el usuario:", err)
		return nil, fmt.Errorf("error al buscar el usuario: %v", err)
	}

	// Verifica la contraseña almacenada
	storedPassword := user["password"].(string)
	log.Println("Contraseña almacenada:", storedPassword) // Asegúrate de que se muestra el hash bcrypt correcto

	// Compara la contraseña ingresada con la almacenada
	if err := bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(password)); err != nil {
		log.Println("Error en la comparación de contraseñas:", err)
		return nil, fmt.Errorf("usuario o contraseña incorrectos")
	}

	// Generar un token JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": user["username"],
		"exp":      time.Now().Add(24 * time.Hour).Unix(), // Expira en 24 horas
	})

	// Firmar el token con la clave secreta
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		log.Println("Error al firmar el token:", err)
		return nil, fmt.Errorf("error al firmar el token: %v", err)
	}

	// Construir el AuthPayload para retornar
	authPayload := &model.AuthPayload{
		Token: tokenString,
		User: &model.User{
			ID:       user["_id"].(primitive.ObjectID).Hex(), // Convertir el ObjectID a string correctamente
			Nombre:   user["nombre"].(string),
			Apellido: user["apellido"].(string),
			Username: user["username"].(string),
			Correo:   user["correo"].(string),
			Telefono: user["telefono"].(string),
			Rol:      user["rol"].(string),
			Edad:     int(user["edad"].(int32)),
		},
	}

	log.Println("Login exitoso para:", username)
	return authPayload, nil
}

// SignUp is the resolver for the signUp field.
func (r *mutationResolver) SignUp(ctx context.Context, input model.NewUserInput) (*model.AuthPayload, error) {
	// Conecta a la base de datos
	client, err := db.ConnectToMongoDB()
	if err != nil {
		return nil, fmt.Errorf("error de conexión a la base de datos: %v", err)
	}
	log.Println("Conectado a MongoDB")

	// Define la colección de usuarios
	collection := client.Database("Usuario").Collection("usuario")

	// Verifica si el correo ya existe
	filterCorreo := bson.M{"correo": input.Correo}
	var existingCorreo bson.M
	err = collection.FindOne(ctx, filterCorreo).Decode(&existingCorreo)
	if err != nil && err != mongo.ErrNoDocuments {
		return nil, fmt.Errorf("error al verificar el correo: %v", err)
	}

	// Si `err` es nil, significa que ya existe un usuario con ese correo
	if err == nil {
		return nil, fmt.Errorf("el correo ya está en uso")
	}

	// Verifica si el usuario ya existe
	filter := bson.M{"username": input.Username}
	var existingUser bson.M
	err = collection.FindOne(ctx, filter).Decode(&existingUser)
	if err != nil && err != mongo.ErrNoDocuments {
		return nil, fmt.Errorf("error al verificar el usuario: %v", err)
	}

	// Si `err` es nil, eso significa que el usuario ya existe
	if err == nil {
		return nil, fmt.Errorf("el usuario ya existe")
	}

	// Hashea la contraseña antes de guardar
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("error al hashear la contraseña: %v", err)
	}

	// Crea un nuevo usuario en la base de datos
	newUser := bson.M{
		"username": input.Username,
		"nombre":   input.Nombre,
		"apellido": input.Apellido,
		"correo":   input.Correo,
		"telefono": input.Telefono,
		"rol":      input.Rol,
		"edad":     input.Edad,
		"password": string(hashedPassword),
	}

	// Inserta el nuevo usuario y maneja posibles errores de duplicado
	insertResult, err := collection.InsertOne(ctx, newUser)
	if err != nil {
		if mongo.IsDuplicateKeyError(err) {
			return nil, fmt.Errorf("el correo ya está en uso")
		}
		return nil, fmt.Errorf("error al crear el usuario: %v", err)
	}

	// Confirmar que el documento se insertó correctamente
	userID := insertResult.InsertedID.(primitive.ObjectID).Hex()
	log.Printf("Usuario insertado con éxito: %v", userID)

	// Aquí llamamos a la función ValidarCarritoRPC para enviar el ID a RabbitMQ y crear el carrito
	creacionExitosa, err := usuariovalidate.ValidarCarritoRPC(userID)
	if err != nil {
		// En caso de error en la comunicación con RabbitMQ, puedes optar por devolver un error
		return nil, fmt.Errorf("error al crear el carrito para el usuario: %v", err)
	}

	if !creacionExitosa {
		return nil, fmt.Errorf("no se pudo crear el carrito para el usuario")
	}

	// Generar un token JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": input.Username,
		"exp":      time.Now().Add(24 * time.Hour).Unix(), // Expira en 24 horas
	})

	// Firmar el token con la clave secreta
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return nil, fmt.Errorf("error al firmar el token: %v", err)
	}

	// Retorna el AuthPayload
	return &model.AuthPayload{
		Token: tokenString,
		User: &model.User{
			ID:       userID,
			Username: input.Username,
			Nombre:   input.Nombre,
			Apellido: input.Apellido,
			Correo:   input.Correo,
			Telefono: input.Telefono,
			Rol:      input.Rol,
			Edad:     input.Edad,
		},
	}, nil
}

// ModificarUsuarioNombre is the resolver for the modificarUsuarioNombre field.
func (r *mutationResolver) ModificarUsuarioNombre(ctx context.Context, idUsuario string, input model.ModificarNombre) (*model.User, error) {
	panic(fmt.Errorf("not implemented: ModificarUsuarioNombre - modificarUsuarioNombre"))
}

// ModificarUsuarioApellido is the resolver for the modificarUsuarioApellido field.
func (r *mutationResolver) ModificarUsuarioApellido(ctx context.Context, idUsuario string, input model.ModificarApellido) (*model.User, error) {
	panic(fmt.Errorf("not implemented: ModificarUsuarioApellido - modificarUsuarioApellido"))
}

// ModificarUsuarioCorreo is the resolver for the modificarUsuarioCorreo field.
func (r *mutationResolver) ModificarUsuarioCorreo(ctx context.Context, idUsuario string, input model.ModificarCorreo) (*model.User, error) {
	panic(fmt.Errorf("not implemented: ModificarUsuarioCorreo - modificarUsuarioCorreo"))
}

// ModificarUsuarioUserName is the resolver for the modificarUsuarioUserName field.
func (r *mutationResolver) ModificarUsuarioUserName(ctx context.Context, idUsuario string, input model.ModificarUserName) (*model.User, error) {
	panic(fmt.Errorf("not implemented: ModificarUsuarioUserName - modificarUsuarioUserName"))
}

// GetUser is the resolver for the getUser field.
func (r *queryResolver) GetUser(ctx context.Context, username string) (*model.User, error) {
	// Conecta a la base de datos
	client, err := db.ConnectToMongoDB()
	if err != nil {
		return nil, fmt.Errorf("error de conexión a la base de datos: %v", err)
	}

	// Usa la función CRUD para obtener el usuario
	filter := bson.M{"username": username}
	userData, err := crud.GetUser(client, filter)
	if err != nil {
		return nil, fmt.Errorf("error al buscar el usuario: %v", err)
	}

	// Construir el objeto User para retornar
	return &model.User{
		ID:       userData["_id"].(string),
		Nombre:   userData["nombre"].(string),
		Apellido: userData["apellido"].(string),
		Username: userData["username"].(string),
		Correo:   userData["correo"].(string),
		Telefono: userData["telefono"].(string),
		Rol:      userData["rol"].(string),
		Edad:     int(userData["edad"].(int32)),
	}, nil
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

var jwtKey = []byte("sixthdimension")
