package main

import (
	"context"
	"log"

	"github.com/atuning120/proyectoIntegradorSoftware/comics-leagues-store/src/back-end/connection"
)

const defaultPort = "8080"

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
