package service

import (
	"context"

	"github.com/atuning120/proyectoIntegradorSoftware/ms-producto/internal/repository"
)

type ProductoService interface {
	ValidarProducto(context.Context, string) (bool, error)
}

type ProductoServiceImpl struct {
	ProductoRepository repository.ProductoRepository
}

func NewProductoServiceImpl(repo repository.ProductoRepository) *ProductoServiceImpl {
	return &ProductoServiceImpl{
		ProductoRepository: repo,
	}
}

func (s *ProductoServiceImpl) ValidarProducto(ctx context.Context, idProducto string) (bool, error) {
	existe, err := s.ProductoRepository.FindProduct(ctx, idProducto)
	if err != nil {
		return false, err
	}

	return existe, nil
}