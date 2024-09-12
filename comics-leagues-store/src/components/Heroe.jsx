import React from 'react';
import imagen1 from '../assets/bannerBackGround01.jpg';

const Hero = () => {
  return (
    <section 
      className="relative bg-cover bg-center h-screen" 
      style={{ 
        backgroundImage: `url('${imagen1}')`, 
        backgroundRepeat: 'no-repeat',
        width:'1500px',
        height:'369px',
      }}
    >
      {/* Fondo oscuro transparente */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Contenedor del contenido centrado */}
      <div className="relative flex flex-col items-center justify-center h-full">
        <div className="text-center text-white px-4">
          <h1 className="text-6xl font-extrabold leading-tight">Aprende a Dibujar Cómics y Anime</h1>
          <p className="text-2xl mt-4">Explora nuestros cursos y mejora tus habilidades artísticas con los mejores instructores</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;



