package main

import (
	"context"
	"log"

	connection "github.com/proyectoIntegradorSoftware/ms-producto/database"
	rabbit "github.com/proyectoIntegradorSoftware/ms-producto/rabbit"
)

/*const defaultPort = "8082"

func main() {
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
}*/

func main() {
	client, err := connection.ConnectToMongoDB()
	if err != nil {
		log.Fatalf("el error es %v", err)
	}

	conn, err := rabbit.ConnectToRabbit()
	if err != nil {
		log.Fatalf("No se pudo conectar con RabbitMQ %v", err)
	}

	client.Disconnect(context.TODO())
	defer conn.Close()

	log.Println("Conexión exitosa a RabbitMQ")
}
