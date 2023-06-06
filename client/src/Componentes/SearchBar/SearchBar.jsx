import React, { useState } from 'react';
import './SearchBar.css';
import { RiSearch2Line } from 'react-icons/ri';

const SearchBar = ({ dogs, setFilteredDogs }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filtrar los perros en función de la búsqueda
    const filtered = dogs.filter((dog) => {
      if (dog.name) {
        // Para el objeto de la API que tiene la propiedad "name"
        return dog.name.toLowerCase().includes(query.toLowerCase());
      } else if (dog.nombre) {
        // Para el objeto creado que tiene la propiedad "nombre"
        return dog.nombre.toLowerCase().includes(query.toLowerCase());
      }
      return false;
    });

    // Actualizar la lista de perros filtrados
    setFilteredDogs(filtered);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Buscar por nombre"
        className="search-input"
      />
      <button type="button" className="search-button">
        <RiSearch2Line />
      </button>
    </div>
  );
};

export default SearchBar;

