import React from 'react';

const Hero = () => {
  return (
    <section className="bg-cover bg-center h-screen">
      <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold">Aprende a Dibujar Cómics y Anime</h1>
          <p className="text-xl mt-4">Explora nuestros cursos y mejora tus habilidades artísticas</p>
          <button className="mt-6 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">Ver Cursos</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
