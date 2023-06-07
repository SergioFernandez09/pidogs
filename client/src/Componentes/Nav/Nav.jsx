import React from 'react';
import { Link } from 'react-router-dom';
import { FaDog } from 'react-icons/fa';
import SearchBar from '../SearchBar/SearchBar';
import './Nav.css';


const Nav = ({dogs, handleSearch }) => {
  
    return (
      <nav className="nav-container">
        <div>
        <FaDog size={24} />
        <Link to="/" className="logo" >DogPedia</Link>
        </div>
        <div className="nav-links">
          <Link to="/home" className="nav-link">Inicio</Link>
          <Link to="/about" className="nav-link">Nosotros</Link>
          <Link to="/form" className="nav-link">Crea Tu Perro</Link>
        </div>
        <div className="dog-filter-container">
        <SearchBar dogs={dogs} setFilteredDogs={handleSearch} />
        </div>
      </nav>
    );
  };
export default Nav;
