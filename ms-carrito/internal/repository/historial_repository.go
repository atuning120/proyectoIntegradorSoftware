package repository

import (
	"context"
	"fmt"

	"github.com/proyectoIntegradorSoftware/ms-carrito/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type HistorialRepository interface {
	InsertOne(ctx context.Context, historial models.Carrito) (bool, error)
	InsertProduct(ctx context.Context, historial models.Carrito) (bool, error)
	FindById(ctx context.Context, id string) (models.Carrito, error)
}

type HistorialRepositoryImpl struct {
	Collection *mongo.Collection
}

func NewHisotialRepositoryImpl(db *mongo.Database) *HistorialRepositoryImpl {
	return &HistorialRepositoryImpl{
		Collection: db.Collection("carrito"),
	}
}

func (s *HistorialRepositoryImpl) FindById(ctx context.Context, id string) (models.Carrito, error) {
	var result models.Carrito

	objectIdUsuario, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		fmt.Printf("Error al convertir id a ObjectID: %v\n", err)
		return result, fmt.Errorf("error al convertir id a ObjectID: %v", err)
	}

	err = s.Collection.FindOne(ctx, bson.M{"id_usuario": objectIdUsuario}).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			fmt.Println("No se encontró ningún documento con el ID proporcionado")
			return result, nil
		}
		fmt.Printf("Error al decodificar el resultado de FindOne: %v\n", err)
		return result, err
	}
	return result, nil
}

func (s *HistorialRepositoryImpl) InsertProduct(ctx context.Context, carrito models.Carrito) (bool, error) {

	filter := bson.M{"id_usuario": carrito.IDUsuario}
	fmt.Printf("Filtro para actualizar: %+v\n", filter)

	update := bson.M{"$set": bson.M{"id_productos": carrito.IDProductos}}

	_, err := s.Collection.UpdateOne(ctx, filter, update)
	if err != nil {
		fmt.Printf("Error en UpdateOne: %v\n", err)
		return false, err
	}

	return true, nil
}

func (s *HistorialRepositoryImpl) InsertOne(ctx context.Context, historial models.Carrito) (bool, error) {

	_, err := s.Collection.InsertOne(ctx, historial)
	if err != nil {
		return false, err
	}

	return true, nil
}
