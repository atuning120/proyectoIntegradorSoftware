import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navbarLinks } from '../../constants/links';
import { HiOutlineSearch, HiOutlineShoppingBag } from 'react-icons/hi';
import { FaBarsStaggered } from 'react-icons/fa6';
import { Logo } from './Logo';
import { CartModal } from '../CartModal'; 

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; 
};

const PrimerLetra = () => {
  if (isAuthenticated()) {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.username[0].toUpperCase();
  } else {
    return '\u{02726}';
  }
};

const perfil = () => (isAuthenticated() ? '/userprofile' : '/login');

export const Navbar = () => {
  const [searchText, setSearchText] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const [cartItems, setCartItems] = useState([]); 

  const handleSearch = () => {
    console.log('Texto de búsqueda:', searchText);
  };

  const toggleCartModal = () => setIsCartOpen(!isCartOpen); 

  return (
    <>
      <header className="bg-white text-black py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12">
        <Logo />
        <nav className="space-x-5 hidden md:flex">
          {navbarLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.href}
              className={({ isActive }) =>
                `${
                  isActive ? 'text-cyan-600 underline' : ''
                } transition-all duration-300 font-medium hover:text-cyan-600 hover:underline`
              }
            >
              {link.title}
            </NavLink>
          ))}
        </nav>

        <div className="flex gap-5 items-center">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border rounded-full px-3 py-1.5 text-sm focus:outline-none focus:border-cyan-600 transition-all duration-300"
            />
            <button onClick={handleSearch} className="ml-2">
              <HiOutlineSearch size={25} />
            </button>
          </div>

          <div className="relative">
            <Link
              to={perfil()}
              className="border-2 border-slate-700 w-9 h-9 rounded-full grid place-items-center text-lg font-bold"
            >
              {PrimerLetra()}
            </Link>
          </div>

          <button onClick={toggleCartModal} className="relative">
            <span className="absolute -bottom-2 -right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full">
              {cartItems.length}
            </span>
            <HiOutlineShoppingBag size={25} />
          </button>
        </div>

        <button className="md:hidden">
          <FaBarsStaggered size={25} />
        </button>
      </header>

      <CartModal
        isOpen={isCartOpen}
        closeModal={toggleCartModal}
        cartItems={cartItems}
      />
    </>
  );
};
