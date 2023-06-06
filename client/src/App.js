import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import FilterAndSort from './Componentes/FilterAndSort/FilterAndSort';
import DogCard from './Componentes/DogCard/DogCard';
import Nav from './Componentes/Nav/Nav';
import Footer from './Componentes/Footer/Footer';
import LandingPage from './Componentes/LandingPage/LandingPage';
import DetailPage from './Componentes/DetailPage/DetailPage';
import FormPage from './Componentes/FormPage/FormPage';
// import FormPage from './FormPage';

const App = () => {
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

  

  return (
    <Router>
      <div className="App">
        <Nav dogs={dogs} handleSearch={handleSearch} />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home">
            <FilterAndSort dogs={dogs} setFilteredDogs={setFilteredDogs} />
            <div className="dog-list">
              {currentDogs.map((dog) => (
                <DogCard dog={dog} key={dog.id} />
              ))}
            </div>
            <div className="pagination">
              {currentPage > 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="page-number prev"
                >
                  Prev
                </button>
              )}
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`page-number ${
                    currentPage === number ? 'active' : ''
                  }`}
                >
                  {number}
                </button>
              ))}
              {currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="page-number next"
                >
                  Next
                </button>
              )}
            </div>
          </Route>
          <Route path="/detail/:id" component={DetailPage} />
          <Route path="/form" component={FormPage} />
        </Switch>
        {window.location.pathname !== '/' && <Footer />}
      </div>
    </Router>
  );
};

export default App;
