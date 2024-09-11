import React from 'react';

const Hero = () => {
    
    const url = 'https://png.pngtree.com/thumb_back/fw800/background/20231228/pngtree-dynamic-comic-speed-lines-background-with-rectangular-fight-stamp-perfect-for-image_13903888.png';
  return (
    <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url(${url})` }}>
      <div className="absolute inset-0 bg-black opacity-60"></div> {/* Fondo oscuro transparente */}
      <div className="relative flex items-center justify-center h-full">
        <div className="text-center text-white px-4">
          <h1 className="text-6xl font-extrabold leading-tight">Aprende a Dibujar Cómics y Anime</h1>
          <p className="text-2xl mt-4">Explora nuestros cursos y mejora tus habilidades artísticas con los mejores instructores</p>
          <button className="mt-8 py-3 px-6 bg-indigo-600 text-white text-lg rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out">
            Ver Cursos
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

