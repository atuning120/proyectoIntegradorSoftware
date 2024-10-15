import React, { useState } from 'react';
import '../index.css';
import Signup from './Signup';
import '../animations.css';
import {Link} from 'react-router-dom'
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom'; // Hook para la navegación


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
const isAuthenticated = () => {
	const token = localStorage.getItem('token');
  if(token){
    return true;
  }
	return false;
};

const getGradientClass = (errors,hasRespOK) =>{
  if(errors.length === 0 && hasRespOK === true){
    /*no error and backend said OK*/
    return `bg-gradient-to-tr from-green-300 to-blue-800`;
  }
  else if(errors.length === 0){
    /*no hay errores pero no se ha clickeado tampoco */
    return `bg-gradient-to-tr from-cyan-800 to-gray-300`;
  }
  else if(errors.length > 0){
    return `bg-gradient-to-tr from-red-700 to-blue-600`;
  }
  else return `bg-black`;
};

const Login = () => {
    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    // const [showPassword, setShowPassword] = useState(false);

    // const [isLoginHovered, setIsLoginHovered] = useState(false);
    // const [isSignUpHovered, setIsSignUpHovered] = useState(false);
    // const [isQuestionInHovered, setIsQuestionHovered] = useState(false);


    // const [loginButtonColor, setLoginButtonColor] = useState('#00A36C');
    // const [signUpButtonColor, setSignUpButtonColor] = useState('#00A36C');
    
    const [isSignUpClicked,setIsSignUpClicked] = useState(false);
    const [isLoginClicked,setIsLoginClicked] = useState(false);

    const [error, setError] = useState('');
    const [hasError, setHasError] = useState(false);

    const [hasRespOK, setHasRespOK] = useState(false);

    const [isLoading,setIsLoading] = useState(false);

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
      setTimeout(() =>{
        setErrors([]);
      }, 750);
      return;
    } else {
      setHasError(false);
      try {
        setIsLoading(true);
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
            setIsLoading(false);
            console.log('Login failed:', data.errors[0].message);
            setError('Login failed');
            newErrors.push('Login failed, credenciales incorrectas');
            setErrors(newErrors);
            setTimeout(() =>{
              setErrors([]);
            }, 750);
          } else {
            console.log('Login successful:', data.data.login);
            setHasRespOK(true);
            // Guarda el token en el localStorage
            localStorage.setItem('token', data.data.login.token);

            // Si necesitas otros datos del usuario, también puedes guardarlos
             localStorage.setItem('user', JSON.stringify(data.data.login.user));
            setErrors([]); // limpia todos los errores

            // Redirigir a la página de inicio
            setTimeout(() => {
              window.location.href = '/';
            }, 350);
          }
        } else {
          setIsLoading(false);
          console.log('Login failed:', response.statusText);
          setError('Login failed');
          setHasRespOK(false);
        }
      } catch (error) {
        setIsLoading(false);
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
      <div className='flex h-screen -translate-y-3'>
        <div className='flex-1 h-[75%] flex justify-center rounded-md border-slate-200 border-2'>
          <div className='bg-white p-6 rounded-xl'>
            <h1 className='font-montserrat text-5xl bg-gradient-to-tr from-cyan-300 to-cyan-800 rounded-sm bg-clip-text text-transparent font-extrabold'>
              Welcome Back
            </h1>
            <p className='font-montserrat text-2xl text-gray-400 flex items-center justify-center pr-40'>
            Log in to C.L.S.
            </p>
          
            <form className='h-screen ml-5 mt-16' >
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
                                  className={`w-full text-2xl rounded-md mt-3 py-2 hover:bg-gray-200`}/>
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
                              className={`w-full text-2xl rounded-md mt-7 py-2 hover:bg-gray-200`}
                              maxLength={16}
                          />
                      </div>
                      <div className='flex space x-4 mt-16'>

                      {/*boton de log-in*/}
                      <button
                                  type='submit'
                                  className={`text-white py-3 px-6 text-3xl rounded-3xl mt-4 ml-6 mb-4 transform hover:scale-105 active:scale-95  bg-gray-900 hover:bg-gray-950 ${isLoginClicked ? 'button-clicked' : ''}`}
                                  onClick={handleLoginClick}
                                  >
                                      Log-in
                                  </button>

                        {/*boton de sign-up*/}
                        <Link
                                  to={'/Signup'} onClick={handleSignUpClick}
                                  className="flex items-center justify-center text-white py-3 px-6 text-3xl rounded-3xl mt-4 ml-6 mb-4 
                          transform transition-all duration-300 
                          bg-gray-900 hover:bg-gray-950
                          active:scale-95 w-1/2.2 hover:scale-105"
                                  >
                                      Sign-up
                                    

                                  </Link>

                      </div>
            </form>
          </div>
        
        </div>
        {/* de momento, no se muestra el listado de errores
        {errors.length > 0 && (
         <ul className={`error-list text-black text-2xl bg-gradient-to-t from-red-600 to-transparent p-4 rounded-xl`}style={{maxHeight:'600px',overflowY:'auto'}}>
             {errors.map((error, index) => (
                 <li key={index} className='error-item'>{error}</li>

             ))}
         </ul>
         )}
         */}
        <div className='hidden relative lg:flex h-full items-center justify-center flex-1'>
        <div className={`w-60 h-60 rounded-full transition duration-100 ease-in-out ${isLoading? 'animate-pulse-spin': 'animate-spin'} ${getGradientClass(errors,hasRespOK)}`}> </div>
        <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg'></div>

          {
            /*
            <div className={`w-60 h-60 rounded-full transition duration-300 ease-in-out ${isLoading? 'animate-bounce': 'animate-spin'} ${getGradientClass(errors,hasRespOK)}`}> </div>
            <div className={`w-60 h-60 rounded-full transition duration-300 ease-in-out ${isLoading? 'animate-spin': 'animate-none'} ${getGradientClass(errors,hasRespOK)}`}> </div>
            */
          }
        </div>
      </div>
    );
}

export default Login;