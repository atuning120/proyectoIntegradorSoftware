import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "../components/shared/Navbar"
import Footer from "../components/shared/Footer"
import Banner from "../components/Banner"
import Sidebar from "../components/Sidebar"

export const RootLayout = () => {

    const {pathname}= useLocation();
    const isUserProfilePage = pathname.includes('/userprofile'); // Detecta cualquier ruta que contenga /userprofile

    return <div className='h-screen flex flex-col font-montserrat'>
        <Navbar/>


        {isUserProfilePage && <Sidebar/>}

        {pathname === '/' && (<Banner />)}

        {!pathname.endsWith('/userprofile') && <main className="container my-8 flex-1"><Outlet/></main>}


        <Footer/>
    </div>
}