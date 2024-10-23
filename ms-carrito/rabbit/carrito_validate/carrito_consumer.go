package carritovalidate

import (
	"log"

	"github.com/proyectoIntegradorSoftware/ms-carrito/rabbit"
	"github.com/streadway/amqp"
)

func SendMessage(body string) {

	conn, err := rabbit.ConnectToRabbit()
	rabbit.FailedailOnError(err, "Failed to connect to RabbitMQ")

	ch, err := conn.Channel()
	rabbit.FailedailOnError(err, "Failed to connect to RabbitMQ")

	q, err := ch.QueueDeclare(
		"hello", // name
		false,   // durable
		false,   // delete when unused
		false,   // exclusive
		false,   // no-wait
		nil,     // arguments
	)
	rabbit.FailedailOnError(err, "Failed to connect to RabbitMQ")

	err = ch.Publish(
		"",     // exchange
		q.Name, // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(body),
		})

	rabbit.FailedailOnError(err, "Failed to connect to RabbitMQ")
	log.Printf(" [x] Sent %s\n", body)

	defer ch.Close()
	defer conn.Close()
}
