import { Outlet } from "react-router-dom"
import { Navbar } from "../components/shared/Navbar"
export const RootLayout = () => {
    return <div>
        <Navbar/>
        <main className="container my-8 flex-1"><Outlet/></main>
        <div>Footer</div>
    </div>
}   