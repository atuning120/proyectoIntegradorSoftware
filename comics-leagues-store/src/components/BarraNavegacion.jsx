import React from 'react';

const Navbar = () => {
  return (
    <nav className="Encabezado inicio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-indigo-600 text-lg py-2 px-4 rounded-lg shadow-md">About</a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <a href="#" className="bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-indigo-600 text-lg py-2 px-4 rounded-lg shadow-md">Login</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




