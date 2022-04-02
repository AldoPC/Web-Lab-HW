var express = require("express");
const router = express.Router();
var route = express.Router();

let usuarioController = require("../../controllers/api/usuarioControllerAPI");

router.get("/", usuarioController.usuario_list);

router.post("/create", usuarioController.usuarios_create);

router.post("/reservar", usuarioController.usuario_reservar);

module.exports = router;
