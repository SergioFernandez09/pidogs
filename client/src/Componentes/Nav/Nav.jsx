import React from 'react';
import { Link } from 'react-router-dom';
import DogFilter from '../DogFilter/DogFilter';
import './Nav.css';


const Nav = ({dogs, handleSearch }) => {
    return (
      <nav className="nav-container">
        <Link to="/" className="logo">Dog App</Link>
        <div className="nav-links">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/form" className="nav-link">Create Dog</Link>
        </div>
        <div className="dog-filter-container">
        <DogFilter dogs={dogs} setFilteredDogs={handleSearch} />
        </div>
      </nav>
    );
  };
export default Nav;
