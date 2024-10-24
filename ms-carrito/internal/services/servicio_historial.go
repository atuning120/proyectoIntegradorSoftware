package services

import (
	"context"
	"fmt"

	"github.com/proyectoIntegradorSoftware/ms-carrito/internal/models"
	"github.com/proyectoIntegradorSoftware/ms-carrito/internal/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ServicioHistorial interface {
	CreacionCarrito(ctx context.Context, idUsuario string) (bool, error)
}

type ServicioHistorialImpl struct {
	Repository repository.HistorialRepository
}

func NewServicioHistorialImpl(repository repository.HistorialRepository) *ServicioHistorialImpl {
	return &ServicioHistorialImpl{
		Repository: repository,
	}
}

func (s *ServicioHistorialImpl) CreacionCarrito(ctx context.Context, idUsuario string) (confirmacion bool, err error) {
	objectID, err := primitive.ObjectIDFromHex(idUsuario)
	if err != nil {
		return false, fmt.Errorf("error al convertir idUsuario a ObjectID: %v", err)
	}

	historial := models.Historial{
		IdUsuario:   objectID,
		IdProductos: []primitive.ObjectID{},
	}

	_, err = s.Repository.InsertOne(ctx, historial)
	if err != nil {
		return false, fmt.Errorf("error al insertar el historial en MongoDB: %v", err)
	}

	return true, nil
}
