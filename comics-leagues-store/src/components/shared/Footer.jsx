import React from 'react'
import { BiChevronRight } from 'react-icons/bi';
import {Link} from 'react-router-dom';

const Footer = () => {
  return  <footer className="py-16 bg-gray-950 px-12 flex justify-between gap-10 text-slate-200 text-sm flex-wrap mt-10
  md:flex-nowrap">
    <Link to='/' className={`text-2x1 font-bold tracking-tighter transition-all text-white flex-1`}>
        Comics League Store
    </Link>

    <div className="flex flex-col gap-4 flex-1">
        <p className="font-semibold uppercase tracking-tighter">
            Suscribete
        </p>
        <p className="text-xs font-medium">
            Recibe ofertas exclusivas y novedades
        </p>
        <div className="border border-gray-80 flex items-center gap-2 px-3 py-2 rounded-full">
            <input 
                type="email" 
                placeholder='Correo Electronico'
                className='pl-2 bg-gray-950 text-slate-200 w-full focus:outline-none'
            />
            <button className='text-slate-200'>
                <BiChevronRight size={20}/>
            </button>
        </div>
    </div>
    <div className="flex flex-col gap-4 flex-1">
        <p className='font-semibold uppercase tracking-tighter'>
            Politicas
        </p>
        <nav className="flex flex-col gap-2 text-xs font-medium">
            <Link to='#'>Cursos</Link>
            <Link to='#'>Politicas de privacidad</Link>
            <Link to='#'>Terminos de uso</Link>
        </nav>
    </div>
  </footer>
}

export default Footer