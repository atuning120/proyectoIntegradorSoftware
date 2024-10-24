package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/atuning120/proyectoIntegradorSoftware/ms-usuario/internal/graph"
	usuariovalidate "github.com/atuning120/proyectoIntegradorSoftware/ms-usuario/rabbit/usuario_validate"
	"github.com/rs/cors"
)

const defaultPort = "8080"

func main() {
	go func() {
		usuariovalidate.ValidarUsuarioRespuesta()
	}()

	port := os.Getenv("PORT")

	if port == "" {
		port = defaultPort
	}

	// Configuración del servidor GraphQL
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{ // Ajusta la llamada con graph.Config
		Resolvers:  &graph.Resolver{},      // Resolver definido en graph/resolver.go
		Directives: graph.DirectiveRoot{},  // Configura las directivas si es necesario
		Complexity: graph.ComplexityRoot{}, // Configura la complejidad si es necesario
	}))

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"}, // Cambia esto a la URL de tu frontend
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
	})

	// Configura las rutas para el Playground y las queries
	http.Handle("/", playground.Handler("GraphQL Playground", "/query"))
	http.Handle("/query", c.Handler(srv))

	log.Printf("Conecta a http://localhost:%s/ para el GraphQL Playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))

}
