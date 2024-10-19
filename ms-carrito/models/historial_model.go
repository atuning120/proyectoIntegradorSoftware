package models

type Historial struct {
	ID          string   `json:"id" bson:"_id,omitempty"`
	IdUsuario   string   `json:"idusuario" bson:"idusuario"`
	IdProductos []string `json:"idproductos" bson:"idproductos"`
}
