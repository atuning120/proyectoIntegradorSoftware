import React from 'react';
import Navbar from './components/BarraNavegacion';
import Hero from './components/Heroe';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Hero />
    </div>
  );
};

export default App;
