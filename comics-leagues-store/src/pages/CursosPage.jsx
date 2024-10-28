import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {Image} from "@nextui-org/react";
import {CircularProgress} from "@nextui-org/react";

const GET_CURSOS = gql`
  query GetCursos {
    cursos {
      nombre
      descripcion
      precio
      imagen
      categoria
      nivel
    }
  }
`;

const CursosPage = () => {
  const { loading, error, data } = useQuery(GET_CURSOS);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const handleFilterChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Si los datos están cargando
  if (loading) return <CircularProgress aria-label="Loading..."/>;

  // Si hay un error al obtener los datos
  // if (error) return <p>Error al cargar los cursos: {error.message}</p>;
  if (error) {
    console.error(error); // Mostrar el error completo en la consola del navegador
    return <p>Error al cargar los cursos: {error.message}</p>;
  }
  
  // Obtener los cursos desde los datos de la query
  const products = data.cursos;

  const filteredProducts = products
  .filter((product) => (selectedCourse ? product.nombre === selectedCourse : true))
  .filter((product) => (selectedCategory ? product.categoria === selectedCategory : true))
  .filter((product) => (selectedLevel ? product.nivel === selectedLevel : true))
  .sort((a, b) => {
    if (sortOrder === 'priceAsc') {
      return a.precio - b.precio;
    } else if (sortOrder === 'priceDesc') {
      return b.precio - a.precio;
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Filtro de búsqueda */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Filtrar por cursos*/}
        <label htmlFor="courseFilter" className=" p-4 text-lg font-medium text-gray-700">
          Filtrar por Curso:
        <select
          id="courseFilter"
          value={selectedCourse}
          onChange={handleFilterChange}
          className="mt-1 block  pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Todos los cursos</option>
          {products.map((product) => (
            <option key={product._id} value={product.nombre}>
              {product.nombre}
            </option>
          ))}
        </select>
        </label>

        {/* Filtrar por Categoria*/}
        <label htmlFor="categoryFilter" className="p-4 text-lg font-medium text-gray-700">
          Filtrar por Categoria:
          <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Todas las categorias</option>
              {[...new Set(products.map((product) => product.categoria))].map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
            ))}
          </select>
        </label>

        {/* Filtrar por nivel*/}
        <label htmlFor="levelFilter" className="p-4 text-lg font-medium text-gray-700">
          Filtrar por Nivel:
          <select
          id="levelFilter"
          value={selectedLevel}
          onChange={handleLevelChange}
          className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Todos los niveles</option>
              {[...new Set(products.map((product) => product.nivel))].map((nivel) => (
            <option key={nivel} value={nivel}>
              {nivel}
            </option>
            ))}
          </select>
        </label>
        {/* Filtrar precio*/}
        <label htmlFor="levelFilter" className="p-4 text-lg font-medium text-gray-700">
          Filtrar por precio:
          <select
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortOrderChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Sin ordenar</option>
          <option value="priceAsc">Precio Ascendente</option>
          <option value="priceDesc">Precio Descendente</option>
        </select>
        </label>
      </div>

      {/* Mostrar los cursos*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {filteredProducts.map((product, index) => (
    <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <Image
        isBlurred
        width={240}
        src={product.imagen}
        alt="NextUI Album Cover"
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold">{product.nombre}</h3>
      <p className="text-gray-600 flex-grow">{product.descripcion}</p>
      <p className="text-gray-600 flex-grow">{product.categoria}</p>
      <p className="text-gray-600 flex-grow">{product.nivel}</p>
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

export default CursosPage;