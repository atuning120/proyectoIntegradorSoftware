import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import HomePages from "../pages/HomePage";
import AboutPages from "../pages/AboutPage";

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
                path:'nosotros',
                element: <AboutPages/>
            },
            
        ]
    },
]);