package main

import (
	"context"
	"fmt"
	"log"

	"github.com/atuning120/proyectoIntegradorSoftware/comics-leagues-store/servicio-producto/src/crud"
	"github.com/atuning120/proyectoIntegradorSoftware/comics-leagues-store/servicio-producto/src/connection" // Importa tu archivo connection
)

func main() {
	// Obtener la conexión a MongoDB desde connection.go
	client, err := connection.ConnectToMongoDB()
	if err != nil {
		log.Fatalf("Error al conectar con MongoDB: %v", err)
	}
	defer client.Disconnect(context.TODO())

	// Crear un producto de ejemplo
	product := crud.Product{
		Nombre:      "Producto de prueba",
		Descripcion: "Este es un producto de ejemplo para pruebas",
		Precio:      19.99,
		Imagen:      "imagen_url",
		Categoria:   "Tentáculos",
		Nivel:       "Avanzado",
		Puntuacion:  4.5,
	}

	// Insertar el producto
	err = crud.CreateProduct(client, product)
	if err != nil {
		log.Fatalf("Error al crear el producto: %v", err)
	} else {
		fmt.Println("Producto creado con éxito")
	}
}
