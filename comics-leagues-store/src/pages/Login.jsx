import React, { useState } from 'react';
import '../index.css';
import Signup from './Signup';
import '../animations.css';
import {Link} from 'react-router-dom'
import BackButton from '../components/BackButton';

//opcional, pero convierte las password en *'s (solo en alert)
const maskText = (text) => {
    return '*'.repeat(text.length);
};
//Para acceder a los datos del usuario desde cualquier componentes del front
//const token = localStorage.getItem('token');
//const user = JSON.parse(localStorage.getItem('user'));
//console.log(user);

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



  // URL de tu backend (asegúrate de cambiarlo si es necesario)
  const backendUrl = 'http://localhost:8080/query';

  const handleLoginClick = async (evento) => {
    evento.preventDefault();
    setIsLoginClicked(true);
    setTimeout(() => {
      setIsLoginClicked(false);
    }, 300);

    let newErrors = [];

    if (user === '') {
      newErrors.push('Falta su nombre de usuario en la casilla "User Name".');
    }
    if (password === '') {
      newErrors.push('Falta contrasena en la casilla "Password".');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setHasError(true);
      return;
    } else {
      setHasError(false);
      try {
        // Enviar la solicitud al servidor GraphQL
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              mutation Login($username: String!, $password: String!) {
                login(username: $username, password: $password) {
                  token
                  user {
                    id
                    nombre
                    apellido
                    username
                    correo
                  }
                }
              }
            `,
            variables: {
              username: user,
              password: password,
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.errors) {
            console.log('Login failed:', data.errors[0].message);
            setError('Login failed');
          } else {
            console.log('Login successful:', data.data.login);
            // Guarda el token en el localStorage
            localStorage.setItem('token', data.data.login.token);

            // Si necesitas otros datos del usuario, también puedes guardarlos
             localStorage.setItem('user', JSON.stringify(data.data.login.user));
            setErrors([]); // limpia todos los errores
          }
        } else {
          console.log('Login failed:', response.statusText);
          setError('Login failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
        setError('An error occurred');
      }
    }
  };
    

    const handleSignUpClick = (evento) => {
        window.scrollTo(0, 0);
        setIsSignUpClicked(true);
        setTimeout(() => {
            setIsSignUpClicked(false);
        }, 600);
        console.log('han clickeado sign up, se debe redirigir a la pagina de signup para crear una cuenta nueva');
        
    };

    return (
        <div className='flex flex-col items-center w-full h-screen'>
        <div className='relative bg-gradient-to-t from-blue-300 to-transparent p-2 rounded-lg flex flex-col items-center'>
            <h1 className='text-3xl text-black font-bold max-w-[800px] max-h-[100px]'>
            Welcome back to C.L.S.
            </h1>
            <form className='px-4 py-2 mt-4 w-full max-w-md'>
                <div className=''>
                    <div className='usuario'>
                            <label htmlFor='user' className='text-black text-2xl font-semibold'>User Name</label>
                            <br></br>
                            <input 
                                placeholder='Enter user name here...'
                                type='text'
                                id='usuario'
                                value={user}
                                onChange={(evento) =>setUser(evento.target.value)}
                                maxLength={16}
                                style={{ width:'300px'}}
                                className='w-full text-2xl mt-4' />
                    </div>
                    <br></br>
                    <div className='password'>
                        <label htmlFor='password' className='text-black text-2xl font-semibold'>Password</label>
                        <br></br>
                        <input
                            placeholder="Enter password..."
                            type="password"
                            id="password"
                            value={password}
                            onChange={(evento) =>setPassword(evento.target.value)}
                            style={{ width:'300px'}}
                            className='w-full text-2xl mt-4'
                            maxLength={16}
                        />
                    </div> 
                </div>
                <br></br>

                <div className='relative top-10 right-6'>
                    {/*boton de log-in*/}
                    <button
                    type='submit'
                    className={`text-black py-3 px-6 text-3xl rounded-3xl mt-4 ml-6 mb-4 transition-transform ${isLoginClicked ? 'button-clicked' : ''}`}
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
                    <Link
                        to={'/Signup'} onClick={handleSignUpClick}
                        className={`text-black py-1 px-3 text-3xl rounded-3xl mt-4 ml-6 mb-4 transition-transform ${isSignUpClicked ? 'button-clicked' : ''}`}
                        style={{ 
                            backgroundColor:
                              (isSignUpHovered ? '#50C878' : '#00A36C'),
                            transition: 'background-color 0.4s ease',
                            animation: isSignUpClicked ? 'clickEffect 0.2s ease-out' : 'none'
                          }}
                        onMouseEnter={() => setIsSignUpHovered(true)}
                        onMouseLeave={() => setIsSignUpHovered(false)}
                        
                    >
                        Sign-up
                    </Link>
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

               {/*boton de regreso a log-in*/}
               <div>
                    <BackButton to={'../'} destination={'Home'}/>
                </div>
                </form>

        </div>
                {errors.length > 0 && (
                    <ul className={`error-list text-black text-2xl bg-gradient-to-t from-red-600 to-transparent p-4 rounded-xl`}style={{maxHeight:'600px',overflowY:'auto'}}>
                        {errors.map((error, index) => (
                            <li key={index} className='error-item'>{error}</li>

                        ))}
                    </ul>
                    )}
    </div>
    );
};

export default Login;