package service

import (
	"context"
	"log"

	"github.com/atuning120/proyectoIntegradorSoftware/ms-usuario/internal/repository"
)

type UsuarioService struct {
	Repo *repository.UsuarioRepository
}

func NewUsuarioService(repo *repository.UsuarioRepository) *UsuarioService {
	return &UsuarioService{
		Repo: repo,
	}
}

func (s *UsuarioService) ValidarUsuario(ctx context.Context, id string) (bool, error) {
	existe, err := s.Repo.ExisteUsuario(ctx, id)
	if err != nil {
		log.Println("Error validando usuario:", err)
		return false, err
	}

	return existe, nil
}
