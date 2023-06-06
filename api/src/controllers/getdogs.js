const axios = require('axios');
const { api_key } = process.env
const { Dog, Temp } = require('../db.js');

const endpoint = 'https://api.thedogapi.com/v1/breeds';

const getDogs = async (req, res) => {
  try {
    const response = await axios.get(endpoint, {
      params: {
        api_key: api_key
      },
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const dogBreeds = response.data;
    const dbDogs = await Dog.findAll();

    for (const dog of dbDogs) {
      const temperamentos = await dog.getTemps();
      dog.temperamentos = temperamentos.map(temp => temp.nombre);
    }

    const allDogs = [...dogBreeds, ...dbDogs];

    return dogBreeds ? res.status(200).json(allDogs) : res.status(404).send("No tenemos razas")
  } catch (error) {
    console.error('Error al obtener las razas de perro:', error);
    throw error;
  }
}

module.exports = getDogs;

