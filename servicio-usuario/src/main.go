package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/atuning120/proyectoIntegradorSoftware/comics-leagues-store/servicio-usuario/src/graph" // Importa graph correctamente
)

const defaultPort = "8080"

func main() {
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

	// Configura las rutas para el Playground y las queries
	http.Handle("/", playground.Handler("GraphQL Playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("Conecta a http://localhost:%s/ para el GraphQL Playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
