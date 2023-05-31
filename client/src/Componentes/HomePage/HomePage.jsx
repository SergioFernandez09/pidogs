import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css'; // Archivo CSS personalizado

import DogCard from '../DogCard/DogCard';
import Nav from '../Nav/Nav';



const HomePage = () => {
  const [dogs, setDogs] = useState([]);

  const [filteredDogs, setFilteredDogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/dogs');
      const dogBreeds = response.data;
      setDogs(dogBreeds);
      setFilteredDogs(dogBreeds);
    } catch (error) {
      console.error('Error al obtener las razas de perro:', error);
    }
  };

  const handleSearch = (filtered) => {
    setFilteredDogs(filtered);
  };
  
  //Paginacion
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = filteredDogs.slice(indexOfFirstDog, indexOfLastDog);
  const totalPages = Math.ceil(filteredDogs.length / dogsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  //const imgEdit = `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg` ? `https://cdn2.thedogapi.com/images/${dog.reference_image_id}_1280.jpg` : `https://cdn2.thedogapi.com/images/${dog.reference_image_id}_1280.jpg`

  return (
    <div className="home-page">
        <Nav dogs={dogs}  handleSearch={handleSearch} />
      <div className="dog-list">
        {currentDogs.map((dog) => (
          <DogCard dog={dog} key={dog.id}/>
        ))}
      </div>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`page-number ${currentPage === number ? 'active' : ''}`} > {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

