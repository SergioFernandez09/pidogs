import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">Bienvenido a Dogpedia</h1>
      <p className="about-description">
        Dogpedia es una página dedicada a proporcionar información detallada sobre las diferentes razas de perros.
        Ya sea que estés buscando información sobre una raza específica o simplemente quieras explorar y descubrir
        nuevas razas, estás en el lugar correcto.
      </p>
      <p className="about-description">
        Nuestro objetivo es ayudarte a conocer más sobre las características, el temperamento, los cuidados y otras
        peculiaridades de cada raza de perro. Con nuestra extensa base de datos, encontrarás información completa y
        confiable que te ayudará a tomar decisiones informadas sobre la raza de perro que se ajuste mejor a tus
        necesidades y estilo de vida.
      </p>
      <p className="about-description">
        Explora nuestras categorías de razas, busca por nombre o utiliza nuestros filtros avanzados para encontrar la
        raza perfecta para ti. Además, puedes encontrar consejos útiles sobre el cuidado, adiestramiento y alimentación
        de perros en nuestra sección de recursos.
      </p>
      <p className="about-description">
        ¡Esperamos que disfrutes de tu experiencia en Dogpedia y que encuentres toda la información que necesitas para
        convertirte en un dueño de perro responsable y feliz!
      </p>
    </div>
  );
};

export default About;
