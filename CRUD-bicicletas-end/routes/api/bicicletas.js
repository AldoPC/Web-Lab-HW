let express = require('express');
let router = express.Router();
let bicicletaControllerAPI = require('../../controllers/api/bicicletasControllerAPI');

//API GET, get all bicis
router.get('/', bicicletaControllerAPI.bicicleta_list);

//API POST, create bicis
router.post('/create', bicicletaControllerAPI.bicicleta_create);

router.post('/delete', bicicletaControllerAPI.bicicleta_delete);

module.exports = router;