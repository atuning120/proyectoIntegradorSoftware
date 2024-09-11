// src/servicio-usuario/main.go

package main

import (
	"context"
	"log"

	"github.com/atuning120/proyectoIntegradorSoftware/comics-leagues-store/src/back-end/connection"
)

func main() {

	client, err := connection.ConnectToMongoDB()
	if err != nil {
		log.Fatalf("Fallo en la conexión: %v", err)
	}

	// Asegurarse de desconectar al finalizar
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			log.Fatalf("Error al desconectar de MongoDB: %v", err)
		}
	}()
}
