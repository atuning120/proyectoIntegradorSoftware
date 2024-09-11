import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <a href="#" className="text-2xl font-bold text-gray-800">E-Learner</a>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</a>
              <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">Courses</a>
              <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">About</a>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <a href="#" className="py-2 px-3 bg-gray-700 text-white rounded hover:bg-gray-800">Login</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
