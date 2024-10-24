package carritovalidate

import (
	"context"
	"log"
	"time"

	connection "github.com/proyectoIntegradorSoftware/ms-carrito/internal/database"
	"github.com/proyectoIntegradorSoftware/ms-carrito/internal/repository"
	"github.com/proyectoIntegradorSoftware/ms-carrito/internal/services"
	"github.com/proyectoIntegradorSoftware/ms-carrito/rabbit"
	"github.com/streadway/amqp"
)

func CrearCarritoRPC() {

	conn, err := rabbit.ConnectToRabbit()
	rabbit.FailedailOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	rabbit.FailedailOnError(err, "Failed to connect to RabbitMQ")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"rpc_creacion_carrito", // name
		false,                  // durable
		false,                  // delete when unused
		false,                  // exclusive
		false,                  // no-wait
		nil,                    // arguments
	)
	rabbit.FailedailOnError(err, "Failed to connect to RabbitMQ")

	err = ch.Qos(
		1,     // prefetch count
		0,     // prefetch size
		false, // global
	)
	rabbit.FailedailOnError(err, "Failed to set QoS")

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		false,  // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	rabbit.FailedailOnError(err, "Failed to connect to RabbitMQ")

	var forever chan struct{}

	client, err := connection.ConnectToMongoDB()
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Fatalf("Error desconectando MongoDB: %v", err)
		}
	}()

	// Crear contexto con timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Verificar que la conexión a MongoDB es válida
	if err := client.Ping(ctx, nil); err != nil {
		log.Fatalf("No se pudo hacer ping a MongoDB: %v", err)
	}

	db := client.Database("Carrito")
	carritorepo := repository.NewHisotialRepositoryImpl(db)
	carritoService := services.NewServicioHistorialImpl(carritorepo)

	go func() {
		for d := range msgs {
			idUsuario := string(d.Body)

			log.Printf(" [.] Validando usuario con ID: %s", idUsuario)
			existe, err := carritoService.CreacionCarrito(context.Background(), idUsuario)
			if err != nil {
				log.Printf("Error validando usuario: %s", err)
				continue
			}

			respuesta := "false"
			if existe {
				respuesta = "true"
			}

			err = ch.Publish(
				"",        // exchange
				d.ReplyTo, // routing key
				false,     // mandatory
				false,     // immediate
				amqp.Publishing{
					ContentType:   "text/plain",
					CorrelationId: d.CorrelationId,
					Body:          []byte(respuesta),
				})
			rabbit.FailedailOnError(err, "Failed to publish a message")

			// Confirmar que el mensaje ha sido procesado
			d.Ack(false)
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}
