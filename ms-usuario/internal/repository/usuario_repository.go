package repository

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UsuarioRepository struct {
	Collection *mongo.Collection
}

func NewUsuarioRepository(db *mongo.Database) *UsuarioRepository {
	return &UsuarioRepository{
		Collection: db.Collection("usuario"),
	}
}

func (r *UsuarioRepository) ExisteUsuario(ctx context.Context, id string) (bool, error) {

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return false, err
	}

	var result bson.M
	filter := bson.M{"_id": objID}

	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	err = r.Collection.FindOne(ctx, filter).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return false, nil
		}
		log.Println("Error al buscar usuario:", err)
		return false, err
	}

	return true, nil
}
