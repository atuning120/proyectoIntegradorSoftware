import React from 'react';
import { useState } from "react";
import { BsArrowLeftSquareFill, BsSearch } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";
import { ImExit } from "react-icons/im";
import { FaRegEye } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // Hook para la navegación

// Cerrar sesión
const logout = () => {
    window.dispatchEvent(new Event('userLoggedOut'));
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Emite el evento y elimina la sesión
        navigate('/'); // Redirige a la página de inicio
    };

    const Menus = [
        { title: "Datos de perfil", icon: <FaRegEye/>, link: "userprofile/perfil" },
        { title: "Historial de Cursos Pagados", icon: <FaRegEye/>, link: "userprofile/Historial" },
        { title: "Cambiar datos de la cuenta", icon: <FaPen />, link: "userprofile/setPerfil" },
        { title: "Cerrar Sesión", spacing: true, icon: <ImExit />, link: "/", isExitButton: true },
    ];

    return (
        <div className="w-72">
            <div className={`bg-gray-950 h-screen p-5 pt-8 ${isOpen ? "w-72" : "w-28"} duration-300 relative`}>
                <BsArrowLeftSquareFill
                    className={`bg-gray-900 text-gray-200 text-3xl rounded-full absolute -right-5 top-10 border border-gray-900 cursor-pointer ${!isOpen && "rotate-180"}`}
                    onClick={() => setIsOpen(!isOpen)}
                />
                {/* ... otros componentes y menú */}
                <ul className="pt-2">
                    {Menus.map((menu, index) => (
                        <li
                            key={index}
                            className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-white rounded-md ${menu.spacing ? "mt-48" : "mt-2"}`}
                            onClick={() => menu.isExitButton ? handleLogout() : navigate(menu.link)}
                        >
                            <span className="text-2xl block float-left">{menu.icon ? menu.icon : <RiDashboardFill />}</span>
                            <p className={`text-base font-medium flex-1 ${!isOpen && "hidden"}`}>{menu.title}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
