import React from 'react';

const Navbar = () => {
  return (
    <nav className="Encabezado inicio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="#" className="text-3xl font-extrabold text-indigo-600">E-Learner</a>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                <a href="#" className="text-gray-700 hover:text-indigo-600 text-lg">Home</a>
                <a href="#" className="text-gray-700 hover:text-indigo-600 text-lg">Courses</a>
                <a href="#" className="text-gray-700 hover:text-indigo-600 text-lg">About</a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <a href="#" className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">Login</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

