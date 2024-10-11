import React, { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Curso 1',
    description: 'Descripcion Curso 1',
    price: 1000,
    image: 'https://via.placeholder.com/150',
    category: 'Categoria 1',
    level: 'Basico',
  },
  {
    id: 2,
    name: 'Curso 2',
    description: 'Descripcion Curso 2',
    price: 2000,
    image: 'https://via.placeholder.com/150',
    category: 'Categoria 1',
    level: 'medio',
  },
  {
    id: 3,
    name: 'Curso 3',
    description: 'Descripcion Curso 3',
    price: 3000,
    image: 'https://via.placeholder.com/150',
    category: 'Categoria 2',
    level: 'Avanzado',
  },
  {
    id: 4,
    name: 'Curso 4',
    description: 'Descripcion Curso 4',
    price: 4000,
    image: 'https://via.placeholder.com/150',
    category: 'Categoria 2',
    level: 'Basico',
  },
];

const CursosPage = () => {
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

  const filteredProducts = products
  .filter((product) => (selectedCourse ? product.name === selectedCourse : true))
  .filter((product) => (selectedCategory ? product.category === selectedCategory : true))
  .filter((product) => (selectedLevel ? product.level === selectedLevel : true))
  .sort((a, b) => {
    if (sortOrder === 'priceAsc') {
      return a.price - b.price;
    } else if (sortOrder === 'priceDesc') {
      return b.price - a.price;
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
            <option key={product.id} value={product.name}>
              {product.name}
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
              {[...new Set(products.map((product) => product.category))].map((category) => (
            <option key={category} value={category}>
              {category}
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
              {[...new Set(products.map((product) => product.level))].map((level) => (
            <option key={level} value={level}>
              {level}
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
  {filteredProducts.map((product) => (
    <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 flex-grow">{product.description}</p>
      <p className="text-gray-600 flex-grow">{product.category}</p>
      <p className="text-gray-600 flex-grow">{product.level}</p>
      <div className="mt-4">
        <span className="text-xl font-bold">
          ${product.price.toLocaleString('es-ES')}
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