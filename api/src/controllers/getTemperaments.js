const axios = require('axios');
const { Temp } = require('../db.js');

const getTemperaments = async (req, res) => {
  try {
    // Verificar si los temperamentos ya existen en la base de datos
    const existingTemperaments = await Temp.findAll();

    // Si existen temperamentos en la base de datos, se retornan directamente
    if (existingTemperaments.length > 0) {
      return res.status(200).json(existingTemperaments);
    }

    // Obtener los temperamentos desde la API
    const response = await axios.get('https://api.thedogapi.com/v1/breeds');
    const breeds = response.data;

    // Obtener los temperamentos únicos de todas las razas
    const uniqueTemperaments = new Set();
    breeds.forEach(breed => {
      const breedTemperaments = breed.temperament ? breed.temperament.split(', ') : [];
      breedTemperaments.forEach(temperament => uniqueTemperaments.add(temperament.trim()));
    });

    // Crear y guardar los temperamentos en la base de datos
    const temperaments = Array.from(uniqueTemperaments);
    const createdTemperaments = await Temp.bulkCreate(
      temperaments.map(temp => ({ nombre: temp }))
    );

    res.status(200).json(createdTemperaments);
  } catch (error) {
    console.error('Error al obtener los temperamentos:', error);
    res.status(500).json({ message: 'Error al obtener los temperamentos.' });
  }
};

module.exports = getTemperaments;
