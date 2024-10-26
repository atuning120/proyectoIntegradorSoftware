package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/proyectoIntegradorSoftware/ms-carrito/internal/graph"
	carritovalidate "github.com/proyectoIntegradorSoftware/ms-carrito/rabbit/carrito_validate"
	"github.com/rs/cors"
)

const defaultPort = "8082"

func main() {

	go func() {
		carritovalidate.CrearCarritoRPC()
	}()

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

	// Habilitar CORS para permitir solicitudes del frontend (localhost:3000)
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
		Debug:            true,
	})

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", c.Handler(srv))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))

}
