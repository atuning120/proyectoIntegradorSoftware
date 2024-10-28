package consumer

import (
	"log"
	"time"

	carritovalidate "github.com/proyectoIntegradorSoftware/ms-carrito/rabbit/carrito_validate"
)

func ConsumerInit() {
	go func() {
		for {
			err := carritovalidate.CrearCarritoRPC()
			if err != nil {
				log.Printf("[x] Error en consumeProducto: %s", err)
			}
			time.Sleep(5 * time.Second)
		}
	}()
}
