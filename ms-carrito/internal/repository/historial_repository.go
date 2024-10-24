package repository

import (
	"context"

	"github.com/proyectoIntegradorSoftware/ms-carrito/internal/models"
	"go.mongodb.org/mongo-driver/mongo"
)

type HistorialRepository interface {
	InsertOne(ctx context.Context, historial models.Historial) (bool, error)
}

type HistorialRepositoryImpl struct {
	Collection *mongo.Collection
}

func NewHisotialRepositoryImpl(db *mongo.Database) *HistorialRepositoryImpl {
	return &HistorialRepositoryImpl{
		Collection: db.Collection("carrito"),
	}
}

func (s *HistorialRepositoryImpl) InsertOne(ctx context.Context, historial models.Historial) (bool, error) {

	_, err := s.Collection.InsertOne(ctx, historial)
	if err != nil {
		return false, err
	}

	return true, nil
}
