import { useState } from "react";
import { BsArrowLeftSquareFill, BsSearch } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";
import { ImExit } from "react-icons/im";
import { FaRegEye } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";

const Sidebar = () =>{
    const [isOpen,setIsOpen] = useState(true);
    const Menus = [
        {title: "relleno"},
        {title: "relleno2"},
        {title: "Cambiar datos de la cuenta", icon:<FaPen />},
        {title: "Ver Cursos Pagados", icon: <FaRegEye/>},
        {title: "Cerrar Sesión", spacing: true, icon: <ImExit />},
    ];

    return(
        <div className="flex">
            <div className={`bg-gray-950 h-screen p-5 pt-8 ${isOpen? "w-72":"w-24"} duration-300 relative`}>
                <BsArrowLeftSquareFill  className={`bg-gray-900 text-gray-200 
                text-3xl rounded-full absolute -right-5 top-7 border
                border-gray-900 cursor-pointer
                ${!isOpen && "rotate-180"}`}
                onClick={() => setIsOpen(!isOpen)}/>

                <IoEyeSharp className={`bg-amber-500 text-4xl
                rounded cursor-pointer block float-left mr-2
                 duration-500 ${isOpen && "rotate-[360deg]"}`}/>


            <h1 className={`text-white origin-left font-medium text-2xl mt-1 ${!isOpen && "scale-0"}`}>
                {isOpen ? 'Ajustes' : 'A'}
            </h1>
            <div className={`flex items-center rounded-md bg-gray-900 mt-12 ${!isOpen ? "px-4" : "px-2.5"} py-2`}>
                <BsSearch className={`text-white text-lg block 
                float-left cursor-pointer ${isOpen && "mr-2"}`}/>
                <input type={"search"} placeholder="Buscar"
                className={`text-base bg-transparent w-full text-white 
                focus:outline-none ${!isOpen && "hidden"}`}/>
                 

            </div>
            
           <ul className="pt-2">
            {Menus.map((menu, index) => (
                <>
                    <li key={index} 
                    className={`text-gray-300 text-sm flex
                    items-center gap-x-4 cursor-pointer p-2
                    hover:bg-white rounded-md 
                    ${menu.spacing ? "mt-48":"mt-2"}`}
                    >
                        <span className="text-2xl block float-left">
                            {menu.icon ? menu.icon : <RiDashboardFill />}
                        </span>
                        <p className={`text-base font-medium flex-1
                            ${!isOpen && "hidden"}`}>{menu.title}
                        </p>
                    </li>
                </>
            ))}

           </ul>



            </div>

            <div className="p-7">
                <h1 className="text-2xl font-semibold">Home Page</h1>
            </div>
        </div>
    );    

};

export default Sidebar;