import { useState , useEffect} from "react";



const isAuthenticated = () =>{
    try {
        const token = localStorage.getItem('token');
        return token;
    } catch (error) {
        console.log("error mientras se busca el token: ",error);
        return undefined;
    }
};

const Perfil = () =>{
    const [user,setUser] = useState('');
    const token = isAuthenticated();

    useEffect(() => {
        if (token) {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                console.error("No user data found in local storage.");
            }
        } else {
            console.error("User is not authenticated.");
        }
    }, [token]);

    if (!user) {
        return <h1>ERROR</h1>;
    }
    return (
        <div className="mt-8 p-4 flex justify-center mr-16">
            <div className="w-[60%] bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-4xl font-bold mb-28">Perfil de usuario</h1>
                <p className="text-2xl text-black mb-4">Nombre: {user.nombre}</p>
                <p className="text-2xl text-black mb-4">Apellido: {user.apellido}</p>
                <p className="text-2xl text-black mb-4">Nombre de usuario: {user.username}</p>
                <p className="text-2xl text-black mb-4">Correo: {user.correo}</p>
            </div>
        </div>
    );
    
};

export default Perfil;