const axios = require('axios');
const { Dog, Temp } = require('../db.js');
// const imagenDefault = '../Imagenes/perro-default.png';




 const getDetailDogs= async(req, res)=> {
  try {
    const idRaza = req.params.idRaza;

    // Intentar obtener los datos de la base de datos
    const dogFromDB = await Dog.findByPk(idRaza, {
      include: {
        model: Temp,
        attributes: ['nombre'],
      },
    });

    let dogDetails;

    if (dogFromDB) {
      // Los datos están disponibles en la base de datos
      const temperamentos = dogFromDB.temps.map(temp => temp.nombre);

      dogDetails = {
        id: dogFromDB.id,
        name: dogFromDB.nombre,
        weight: dogFromDB.peso,
        height: dogFromDB.altura,
        bred_for: dogFromDB.bred_for,
        breed_group: dogFromDB.breed_group,
        life_span: dogFromDB.aniosVida,
        temperament: temperamentos,
        origin: dogFromDB.origin,
        image_url: dogFromDB.imagen,
      };
    } else {
      // Los datos no están disponibles en la base de datos, obtenerlos de la API
      const dogApiEndpoint = `https://api.thedogapi.com/v1/breeds/${idRaza}`;
      const dogApiResponse = await axios.get(dogApiEndpoint);
      const dogFromAPI = dogApiResponse.data;

      // console.log('dogFromAPI.image:', dogFromAPI.reference_image_id);
      // console.log('dogFromAPI.image.url:', dogFromAPI.image && `https://cdn2.thedogapi.com/images/${dogFromAPI.reference_image_id}.jpg`);

      dogDetails = {
        id: dogFromAPI.id,
        name: dogFromAPI.name,
        weight: dogFromAPI.weight.metric,
        height: dogFromAPI.height.metric,
        bred_for: dogFromAPI.bred_for,
        breed_group: dogFromAPI.breed_group,
        life_span: dogFromAPI.life_span,
        temperament: dogFromAPI.temperament ? dogFromAPI.temperament.split(', ') : [],
        origin: dogFromAPI.origin ? dogFromAPI.origin : ('Unknown'),
        image_url: dogFromAPI.image && dogFromAPI.image.url ? dogFromAPI.image.url : `https://cdn2.thedogapi.com/images/${dogFromAPI.reference_image_id}.jpg`,
      };
    }

    return res.status(200).json(dogDetails);
  } catch (error) {
    console.error('Error al obtener los detalles de la raza de perro:', error);
    res.status(500).json({ error: 'Error al obtener los detalles de la raza de perro' });
  }
};

module.exports = getDetailDogs;