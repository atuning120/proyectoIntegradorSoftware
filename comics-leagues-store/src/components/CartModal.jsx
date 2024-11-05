import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { cartClient } from '../apolloClient';

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
  const [errorMessage, setErrorMessage] = useState('');
  const [cartData, setCartData] = useState([]);

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  const ExtraerIdUsuario = () => {
    if (isAuthenticated()) {
      const user = JSON.parse(localStorage.getItem('user'));
      return user.id;
    } else {
      return null;
    }
  };

  const userId = ExtraerIdUsuario();

  const { data, loading, error, refetch } = useQuery(OBTENER_CARRITO, {
    variables: { id: userId },
    skip: !userId,
    client: cartClient,
    onError: (error) => {
      setErrorMessage('Error al cargar el carrito. Mostrando carrito vacío.');
      console.error('Detalles del error:', error);
    },
    onCompleted: (data) => {
      if (data && data.ObtenerCarrito) {
        setCartData(data.ObtenerCarrito.idProductos);
      }
    },
  });

  useEffect(() => {
    const handleUserLoggedOut = () => {
      setCartData([]); // Vaciar el carrito al cerrar sesión
    };
  
    // Escuchar el evento de cierre de sesión
    window.addEventListener('userLoggedOut', handleUserLoggedOut);
  
    return () => {
      window.removeEventListener('userLoggedOut', handleUserLoggedOut);
    };
  }, []);

  useEffect(() => {
    if (data && data.ObtenerCarrito) {
      setCartData(data.ObtenerCarrito.idProductos);
    }
  }, [data]);

  if (!isOpen) return null;

  if (loading) return <p>Cargando...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Carrito de Compras</h2>

        {cartData.length > 0 ? (
          <ul className="space-y-3">
            {cartData.map((productId, index) => (
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
