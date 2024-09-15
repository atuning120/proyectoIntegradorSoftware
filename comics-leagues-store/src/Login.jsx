import React, { useState } from 'react';
import './index.css';

//opcional, pero convierte las password en *'s (solo en alert)
const maskText = (text) => {
    return '*'.repeat(text.length);
};

const fetchWithTimeout = (url, options, timeout = 5000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out(no esta llegando al backend o no esta regresando)')), timeout)
        )
    ]);
};

const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');


    const [isLoginHovered, setIsLoginHovered] = useState(false);
    const [isSignUpHovered, setIsSignUpHovered] = useState(false);
    const [isQuestionInHovered, setIsQuestionHovered] = useState(false);


    const [loginButtonColor, setLoginButtonColor] = useState("green");
    const [signUpButtonColor, setSignUpButtonColor] = useState("green");

    const [error, setError] = useState('');

    const handleLoginClick = async () => {
        console.log('Login button clicked'); // Check if this appears in the console
        if (!user || !password) {
            console.log('User or password is empty');
            setLoginButtonColor("darkred");
            setError('Please fill in both fields.');
            return;
        }
    
        try {
            console.log('Sending login request');
            const response = await fetch('aca va el url del backend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user, password }),
            });
    
            console.log('Received response:', response); // Log the response object
            if (response.ok) {
                const data = await response.json();
                console.log('Login successful(finalmente):', data);
                setLoginButtonColor('blue');
                alert(`Iniciar sesión con: ${user}, ${maskText(password)}`);
            } else {
                console.log('Login failed:', response.statusText);
                setError('Login failed');
                setLoginButtonColor('darkred');
            }
    
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred');
            setLoginButtonColor('darkred');
        }
    };

    const handleSignUpClick = () => {
        console.log('han clickeado sign up, se debe redirigir a la pagina de signup para crear una cuenta nueva');
    };

    return (
        <div>
            <h1 className="text-6xl font-bold text-white px-4">
                Login
            </h1>
            <form className="w-full max-w-sm p-2">
                <div className='usuario y password'>
                    <div>
                        <label htmlFor="user" className="text-white text-2xl">User </label>
                        <input 
                            placeholder="Type username here..."
                            type="text"
                            id="user"
                            value={user}
                            onChange={(evento) =>setUser(evento.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-2xl ml-ajustarUser" />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="text-white text-2xl">Password </label>
                        <input 
                            placeholder="Type user password here..."
                            type="password"
                            id="password"
                            value={password}
                            onChange={(evento) =>setPassword(evento.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-2xl mt-4"
                            />
                    </div>
                </div>
                <br></br>
                    {/*boton de log-in*/}
                    <button
                    className={`text-white py-4 px-4 text-3xl mr-2  ${isLoginHovered ? 'bg-green-600' : `bg-${loginButtonColor}`}`}
                    style={{ backgroundColor: isLoginHovered ? '#39e75f' : loginButtonColor }}
                    onMouseEnter={() => setIsLoginHovered(true)}
                    onMouseLeave={() => setIsLoginHovered(false)}
                    onClick={handleLoginClick}>
                        Log-in
                    </button>

                    {/*boton de sign-up*/}
                    <button                    
                        className={`text-white py-4 px-8 text-3xl`}
                        style={{ backgroundColor: isSignUpHovered ? '#39e75f' : signUpButtonColor }}
                        onMouseEnter={() => setIsSignUpHovered(true)}
                        onMouseLeave={() => setIsSignUpHovered(false)}
                        onClick={handleSignUpClick}
                        
                    >
                        Sign-up
                    </button>

                    <br /><br/>

                    {/* '?' Button */}
                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-white text-2xl"
                        style={{ backgroundColor: isQuestionInHovered ? 'red' : 'darkred' }}
                        onMouseEnter={() => setIsQuestionHovered(true)}
                        onMouseLeave={() => setIsQuestionHovered(false)}
                        onClick={() => alert('Ingrese usuario en la caja User y una contraseña para la caja password')}
                    >
                        ?
                    </button>
                </form>
        </div>
    );
};

export default Login;