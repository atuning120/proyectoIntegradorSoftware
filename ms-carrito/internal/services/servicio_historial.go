package services

import "go.mongodb.org/mongo-driver/mongo"

type ServicioHistorial struct {
	collection *mongo.Collection
}
