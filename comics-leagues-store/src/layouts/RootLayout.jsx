import { Outlet } from "react-router-dom"
import { Navbar } from "../components/shared/Navbar"
export const RootLayout = () => {
    return <div>
        <Navbar/>
        <div>Navbar</div>
        <Outlet/>
        <div>Footer</div>
    </div>
}   