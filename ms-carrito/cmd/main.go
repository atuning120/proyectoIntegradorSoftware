package main

import (
	"fmt"
	"log"

	carritovalidate "github.com/proyectoIntegradorSoftware/ms-carrito/rabbit/carrito_validate"
)

func main() {

	esValido, err := carritovalidate.ValidarUsuarioRPC("66ec92300a5f7faf06c4adb6")
	if err != nil {
		log.Fatalf("Error llamando a ValidarUsuarioRPC: %v", err)
	}

	if esValido {
		fmt.Println("El usuario es válido")
	} else {
		fmt.Println("El usuario no es válido")
	}
	/*port := os.Getenv("PORT")
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
	log.Fatal(http.ListenAndServe(":"+port, nil))*/

}
