import React, { useState } from 'react';
import '../index.css';
import '../animations.css';
import Login from './Login';
import BackButton from '../components/BackButton';


const isAuthenticated = () => {
	const token = localStorage.getItem('token');
  if(token){
    return true;
  }
	return false;
};

const fetchWithTimeout = (url, options, timeout = 5000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out(no esta llegando al backend o no esta regresando)')), timeout)
    )
]);
};


const Signup = () => {
    const [errors, setErrors] = useState([]);
    const [errorState,setErrorState] = useState(new Array(7).fill(false));
    


    const [name,setName] = useState('');
    const [lastname,setLastname] = useState('');
    const [userAge, setUserAge] = useState('');
    const [email,setEmail] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [phone,setPhone] = useState('');
    const [isRoleInHovered,setIsRoleInHovered] = useState(false);

    
    const [hasError, setHasError] = useState(false);

    const [error, setError] = useState('');

    const [isTeacher, setIsTeacher] = useState(false);
    const [isSignUpHovered,setIsSignUpHovered] = useState(false);
    const [isSignUpClicked, setIsSignUpClicked] = useState(false);

    const [isAccountCreated, setIsAccountCreated] = useState(false);
  

    const [isNameOK,setIsNameOK] = useState(false);

    const handleRoleButtonClick = (e) => {
        setIsTeacher(!isTeacher);
    };

    // Definir la mutacion de GraphQL como una cadena
    const SIGNUP_MUTATION = `
      mutation SignUp($input: NewUserInput!) {
        signUp(input: $input) {
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
    `;    

    const handleSignUpClick = async (evento) => {
        evento.preventDefault(); //evita que se reinicie la pagina
        setIsSignUpClicked(true);

        setTimeout(() => 
        {
            setIsSignUpClicked(false);
        }, 300);
            
        let newErrorState = new Array(7).fill(false);
        let newErrors =[];
        console.log("ha hecho click: intentando crear cuenta");

        //regex para validar email(brutal)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if(name == ''){
            newErrors.push('Falta nombre en la casilla "Name".');
            newErrorState[0] = true;
        }
        if(lastname == ''){
            newErrors.push('Falta apellido en la casilla "Last Name".');
            newErrorState[1] = true;
        }
        if(userAge <= 1 || userAge > 120 || userAge === undefined){
            newErrors.push('Falta una edad valida en la casilla "Age".');
            newErrorState[2] = true;
        }
        if(email == ''){
            newErrors.push('Falta su correo en la casilla "Email".');
            newErrorState[3] = true;
        }
        if (!emailRegex.test(email)) {
            newErrors.push('Formato invalido de email detectado.');
            newErrorState[3] = true;
        }
        if(user == ''){
            newErrors.push('Falta su nombre de usuario en la casilla "User Name".');
            newErrorState[4] = true;
        }
        if(password == ''){
           newErrors.push('Falta contraseña en la casilla "Password".');
           newErrorState[5] = true;
        }
        if(password.length < 4){
            newErrors.push('Su contraseña es demasiado corta, debe usar al menos 4 characteres.');
            newErrorState[5] = true;
        }
        if(phone == ''){
            newErrors.push('Falta numero de telefono en la casilla "Phone".');
            newErrorState[6] = true;
        }
        
        if (newErrors.length > 0) {
            setErrors(newErrors);
            setHasError(true);
            setIsAccountCreated(false);
            setErrorState(newErrorState);
            return;
        } else {
            setErrorState(newErrorState);
            setHasError(false);
            try {
                console.log("Enviando solicitud al backend para almacenar esta cuenta nueva");

                // Ejecuta la solicitud de fetch con la mutacion
                const response = await fetch('http://localhost:8080/query', { // Cambia esto a la URL correcta de tu backend GraphQL
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: SIGNUP_MUTATION, // La mutacion de GraphQL
                        variables: {
                            input: {
                                nombre: name,
                                apellido: lastname,
                                edad: parseInt(userAge),
                                correo: email,
                                username: user,
                                password: password,
                                telefono: phone,
                                rol: isTeacher ? 'profesor' : 'alumno', // Ajusta esto segun tu backend
                            },
                        },
                    }),
                });
                
                if(response.ok){
                    const data = await response.json();
                    console.log('Resultado del registro:', data);
                    if (data.errors) {
                        newErrors.push('Error en la creacion de la cuenta.');
                        setErrors(newErrors);
                        setIsAccountCreated(false);
                    } else {
                        console.log('Registro exitoso:', data.data.signUp);
                        setErrors([]);
                        setIsAccountCreated(true);
                        console.log("token: ",data.data.signUp.token)
                        localStorage.setItem('token', data.data.signUp.token);
                        localStorage.setItem('user', JSON.stringify(data.data.signUp.user));
                        
                        // Redirigir a la página de inicio
                        window.location.href = '/';
                }}
            } catch (error) {
                console.error('Error durante la creacion de la cuenta:', error);
                newErrors.push('Error durante la creacion de la cuenta.');
                setErrors(newErrors);
                setIsAccountCreated(false);
            }
        }
    };
    

    return(
        <div className='flex h-screen -translate-y-3'>
            <div className='flex-1 w-1/2 flex justify-center rounded-md border-slate-200 border-2'>
                <div className='bg-white p-6 rounded-xl h-full'>
                    <h1 className='font-montserrat text-5xl bg-gradient-to-tr from-cyan-300 to-cyan-800 rounded-sm bg-clip-text text-transparent font-extrabold'>
                    Create your account
                    </h1>
                    <p className='font-montserrat text-2xl text-gray-400 flex items-center justify-center pr-40'>
                    <br></br>
                    </p>
            <form className=''>
                    <div className='name'>
                        <label htmlFor='name' className='text-black  text-2xl'>Name</label>
                        <input 
                            placeholder='Enter your name here...'
                            type='text'
                            id='name'
                            value={name}
                            onChange={(evento) =>setName(evento.target.value)}
                            maxLength={16}
                            style={{ width:'300px',marginLeft:'71px'}}
                            className='w-full text-2xl rounded-md mt-3 py-1 hover:bg-gray-200' />

                            {errorState[0] && <p className='-translate-y-14 translate-x-36 absolute text-red-500 text-sm mt-1'>{"Error, name can't be blank"}</p>} {/* Error Message */}
                    </div>
                    <div className='lastname'>
                        <label htmlFor='lastname' className='text-black  text-2xl'>Last Name</label>
                        <input 
                            placeholder='Enter last name here...'
                            type='text'
                            id='lastname'
                            value={lastname}
                            onChange={(evento) =>setLastname(evento.target.value)}
                            maxLength={16}
                            style={{ width:'300px',marginLeft:'15px'}}
                            className='w-full text-2xl rounded-md mt-3 py-1 hover:bg-gray-200' />

                            {errorState[1] && <p className='-translate-y-14 translate-x-36 absolute text-red-500 text-sm mt-1'>{"Error, last name can't be blank"}</p>} {/* Error Message */}
                    </div>

                    <div className='age'>
                        <label htmlFor='age' className='text-black text-2xl mr-1'>Age</label>
                        <input
                            placeholder='Enter your age here...'
                            type='number'
                            id='age'
                            value={userAge}
                            onChange={(evento) =>setUserAge(evento.target.value)}
                            min={2}
                            max={120}
                            style={{ width:'300px',marginLeft:'93px'}}
                            
                            className='w-full text-2xl rounded-md mt-3 py-1 hover:bg-gray-200' />
                            
                            {errorState[2] && <p className='-translate-y-14 translate-x-36 absolute text-red-500 text-sm mt-1'>{"Error, age out of range(2~120) or missing"}</p>} {/* Error Message */}
                    </div>

                    <div className='email'>
                        <label htmlFor='user' className='text-black  text-2xl'>Email</label>
                        <input 
                            placeholder='Enter your email here...'
                            type='email'
                            id='email'
                            value={email}
                            onChange={(evento) =>setEmail(evento.target.value)}
                            maxLength={20}
                            style={{ width:'300px',marginLeft:'76.5px'}}
                            className='w-full text-2xl rounded-md mt-3 py-1 hover:bg-gray-200' />
                            {errorState[3] && <p className='-translate-y-14 translate-x-36 absolute text-red-500 text-sm mt-1'>{"Error, email can't be blank or is invalid"}</p>} {/* Error Message */}
                    </div>

                    <div className='usuario'>
                        <label htmlFor='user' className='text-black text-2xl'>User Name</label>
                        <input 
                            placeholder='Enter user name here...'
                            type='text'
                            id='usuario'
                            value={user}
                            onChange={(evento) =>setUser(evento.target.value)}
                            maxLength={16}
                            style={{ width:'300px',marginLeft:'10px'}}
                            className='w-full text-2xl rounded-md mt-3 py-1 hover:bg-gray-200' />
                            {errorState[4] && <p className='-translate-y-14 translate-x-36 absolute text-red-500 text-sm mt-1'>{"Error, username can't be blank"}</p>} {/* Error Message */}
                    </div>
                    
                    <div className='password'>
                        <label htmlFor='password' className='text-black text-2xl'>Password</label>
                        <input
                            placeholder="Enter password here..."
                            type="password"
                            id="password"
                            value={password}
                            onChange={(evento) =>setPassword(evento.target.value)}
                            style={{ width:'300px',marginLeft:'30px'}}
                            className='w-full text-2xl rounded-md mt-3 py-1 hover:bg-gray-200'
                            maxLength={16} />
                            {errorState[5] && <p className='-translate-y-14 translate-x-36 absolute text-red-500 text-sm mt-1'>{"Error, pwd can't be blank or is too short"}</p>} {/* Error Message */}
                    </div>

                    <div className='phone'>
                        <label htmlFor='phone' className='text-black text-2xl'>Phone</label>
                        <input 
                            placeholder='Enter phone number...'
                            type='text'
                            id='phone'
                            value={phone}
                            onChange={(evento) =>setPhone(evento.target.value)}
                            maxLength={16}
                            style={{ width:'300px',marginLeft:'67px'}}
                            className='w-full text-2xl rounded-md mt-3 py-1 hover:bg-gray-200' />
                            {errorState[6] && <p className='-translate-y-14 translate-x-36 absolute text-red-500 text-sm mt-1'>{"Error, phone can't be blank"}</p>} {/* Error Message */}
                    </div>
                    
                    <div className='mt-6'>
                        <div className='relative'>
                            <p className='text-black text-2xl'>Choose your role:</p>
                            <h3 className='text-black text-2xl mb-4 ml-52 absolute top-0'>{isTeacher ? 'You are a teacher' : 'You are a student'}</h3>
                        </div>
                    <div className='ml-52'>
                        <input
                            type='radio'
                            id='student'
                            name='role'
                            value='student'
                            checked={!isTeacher}
                            onChange={handleRoleButtonClick}
                            className='w-7 h-7 mr-2'
                            style={{ accentColor: '#e5e4e2' }}
                        />
                        <label htmlFor='student' className='text-black text-2xl'>Student</label>
                        <br></br>
                        <input
                            type='radio'
                            id='teacher'
                            name='role'
                            value='teacher'
                            checked={isTeacher}
                            onChange={handleRoleButtonClick}
                            className='w-7 h-7 mr-2'
                            style={{ accentColor: '#e5e4e2' }}
                        />
                        <label htmlFor='teacher' className='text-black text-2xl'>Teacher</label>
                    </div>

                    <br></br>
                    {/*boton de sign-up*/}
                        <button     
                        type='submit'
                        className={`text-white py-3 px-6 mt-7 text-3xl rounded-3xl ml-6 mb-4 transform hover:scale-105 active:scale-95  bg-gray-900 hover:bg-gray-950 ${isSignUpClicked ? 'button-clicked' : ''}`}
                        onMouseEnter={() => setIsSignUpHovered(true)}
                        onMouseLeave={() => setIsSignUpHovered(false)}
                        onClick={handleSignUpClick}
                        
                    >
                    Create Account
                    </button>
                </div>

                {/*boton de regreso a log-in*/}
                <div>
                    <BackButton to={'/login'} destination={'log-in'}/>
                </div>
                    

            </form>
                </div>

            </div>
            <div className='flex-1 flex justify-center items-center h-screen'>
                <div className='w-full h-full overflow-hidden rounded-md border-gray-400 border-8'>
                    <img
                        src='src\assets\ai_bar.webp'
                        alt='imagen placeholder'
                        className='w-full h-full object-cover' 
                    />
                </div>
            </div>
    
            
            

        </div>
    );



}

export default Signup;