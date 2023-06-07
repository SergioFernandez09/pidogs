import React from 'react';
import { Link } from 'react-router-dom';
import './DogCard.css'

const DogCard = ({ dog }) => {
  return (
    <div className="dog-card" key={dog.id}>
      <img src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`} alt={dog.name} />
      <div className='card__body'>
          <h3 className='card__title'>{dog.name || dog.nombre}</h3>
          <p className="temperament">Temperamentos: {dog.temperament }</p>
          {dog.weight && dog.weight.imperial && dog.weight.metric && (
            <p className="weight">
              Peso: {dog.weight.imperial} lb / {dog.weight.metric} kg
            </p>
          )}
          {!dog.weight && dog.peso && (
            <p className="weight">
              Peso: {dog.peso} lb / {dog.peso} kg
            </p>
          )}
          <Link to={`/detail/${dog.id}`} className="detail-link">Ver detalle</Link>
      </div>
    </div>
  );
};

export default DogCard;