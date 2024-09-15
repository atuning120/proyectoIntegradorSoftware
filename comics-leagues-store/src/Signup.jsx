import React, { useState } from 'react';
import './index.css';




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
    const [name,setName] = useState('');
    const [lastname,setLastname] = useState('');
    const [userAge, setUserAge] = useState('');
    const [email,setEmail] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [phone,setPhone] = useState('');
    const [isRoleInHovered,setIsRoleInHovered] = useState(false);

    


    const [error, setError] = useState('');

    const [isTeacher, setIsTeacher] = useState(false);
    const [isSignUpHovered,setIsSignUpHovered] = useState(false);


    const handleRoleButtonClick = (e) => {
        e.preventDefault();
        setIsTeacher(!isTeacher);
    };
    
    const handleSignUpClick = async (evento) => {
        evento.preventDefault(); //evita que se reinicie la pagina
        let newErrors =[];
        console.log("ha hecho click: intentando crear cuenta");
        
        
        if(name == ''){
            newErrors.push('falta ingresar nombre en la casilla "Name"');
        }
        if(lastname == ''){
            newErrors.push('falta ingresar apellido en la casilla "Last Name"');
        }
        if(userAge <= 1 || userAge > 120 || userAge === undefined){
            newErrors.push('falta ingresar una edad valida en la casilla "Age"');
        }
        if(email == ''){
            newErrors.push('falta ingresar su correo en la casilla "Email"');
        }
        if(user == ''){
            newErrors.push('falta ingresar su nombre de usuario en la casilla "User Name"');
        }
        if(password == ''){
           newErrors.push('falta ingresar contraseña en la casilla "Password"');
        }
        if(phone == ''){
            newErrors.push('falta ingresar numero de telefono en la casilla "Phone"');
        }
        if(password.length < 4){
           newErrors.push('su contraseña es demasiado corta, debe usar al menos 4 characteres');
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }
        else{
            try {
                console.log("enviando solicitud al backend para almacenar esta cuenta nueva");
                const response = await fetch('backendURL', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({name: name, lastname: lastname,
                        userAge: userAge, email:email, user:user,password:password,
                        phone:phone,isTeacher:isTeacher})
                    });
                    
                    console.log('Received response: ',response);
                    if (response.ok) {
                        const data = await response.json();
                        console.log('funciono: creacion de cuenta', data);
                        setErrors([]);//limpia todos los errores
                        
                        
                    } else {
                        console.log('Signup failed:', response.statusText);
                        newErrors.push('Signup failed(problemas de conexion)');
                        
                    }
                } catch (error) {
                    console.log("error durante creacion de cuenta: ",error)
                    //setError('An error occurred');
                }
        }
        setErrors([]);//limpia todos los errores

    };

    
    return(
        <div>
            <h1 className='text-3xl text-white font-bold px-4'>
                Sign-up: create your account
            </h1>
            <form className='space-y-6 max-w-md mx-auto p-4'>


                <div className='parametros para crear cuenta'>
                    <div className='name'>
                        <label htmlFor='name' className='text-white text-2xl'>Name</label>
                        <input 
                            placeholder='Enter your name here...'
                            type='text'
                            id='name'
                            value={name}
                            onChange={(evento) =>setName(evento.target.value)}
                            maxLength={16}
                            style={{ width:'300px',marginLeft:'70px'}}
                            className='w-full border border-gray-300 text-2xl mt-4' />
                    </div>

                    <div className='lastname'>
                        <label htmlFor='lastname' className='text-white text-2xl'>Last Name</label>
                        <input 
                            placeholder='Enter your last name here...'
                            type='text'
                            id='lastname'
                            value={lastname}
                            onChange={(evento) =>setLastname(evento.target.value)}
                            maxLength={16}
                            style={{ width:'300px',marginLeft:'15px'}}
                            className='w-full border border-gray-300 text-2xl mt-4' />
                    </div>

                    <div className='age'>
                        <label htmlFor='age' className='text-white text-2xl mr-1'>Age</label>
                        <input
                            placeholder='Enter your age here...'
                            type='number'
                            id='age'
                            value={userAge}
                            onChange={(evento) =>setUserAge(evento.target.value)}
                            min={1}
                            max={120}
                            style={{ width:'300px',marginLeft:'90px'}}
                            
                            className='w-full border border-gray-300 text-2xl mt-4' />
                            
                            
                    </div>

                    <div className='email'>
                        <label htmlFor='user' className='text-white text-2xl'>Email</label>
                        <input 
                            placeholder='Enter your email here...'
                            type='email'
                            id='email'
                            value={email}
                            onChange={(evento) =>setEmail(evento.target.value)}
                            maxLength={20}
                            style={{ width:'300px',marginLeft:'76.5px'}}
                            className='w-full border border-gray-300 text-2xl mt-4' />
                    </div>

                    <div className='usuario'>
                        <label htmlFor='user' className='text-white text-2xl'>User Name</label>
                        <input 
                            placeholder='Enter user name here...'
                            type='text'
                            id='usuario'
                            value={user}
                            onChange={(evento) =>setUser(evento.target.value)}
                            maxLength={16}
                            style={{ width:'300px',marginLeft:'10px'}}
                            className='w-full border border-gray-300 text-2xl mt-4' />
                    </div>

                    <div className='password'>
                        <label htmlFor='password' className='text-white text-2xl'>Password</label>
                        <input
                            placeholder="Enter password..."
                            type="password"
                            id="password"
                            value={password}
                            onChange={(evento) =>setPassword(evento.target.value)}
                            style={{ width:'300px',marginLeft:'26px'}}
                            className='w-full p-2 border border-gray-300 rounded text-2xl mt-4'
                            maxLength={16}
                        />
                    </div>

                    <div className='phone'>
                        <label htmlFor='phone' className='text-white text-2xl'>Phone</label>
                        <input 
                            placeholder='Enter your phone number...'
                            type='text'
                            id='phone'
                            value={phone}
                            onChange={(evento) =>setPhone(evento.target.value)}
                            maxLength={16}
                            style={{ width:'300px',marginLeft:'65px'}}
                            className='w-full border border-gray-300 text-2xl mt-4' />
                    </div>
                    <br></br>
                    <div className='role button'>
                        <label htmlFor='role' className='text-white text-2xl'>Click the box to change role</label>
                        <br></br>
                        <button 
                            className="bg-gray-500 hover:bg-gray-700 text-white text-2xl"
                            style={{ backgroundColor: isRoleInHovered ? 'red' : 'darkred' ,
                                padding: '15px',
                                marginLeft: '113px',
                                marginTop: '10px',
                                transition: 'background-color 0.4s ease'
                            }}
                            onMouseEnter={() => setIsRoleInHovered(true)}
                            onMouseLeave={() => setIsRoleInHovered(false)}
                            onClick={handleRoleButtonClick}
                        />
                        <h3 className='text-white text-2xl'>{isTeacher ? 'You are a teacher' : 'You are a student'}</h3>
                    </div>


                    {/*boton de sign-up*/}
                        <button     
                        type='submit'               
                        className={`text-white py-4 px-8 text-3xl`}
                        style={{ backgroundColor: isSignUpHovered ? '#39e75f' : 'green' ,
                            transition: 'background-color 0.4s ease'
                        }}
                        onMouseEnter={() => setIsSignUpHovered(true)}
                        onMouseLeave={() => setIsSignUpHovered(false)}
                        onClick={handleSignUpClick}
                        
                    >
                    Create Account
                    </button>
                    
                        {errors.length > 0 && (
                    <ul className='error-list text-white text-2xl'>
                        {errors.map((error, index) => (
                            <li key={index} className='error-item'>{error}</li>
                        ))}
                    </ul>
                    )}
                </div>
            </form>
        </div>
    );



}

export default Signup;