import React, { useState } from 'react';
import './index.css';
import Signup from './Signup';
import './animations.css';


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
    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');


    const [isLoginHovered, setIsLoginHovered] = useState(false);
    const [isSignUpHovered, setIsSignUpHovered] = useState(false);
    const [isQuestionInHovered, setIsQuestionHovered] = useState(false);


    const [loginButtonColor, setLoginButtonColor] = useState('#00A36C');
    const [signUpButtonColor, setSignUpButtonColor] = useState('#00A36C');
    
    const [isSignUpClicked,setIsSignUpClicked] = useState(false);
    const [isLoginClicked,setIsLoginClicked] = useState(false);



    const [error, setError] = useState('');
    const [hasError, setHasError] = useState(false);

    const handleLoginClick = async (evento) => {
        evento.preventDefault();
        console.log('Login button clicked'); // Check if this appears in the console
        setIsLoginClicked(true);
        setTimeout(() => {
            setIsLoginClicked(false);
        }, 300);

        let newErrors =[];

        if(user == ''){
            newErrors.push('Falta su nombre de usuario en la casilla "User Name".');
        }
        if(password == ''){
           newErrors.push('Falta contraseña en la casilla "Password".');
        }
        

        if (newErrors.length > 0) {
            setErrors(newErrors);
            setHasError(true);
            return;
        }
        else{
            setHasError(false);
            try {
                console.log('Sending login request');
                const response = await fetch('backendurl', {
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
                    setErrors([]);//limpia todos los errores
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

        }
        setErrors([]);//limpia todos los errores
 

    };

    const handleSignUpClick = (evento) => {
        setIsSignUpClicked(true);
        setTimeout(() => {
            setIsSignUpClicked(false);
            navigate('/signup');
        }, 600);
        console.log('han clickeado sign up, se debe redirigir a la pagina de signup para crear una cuenta nueva');
        
    };

    return (
        <div className='bg-gray-400 min-h-screen flex justify-center'>
            <h1 className='text-3xl text-black  font-bold bg-gray-300 py-5 px-2 mt-12 mb-auto rounded-sm ml-6'>
                Login: Bienvenido de nuevo a C.L.S.
            </h1>
            <form className='mr-auto bg-gray-200 px-8 py-4 mb-auto mt-36 rounded-sm'>
                <div className='parametros para iniciar sesion'>
                    <div className='usuario'>
                            <label htmlFor='user' className='text-black text-2xl'>User Name</label>
                            <input 
                                placeholder='Enter user name here...'
                                type='text'
                                id='usuario'
                                value={user}
                                onChange={(evento) =>setUser(evento.target.value)}
                                maxLength={16}
                                style={{ width:'300px',marginLeft:'15px'}}
                                className='w-full text-2xl mt-4' />
                    </div>
                    <br></br>
                    <div className='password'>
                        <label htmlFor='password' className='text-black text-2xl'>Password</label>
                        <input
                            placeholder="Enter password..."
                            type="password"
                            id="password"
                            value={password}
                            onChange={(evento) =>setPassword(evento.target.value)}
                            style={{ width:'300px',marginLeft:'34px'}}
                            className='w-full text-2xl mt-4'
                            maxLength={16}
                        />
                    </div> 
                </div>
                <br></br>

                <div className='relative top-10 right-4'>
                    {/*boton de log-in*/}
                    <button
                    type='submit'
                    className={`text-black py-3 px-6 text-3xl rounded-3xl mt-4 ml-12 mb-4 transition-transform ${isLoginClicked ? 'button-clicked' : ''}`}
                    style={{ 
                        backgroundColor: hasError
                          ? (isLoginHovered ? 'silver' : 'red')
                          : (isLoginHovered ? '#50C878' : '#00A36C'),
                        transition: 'background-color 0.4s ease',
                        animation: isLoginClicked ? 'clickEffect 0.2s ease-out' : 'none'
                      }}
                    onMouseEnter={() => setIsLoginHovered(true)}
                    onMouseLeave={() => setIsLoginHovered(false)}
                    onClick={handleLoginClick}
                    >
                        Log-in
                    </button>

                    {/*boton de sign-up*/}
                    <a
                        href='/Signup'
                        className={`text-black py-1 px-6 text-3xl rounded-3xl mt-4 ml-12 mb-4 transition-transform ${isSignUpClicked ? 'button-clicked' : ''}`}
                        style={{ 
                            backgroundColor:
                              (isSignUpHovered ? '#50C878' : '#00A36C'),
                            transition: 'background-color 0.4s ease',
                            animation: isSignUpClicked ? 'clickEffect 0.2s ease-out' : 'none'
                          }}
                        onMouseEnter={() => setIsSignUpHovered(true)}
                        onMouseLeave={() => setIsSignUpHovered(false)}
                        onClick={handleSignUpClick}
                        
                    >
                        Sign-up
                    </a>
                </div>

                    <br /><br/>

                    {/* '?' Button */}
                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-black text-3xl w-12 h-12 rounded-3xl ml-96"
                        style={{ backgroundColor: isQuestionInHovered ? 'red' : 'darkred' }}
                        onMouseEnter={() => setIsQuestionHovered(true)}
                        onMouseLeave={() => setIsQuestionHovered(false)}
                        onClick={() => alert('Si no tiene cuenta, haga click en "Sign-up"')}
                    >
                        ?
                    </button>
                </form>
                {errors.length > 0 && (
                    <ul className={`error-list text-black text-2xl absolute top-36 left-28 bg-gray-200 p-4 w-1/4 rounded-sm`}style={{maxHeight:'600px',overflowY:'auto'}}>
                        {errors.map((error, index) => (
                            <li key={index} className='error-item'>{error}</li>

                        ))}
                    </ul>
                    )}
        </div>
    );
};

export default Login;