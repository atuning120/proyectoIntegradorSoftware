package consumer

import (
	"log"
	"time"

	productovalidate "github.com/atuning120/proyectoIntegradorSoftware/ms-producto/rabbit/producto_validate"
)

func ProductoConsumidores() {
	go func() {
		for {
			err := productovalidate.ValidarProductoRespuesta()
			if err != nil {
				log.Printf("[x] Error en consumeProducto: %s", err)
			}
			time.Sleep(5 * time.Second)
		}
	}()
}
