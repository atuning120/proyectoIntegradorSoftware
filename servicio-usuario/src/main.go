package main

import (
	"log"

	crud "github.com/atuning120/proyectoIntegradorSoftware/comics-leagues-store/src/back-end/CRUD"
	"github.com/atuning120/proyectoIntegradorSoftware/comics-leagues-store/src/back-end/connection"
	"go.mongodb.org/mongo-driver/bson"
)

const defaultPort = "8080"

func main() {

	client, err := connection.ConnectToMongoDB()
	if err != nil {
		log.Fatalf("Fallo en la conexión: %v", err)
	}

	filter := bson.M{
		"nombre":   "Marcos Chait",
		"edad":     900,
		"correo":   "marcos.chait@ucn.cl",
		"username": "marcosc",
		"password": "ancientknowledge", // Encriptar la contraseña antes de almacenar
		"apellido": "Chait",
		"telefono": "1010101010",
		"rol":      "profesor", // Puede ser "admin", "profesor", "alumno"
	}
	crud.CreateUser(client, filter)

	/*port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))*/
}
