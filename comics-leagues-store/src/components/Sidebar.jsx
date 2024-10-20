import { useState } from "react";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";
import { ImExit } from "react-icons/im";
import { FaRegEye, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate(); // Hook para navegación

  const Menus = [
    { title: "Ver Cuenta", path: "/userprofile/perfil", icon: <RiDashboardFill /> },
    { title: "Cambiar datos de la cuenta", icon: <FaPen />, path: "/userprofile/setPerfil" },
    { title: "Ver Cursos Pagados", icon: <FaRegEye />, path: "/userprofile/Historial" },
    { title: "Cerrar Sesión", spacing: true, icon: <ImExit />, path: "/logout" },
  ];

  const handleNavigation = (path) => {
    if(path === "/logout"){
      localStorage.removeItem("token"); // Elimina el usuario del localStorage
      navigate("/"); // Navega a la ruta de login
      return;
    }
    //navigate(path); // Navega a la ruta proporcionada
  };

  return (
    <div className="flex">
      <div className={`bg-gray-950 h-screen p-5 pt-8 ${isOpen ? "w-72" : "w-24"} duration-300 relative`}>
        <BsArrowLeftSquareFill
          className={`bg-gray-900 text-gray-200 text-3xl rounded-full absolute -right-5 top-7 border
            border-gray-900 cursor-pointer ${!isOpen && "rotate-180"}`}
          onClick={() => setIsOpen(!isOpen)}
        />

        <IoEyeSharp
          className={`bg-amber-500 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 
            ${isOpen && "rotate-[360deg]"}`}
        />

        <h1 className={`text-white origin-left font-medium text-2xl mt-1 ${!isOpen && "scale-0"}`}>
          {isOpen ? "Ajustes" : "A"}
        </h1>

        <ul className="pt-5">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 
                hover:bg-white rounded-md ${menu.spacing ? "mt-48" : "mt-2"}`}
              onClick={() => handleNavigation(menu.path)} // Llamada al método para navegar
            >
              <span className="text-2xl block float-left">
                {menu.icon ? menu.icon : <RiDashboardFill />}
              </span>
              <p className={`text-base font-medium flex-1 ${!isOpen && "hidden"}`}>{menu.title}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-7">
        <h1 className="text-2xl font-semibold">Aqui</h1>
      </div>
    </div>
  );
};

export default Sidebar;
