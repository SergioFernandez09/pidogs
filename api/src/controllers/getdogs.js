const axios = require('axios');
const { api_key } = process.env

const endpoint = 'https://api.thedogapi.com/v1/breeds';

 const getDogs= async(req, res)=> {
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
      
      return dogBreeds ? res.status(200).json(dogBreeds) : res.status(404).send("No tenemos razas")
    } catch (error) {
      console.error('Error al obtener las razas de perro:', error);
      throw error;
    }
  }

module.exports = getDogs;
