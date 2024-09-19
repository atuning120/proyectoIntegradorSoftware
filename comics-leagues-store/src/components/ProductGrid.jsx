import React from 'react';

const products = [
  {
    id: 1,
    name: 'Curso 1',
    description: 'Descripcion Curso 1',
    price: '$1.000',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Curso 2',
    description: 'Descripcion Curso 2',
    price: '$1.000',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Curso 3',
    description: 'Descripcion Curso 3',
    price: '$1.000',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Curso 4',
    description: 'Descripcion Curso 4',
    price: '$1.000',
    image: 'https://via.placeholder.com/150',
  },
];

const ProductGrid = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6">Cursos Destacados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600 flex-grow">{product.description}</p>
            <div className="mt-4">
              <span className="text-xl font-bold">{product.price}</span>
            </div>
            <button className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300">
              Añadir al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

