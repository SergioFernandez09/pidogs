import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DetailPage.css'; 
import NavDetail from '../../Componentes/NavDetail/NavDetail';

const DetailPage = ({ match, history }) => {
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/dogs/${match.params.id}`);
        setDog(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la información del perro:', error);
      }
    };

    fetchDog();
  }, [match.params.id]);

  if (loading) {
    return <div className='Detail-loading'> Loading...</div>;
  }

  if (!dog) {
    return <div>Error al cargar la información del perro.</div>;
  }

  return (
    <div className="detail-container">
      <NavDetail/>
      <div className="detail-dog-card">
      <div className="image-container">
        <img src={dog.image_url} alt={dog.name} className="detail-dog-image" />
      </div>
      <div className="details-container">
        <h1>{dog.name}</h1>
        <p>ID: {dog.id}</p>
        <p>Height: {dog.height}</p>
        <p>Weight: {dog.weight}</p>
        <p>Temperament: {dog.temperament.join(', ')}</p>
        <p>Life Span: {dog.life_span}</p>
        <p>Bred Ford: {dog.bred_for}</p>
        <p>Breed Group: {dog.breed_group}</p>
        <p>Origin: {dog.origin }</p>
        <button onClick={() => history.goBack()}>Back</button>
      </div>
      </div>
    </div>
  );
};

export default DetailPage;

