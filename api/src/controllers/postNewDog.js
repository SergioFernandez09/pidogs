const { Dog, Temp } = require('../db.js');

let lastDogId = 264; // Último ID utilizado en la API

const postNewDog = async (req, res) => {
  try {
    const { nombre, altura, peso, aniosVida, temperamentos } = req.body;

    // Verificar que los campos obligatorios no estén vacíos
    if (!nombre || !altura || !peso || !aniosVida) {
      return res.status(400).json({ message: 'Los campos obligatorios no pueden estar vacíos.' });
    }

    // Verificar que se proporcionen al menos un temperamento
    if (!temperamentos || temperamentos.length === 0) {
      return res.status(400).json({ message: 'Debe proporcionar al menos un temperamento.' });
    }

    // Generar el siguiente ID basado en el último ID utilizado
    const id = lastDogId + 1;

    // Crear el perro en la base de datos con el ID generado
    const newDog = await Dog.create({
      id,
      nombre,
      altura,
      peso,
      aniosVida,
    });

    // Actualizar el último ID utilizado
    lastDogId = id;

   // Crear los temperamentos en la base de datos
   const createdTemperaments = await Promise.all(
    temperamentos.map((temperamento) => Temp.create({ nombre: temperamento }))
  );

  // Asociar los temperamentos creados al perro creado
  await newDog.addTemps(createdTemperaments);

    res.status(201).json({ message: 'Perro creado exitosamente.' });
  } catch (error) {
    console.error('Error al crear el perro:', error);
    res.status(500).json({ message: 'Error al crear el perro.' });
  }
};

module.exports = postNewDog;
