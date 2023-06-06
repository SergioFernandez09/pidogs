import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setTemperamentFilter, setSortBy } from '../../redux/actions';
import axios from 'axios';
import './FilterAndSort.css'

const FilterAndSort = ({ dogs, setTemperamentFilter, setSortBy, setFilteredDogs }) => {
  const [temperaments, setTemperaments] = useState([]);
  const [filteredByTemperament, setFilteredByTemperament] = useState([]);
  const [isFilteringByTemperament, setIsFilteringByTemperament] = useState(false);


  useEffect(() => {
    const fetchTemperaments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/temperaments');
        const temperamentsData = response.data;
        setTemperaments(temperamentsData);
      } catch (error) {
        console.error('Error al obtener los temperamentos:', error);
      }
    };

    fetchTemperaments();
  }, []);

  const handleTemperamentFilter = (event) => {
    const selectedTemperament = event.target.value;
    setTemperamentFilter(selectedTemperament);
    filterDogsByTemperament(selectedTemperament);
  };

  const handleSortBy = (event) => {
    const selectedSortBy = event.target.value;
    setSortBy(selectedSortBy);
    sortDogs(selectedSortBy);
  };

  const filterDogsByTemperament = (temperament) => {
    if (temperament === "") {
      setFilteredDogs(dogs);
      setFilteredByTemperament([]);
      setIsFilteringByTemperament(false);
    } else {
      const filtered = dogs.filter((dog) => {
        return dog.temperament && dog.temperament.includes(temperament);
      });
      setFilteredDogs(filtered);
      setFilteredByTemperament(filtered);
      setIsFilteringByTemperament(true);
    }
  };
  

  const sortDogs = (sortBy) => {
    let sorted;
    if (isFilteringByTemperament) {
      sorted = [...filteredByTemperament].sort((a, b) => {
        // Ordenar los resultados filtrados por temperamento
        switch (sortBy) {
          case "nameAscending":
            return a.name.localeCompare(b.name);
          case "nameDescending":
            return b.name.localeCompare(a.name);
          case "weightAscending":
            return a.weight - b.weight;
          case "weightDescending":
            return b.weight - a.weight;
          default:
            return 0;
        }
      });
    } else {
      sorted = [...dogs].sort((a, b) => {
        // Ordenar todos los perros
        switch (sortBy) {
          case "nameAscending":
            return a.name.localeCompare(b.name);
          case "nameDescending":
            return b.name.localeCompare(a.name);
          case "weightAscending":
            return a.weight - b.weight;
          case "weightDescending":
            return b.weight - a.weight;
          default:
            return 0;
        }
      });
    }
    setFilteredDogs(sorted);
  };
  
  const resetFilters = () => {
    setFilteredDogs(dogs);
    setFilteredByTemperament([]);
    setIsFilteringByTemperament(false);
  };

  return (
    <div>
      <h3>Filter and Sort</h3>
      <div className='filterTemp'>
        <label htmlFor="temperament">Filter by Temperament:</label>
        <select id="temperament" onChange={handleTemperamentFilter}>
          <option value="">All</option>
          {temperaments.map((temperament) => (
            <option key={temperament.id} value={temperament.nombre}>
              {temperament.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className='SortAscDes'>
        <label htmlFor="sortBy">Sort By Name:</label>
        <select id="sortBy" onChange={handleSortBy}>
          <option value="nameAscending">(Ascending)</option>
          <option value="nameDescending">(Descending)</option>
        </select>
      </div>
      
      <button className="detail-link" onClick={resetFilters}>Reset</button>
    </div>
  );
};

const mapDispatchToProps = {
  setTemperamentFilter,
  setSortBy,
};

export default connect(null, mapDispatchToProps)(FilterAndSort);

