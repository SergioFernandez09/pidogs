const axios = require('axios');
const { api_key } = process.env;
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
    const dbDogs = await Dog.findAll({
      include: Temp, // Incluir la relación con la tabla de temperamentos
      attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir las columnas createdAt y updatedAt de la respuesta
      through: { attributes: [] }, // Excluir las columnas adicionales generadas por la relación many-to-many
    });


    for (const dog of dbDogs) {
      const temperamentos = await dog.getTemps(); // Esperar a que se resuelva la promesa
      const nombresTemperamentos = temperamentos.map(temp => temp.nombre);
      dog.temperamentos = nombresTemperamentos;
    }

    const allDogs = [...dogBreeds, ...dbDogs];

    return dogBreeds ? res.status(200).json(allDogs) : res.status(404).send("No tenemos razas");
  } catch (error) {
    console.error('Error al obtener las razas de perro:', error);
    throw error;
  }
};

module.exports = getDogs;


