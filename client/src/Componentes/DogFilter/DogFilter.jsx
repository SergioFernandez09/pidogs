import React, { useState } from 'react';
import './DogFilter.css'
import { RiSearch2Line } from 'react-icons/ri';

const DogFilter = ({ dogs, setFilteredDogs }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filtrar los perros en función de la búsqueda
    const filtered = dogs.filter((dog) =>
      dog.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDogs(filtered);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Buscar por nombre"
        className='search-input'
      />
      <button type='button' className='search-button'>
      <RiSearch2Line />
      </button>
    </div>
  );
};

export default DogFilter;
