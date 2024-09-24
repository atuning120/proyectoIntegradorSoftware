package crud

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// Estructura del Producto
type Product struct {
	Nombre      string  `bson:"nombre"`
	Descripcion string  `bson:"descripcion"`
	Precio      float64 `bson:"precio"`
	Imagen      string  `bson:"imagen"`
	Categoria   string  `bson:"categoria"`
	Nivel       string  `bson:"nivel"` // Puede ser: "basico", "medio" o "avanzado"
	Puntuacion  float64 `bson:"puntuacion"`
}

// Crear un nuevo producto
func CreateProduct(client *mongo.Client, product Product) error {
	collection := client.Database("Producto").Collection("producto")
	_, err := collection.InsertOne(context.TODO(), product)
	if err != nil {
		return fmt.Errorf("error al insertar el producto: %v", err)
	}
	fmt.Println("Producto insertado con éxito")
	return nil
}

// Obtener un producto por filtro
func GetProduct(client *mongo.Client, filter bson.M) (Product, error) {
	collection := client.Database("Producto").Collection("producto")
	var result Product
	err := collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return Product{}, fmt.Errorf("no se encontró ningún producto")
		}
		return Product{}, fmt.Errorf("error al buscar el producto: %v", err)
	}
	return result, nil
}

// Actualizar un producto
func UpdateProduct(client *mongo.Client, filter bson.M, update bson.M) error {
	collection := client.Database("Producto").Collection("producto")
	_, err := collection.UpdateOne(context.TODO(), filter, bson.M{"$set": update})
	if err != nil {
		return fmt.Errorf("error al actualizar el producto: %v", err)
	}
	fmt.Println("Producto actualizado con éxito")
	return nil
}

// Eliminar un producto
func DeleteProduct(client *mongo.Client, filter bson.M) error {
	collection := client.Database("Producto").Collection("producto")
	_, err := collection.DeleteOne(context.TODO(), filter)
	if err != nil {
		return fmt.Errorf("error al eliminar el producto: %v", err)
	}
	fmt.Println("Producto eliminado con éxito")
	return nil
}
