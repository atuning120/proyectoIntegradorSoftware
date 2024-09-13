import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Asegúrate de tener este archivo para Tailwind
import Login from './Login';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);