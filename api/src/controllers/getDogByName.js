const axios = require('axios');
const { api_key } = process.env
const { Op } = require('sequelize');
const { Dog, Temp } = require('../db.js');

const getDogByName = async (req, res) => {
    try {
      const { name } = req.query;
      
  
      const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': api_key,
          },
      });
                                     // https://api.thedogapi.com/v1/breeds/search?q=Akita
      const dogsFromAPI = response.data.map(dog => {
        return {
            id: dog.id,
            name: dog.name,
            weight: dog.weight,
            height: dog.height,
            bred_for: dog.bred_for,
            breed_group: dog.breed_group,
            life_span: dog.life_span,
            temperament: dog.temperament,
            origin: dog.origin,
            image_url: dog.image?.url || '',
        };
    });
                                  
      const dogsFromDB = await Dog.findAll({
        where: {
          nombre: {
            [Op.iLike]: `%${name}%`,
                },
            },
        });
                                  
       const dogs = dogsFromDB.map(dog => {
        return {
            id: dog.id,
            name: dog.nombre,
            weight: dog.peso,
            height: dog.altura,
            bred_for: dog.bred_for,
            breed_group: dog.breed_group,
            ife_span: dog.aniosVida,
            temperament: dog.temperament,
            origin: dog.origen,
            image_url: '',
            };
        });
                                  
      const combinedDogs = [...dogs, ...dogsFromAPI];                                

        if (combinedDogs.length === 0) {
           return res.status(404).json({ message: 'No se encontraron razas de perros con ese nombre.' });
        }
                                  
        res.status(200).json(combinedDogs);
        } catch (error) {
        console.error('Error al obtener los detalles de la raza de perro desde la API:', error);
            res.status(500).json({ message: 'Error al obtener los detalles de la raza de perro desde la API.' });
        }
       };
                                  
  
  module.exports = getDogByName;