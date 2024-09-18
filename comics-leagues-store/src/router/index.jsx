import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import HomePages from "../pages/HomePage";
import CursosPage from "../pages/CursosPage"; "../pages/CursosPage.jsx";

export const router= createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children:[
            {
                index:true,
                element: <HomePages/>
            },
            {
                path:'cursos',
                element: <CursosPage/>
            },
            
        ]
    },
]);