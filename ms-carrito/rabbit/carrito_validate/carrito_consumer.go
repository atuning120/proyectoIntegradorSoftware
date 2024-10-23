package carritovalidate

import (
	"bytes"
	"log"
	"time"

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
		"prueba_final", // name
		true,           // durable
		false,          // delete when unused
		false,          // exclusive
		false,          // no-wait
		nil,            // arguments
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

	go func() {
		for d := range msgs {
			log.Printf("Received a message: %s", d.Body)
			dotCount := bytes.Count(d.Body, []byte("."))
			t := time.Duration(dotCount)
			time.Sleep(t * time.Second)
			log.Printf("Done")
			d.Ack(false)
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}
