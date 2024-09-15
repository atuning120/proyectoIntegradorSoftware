import React, { useEffect, useRef, useState } from 'react';
import '../CatalogoHome.css';

const listImages = [
  { id: 1, imgUrl: 'src/assets/comic.jpg' },
  { id: 2, imgUrl: 'src/assets/Eanime.jpg' },
  { id: 3, imgUrl: 'src/assets/variosHeroes.jpg' },
];

const Carousel = () => {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll('li')[currentIndex];

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: 'smooth',
        inline: 'center', // Cambiado de block a inline para scroll horizontal
      });
    }
  }, [currentIndex]);

  const scrollToImage = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex((curr) => {
        const isFirstSlide = currentIndex === 0;
        return isFirstSlide ? 0 : curr - 1;
      });
    } else {
      const isLastSlide = currentIndex === listImages.length - 1;
      if (!isLastSlide) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className='main-container'>
      {/* Cuadro donde se muestra el carrusel */}
      <div className='slider-container'>
        {/* Flecha izquierda */}
        <div className='leftArrow' onClick={() => scrollToImage('prev')}>
          &#10092;
        </div>
        {/* Flecha derecha */}
        <div className='rightArrow' onClick={() => scrollToImage('next')}>
          &#10093;
        </div>
        {/* Contenedor de las imágenes */}
        <div className='container-images'>
          <ul ref={listRef}>
            {listImages.map((item) => {
              return (
                <li key={item.id}>
                  <img src={item.imgUrl} width={500} height={280} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className='dots-container'>
          {listImages.map((item, index) => (
            <div
              key={index}
              className={`dot-container-item ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            >
              &#9900;
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;

