let express = require("express");
let router = express.Router();
let bicicletaController = require("../controllers/bicicletaController");

router.get("/", bicicletaController.Bicicleta_list);

router.get("/create", bicicletaController.Bicicleta_create_get);

router.post("/create", bicicletaController.Bicicleta_create_post);

router.delete("/:id/delete", bicicletaController.Bicicleta_delete_post);

router.get("/:id/update", bicicletaController.Bicicleta_update_get);

router.put("/:id/update", bicicletaController.Bicicleta_update_post);

module.exports = router;
