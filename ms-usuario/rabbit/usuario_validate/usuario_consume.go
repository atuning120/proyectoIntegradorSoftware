package usuariovalidate

import (
	"context"
	"log"
	"time"

	"github.com/atuning120/proyectoIntegradorSoftware/ms-usuario/internal/db"
	"github.com/atuning120/proyectoIntegradorSoftware/ms-usuario/internal/repository"
	"github.com/atuning120/proyectoIntegradorSoftware/ms-usuario/internal/service"
	"github.com/atuning120/proyectoIntegradorSoftware/ms-usuario/rabbit"
	"github.com/streadway/amqp"
)

func ValidarUsuarioRespuesta() {
	conn, err := rabbit.ConnectToRabbit()
	rabbit.FailedailOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	rabbit.FailedailOnError(err, "Failed to connect to RabbitMQ")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"rpc_usuario", // name
		false,         // durable
		false,         // delete when unused
		false,         // exclusive
		false,         // no-wait
		nil,           // arguments
	)
	rabbit.FailedailOnError(err, "Failed to connect to RabbitMQ")

	err = ch.Qos(
		1,     // prefetch count
		0,     // prefetch size
		false, // global
	)
	rabbit.FailedailOnError(err, "Failed to connect to RabbitMQ")

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

	// Busqueda

	client, err := db.ConnectToMongoDB()
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	defer client.Disconnect(ctx)

	db := client.Database("Usuario")

	usuariorepo := repository.NewUsuarioRepository(db)
	usuarioserv := service.NewUsuarioService(usuariorepo)

	go func() {
		for d := range msgs {
			idUsuario := string(d.Body)

			log.Printf(" [.] Validando usuario con ID: %s", idUsuario)
			existe, err := usuarioserv.ValidarUsuario(context.Background(), idUsuario)
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

	log.Printf(" [*] Esperando solicitudes de validación de usuario")
	<-forever
}
