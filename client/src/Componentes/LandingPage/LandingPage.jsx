import React from 'react';
import './LandingPage.css'; // Importa la hoja de estilos
import imagen from '../../Imagenes/fondo-perros.png'
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-page-img">
        <img src={imagen} alt="Fondo del proyecto de Perros" />
      </div>
      <div className="landing-content">
        <h1>Bienvenido al mundo de los perros</h1>
        <p>Explora el fascinante universo canino y descubre todo lo que necesitas saber para cuidar y disfrutar de tu fiel compañero.</p>
      <Link to="/home" >
        <button>¡Haz clic y entra en la manada!</button>
      </Link>
      </div>
    </div>
  );
};

export default LandingPage;