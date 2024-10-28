import React from 'react';
import { Link } from 'react-router-dom';

export const CartModal = ({ isOpen, closeModal, cartItems }) => {
  if (!isOpen) return null; // No renderiza nada si el modal está cerrado

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Carrito de Compras</h2>
        
        {cartItems.length > 0 ? (
          <ul className="space-y-3">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{item.name}</span>
                <span className="font-medium">${item.price}</span>
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
