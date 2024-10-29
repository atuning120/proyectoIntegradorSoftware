import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { cartClient } from '../apolloClient'; // Ajusta la ruta según tu estructura

// Query para obtener el carrito con los IDs de los productos
const OBTENER_CARRITO = gql`
  query ObtenerCarrito($id: ID!) {
    ObtenerCarrito(id: $id) {
      id
      idUsuario
      idProductos
    }
  }
`;

export const CartModal = ({ isOpen, closeModal }) => {

  // Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Función para extraer el ID del usuario
const ExtraerIdUsuario = () => {
  if (isAuthenticated()) {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.id;
  } else {
    console.warn('Usuario no autenticado');
    return null;
  }
};

const userId = ExtraerIdUsuario();

  // Ejecutar la query para obtener el carrito
  const { data, loading, error } = useQuery(OBTENER_CARRITO, {
    variables: { id: userId },
    skip: !userId, // Evitar la query si no hay userId
    client: cartClient,
  });

  // Mostrar los IDs de los productos en consola
  useEffect(() => {
    if (data) {
      console.log('IDs de productos del carrito:', data.ObtenerCarrito.idProductos);
    }
  }, [data]);

  if (!isOpen) return null;

  if (loading) return <p>Cargando...</p>;
  if (error) {
    console.error('Error al cargar el carrito:', error);
    return <p>Error al cargar el carrito.</p>;
  }

  const { idProductos } = data.ObtenerCarrito;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Carrito de Compras</h2>

        {idProductos.length > 0 ? (
          <ul className="space-y-3">
            {idProductos.map((productId, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>ID del Producto: {productId}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">El carrito está vacío.</p>
        )}

        <div className="mt-5 flex justify-between">
          <button
            onClick={closeModal}
            className="px-4 py-2 border rounded-md hover:bg-gray-200"
          >
            Cerrar
          </button>
          <Link
            to="/paySystem"
            className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
            onClick={closeModal}
          >
            Ir a Pagar
          </Link>
        </div>
      </div>
    </div>
  );
};
