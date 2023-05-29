const { Dog, Temp } = require('../db.js');

const postNewDog = async(req, res) => {
try {
    const { imagen, nombre, altura, peso, aniosVida, temperamentos } = req.body;

    // Verificar que los campos obligatorios no estén vacíos
    if ( !imagen || !nombre || !altura || !peso || !aniosVida  ) {
        return res.status(400).json({ message: 'Los campos obligatorios no pueden estar vacíos.' });
        }

    // Verificar que se proporcionen al menos un temperamento
    if (!temperamentos || temperamentos.length === 0) {
        return res.status(400).json({ message: 'Debe proporcionar al menos un temperamento.' });
        }

    // Crear el perro en la base de datos
    const newDog = await Dog.create({
        imagen,
        nombre,
        altura,
        peso,
        aniosVida,
    });

    // Buscar los temperamentos en la base de datos
    const temperamentosEncontrados = await Temp.findAll({
        where: {
          nombre: temperamentos,
        },
      });
  
      // Asociar los temperamentos encontrados al perro creado
      await newDog.addTemps(temperamentosEncontrados);
  
      res.status(201).json({ message: 'Perro creado exitosamente.' });


} catch (error) {
    console.error('Error al crear el perro:', error);
    res.status(500).json({ message: 'Error al crear el perro.' });
  }
}


module.exports = postNewDog