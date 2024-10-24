package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Historial struct {
	ID          primitive.ObjectID   `json:"id,omitempty" bson:"_id,omitempty"`
	IdUsuario   primitive.ObjectID   `json:"id_usuario" bson:"id_usuario"`
	IdProductos []primitive.ObjectID `json:"id_productos" bson:"id_productos"`
}
