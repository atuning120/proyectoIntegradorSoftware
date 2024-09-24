import React from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para la navegación

//Cerrar sesion
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Devuelve true si hay un token
};

const UserProfile = () => {
  const navigate = useNavigate(); // Hook de react-router-dom para redirigir

  const handleLogout = () => {
    logout(); // Cierra la sesión
    navigate('/'); // Redirige a la página de inicio
  };

  return (
    <button onClick={handleLogout}>Cerrar Sesion</button>
  );
};

export default UserProfile;
