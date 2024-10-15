import React from 'react';
import { gql, useQuery } from '@apollo/client';

// Definir la query GraphQL
const TOP_CURSOS = gql`
  query TopCursos {
    topCursos {
      nombre
      descripcion
      precio
      imagen
      categoria
      nivel
    }
  }
`;

const ProductGrid = () => {
  const { loading, error, data } = useQuery(TOP_CURSOS);

  // Mostrar mensaje mientras los datos se cargan
  if (loading) return <p>Cargando cursos...</p>;

  // Manejar errores y mostrar un mensaje en la consola
  if (error) {
    console.error('Error al cargar los cursos:', error);
    return <p>Error al cargar los cursos. Intenta nuevamente más tarde.</p>;
  }

  // Obtener los cursos desde los datos de la query
  const products = data.topCursos;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6">Cursos Destacados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
            <img
              src={product.imagen}
              alt={product.nombre}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{product.nombre}</h3>
            <p className="text-gray-600 flex-grow">{product.descripcion}</p>
            <p className="text-gray-600">{product.categoria} - {product.nivel}</p>
            <div className="mt-4">
              <span className="text-xl font-bold">
                ${product.precio.toLocaleString('es-ES')}
              </span>
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


