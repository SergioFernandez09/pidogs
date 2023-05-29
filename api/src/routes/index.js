
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDogs = require('../controllers/getdogs')
const getDetailDogs = require('../controllers/getDetailDogs')
const getDogByName = require('../controllers/getDogByName')
const postNewDog = require('../controllers/postNewDog')
const getTemperaments= require('../controllers/getTemperaments')


const router = Router();
router.get("/dogs", getDogs)
router.get('/dogs/name', getDogByName)
router.get("/dogs/:idRaza", getDetailDogs )
router.post("/dogs", postNewDog)
router.get('/temperaments', getTemperaments)


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
