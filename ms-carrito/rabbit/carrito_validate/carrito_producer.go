package carritovalidate

import (
	"log"

	"github.com/proyectoIntegradorSoftware/ms-carrito/rabbit"
)

func ReceiveMessage() {

	conn, err := rabbit.ConnectToRabbit()
	rabbit.FailedailOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	rabbit.FailedailOnError(err, "Failed to connect to RabbitMQ")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"hello", // name
		false,   // durable
		false,   // delete when unused
		false,   // exclusive
		false,   // no-wait
		nil,     // arguments
	)
	rabbit.FailedailOnError(err, "Failed to connect to RabbitMQ")

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		true,   // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	rabbit.FailedailOnError(err, "Failed to connect to RabbitMQ")

	var forever chan struct{}

	go func() {
		for d := range msgs {
			log.Printf("Received a message: %s", d.Body)
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}
