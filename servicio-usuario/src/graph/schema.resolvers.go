package graph

import (
	"context"
	"fmt"

	"github.com/atuning120/proyectoIntegradorSoftware/comics-leagues-store/src/back-end/graph/model"
)

// CrearUsuario is the resolver for the crearUsuario field.
func (r *mutationResolver) CrearUsuario(ctx context.Context, username string, email string, contrasena string, nombre string, apellido string, telefono *string) (*model.Usuario, error) {
	panic(fmt.Errorf("not implemented: CrearUsuario - crearUsuario"))
}

// ActualizarUsuario is the resolver for the actualizarUsuario field.
func (r *mutationResolver) ActualizarUsuario(ctx context.Context, idUsuario string, username *string, email *string, contrasena *string, nombre *string, apellido *string, telefono *string) (*model.Usuario, error) {
	panic(fmt.Errorf("not implemented: ActualizarUsuario - actualizarUsuario"))
}

// EliminarUsuario is the resolver for the eliminarUsuario field.
func (r *mutationResolver) EliminarUsuario(ctx context.Context, idUsuario string) (bool, error) {
	panic(fmt.Errorf("not implemented: EliminarUsuario - eliminarUsuario"))
}

// Usuario is the resolver for the usuario field.
func (r *queryResolver) Usuario(ctx context.Context, idUsuario string) (*model.Usuario, error) {
	panic(fmt.Errorf("not implemented: Usuario - usuario"))
}

// Usuarios is the resolver for the usuarios field.
func (r *queryResolver) Usuarios(ctx context.Context) ([]*model.Usuario, error) {
	panic(fmt.Errorf("not implemented: Usuarios - usuarios"))
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
