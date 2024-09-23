import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import HomePages from "../pages/HomePage";
import CursosPage from "../pages/CursosPage"; "../pages/CursosPage.jsx";
import Login from '../pages/Login.jsx';
import SignUp from '../pages/Signup.jsx';
import Policies from "../pages/Policies.jsx";
import Privacy from "../pages/TermsOfUse.jsx";

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
            {
                path:'login',
                element: <Login />
            },
            {
                path:'signup',
                element: <SignUp />
            },
            {
                path:'policies',
                element: <Policies />
            },
            {
                path:'termsofuse',
                element: <Privacy />
            }
            
        ]
    },
]);