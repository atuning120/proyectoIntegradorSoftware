import React from 'react';
import Navbar from './components/BarraNavegacion';
import Hero from './components/Heroe';
import Carousel from './components/Carousel';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Hero />
      <Carousel />
    </div>
  );
};

export default App;
