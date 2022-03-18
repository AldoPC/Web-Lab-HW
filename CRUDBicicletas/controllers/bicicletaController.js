const Bicicleta = require("../models/bicicleta");

exports.Bicicleta_list = function (req, res) {
  Bicicleta.all().then((data) => {
    // Guardamos los productos en una variable
    let bicicletas = data;
    // Enviamos los datos a la vista
    res.render("bicicletas/index", { bicis: bicicletas });
  });
};

exports.Bicicleta_create_get = function (req, res) {
  res.render("bicicletas/create");
};

exports.Bicicleta_create_post = function (req, res) {
  let bici = {
    modelo: req.body.modelo,
    color: req.body.color,
    lat: req.body.lat,
    lon: req.body.lon,
  };
  Bicicleta.create(bici).then((id) => {
    res.redirect("/bicicletas");
  });
};

exports.Bicicleta_delete_post = function (req, res) {
  // Obtiene el id que viene en la url
  let id = req.params.id;
  // Busca dentro de la base de datos el producto con el id indicado
  Bicicleta.find(id).then((bici) => {
    // Si el producto no existe entonces
    if (bici == null) {
      // Regresa el error 404
      res.status(404).send('Not found');
      return;
    }
    // Elimina los datos del producto
    Bicicleta.delete(bici.id)
      .then((id) => {
        // Al terminar redirige el índice
        res.redirect("/bicicletas");
      });
  });

};

exports.Bicicleta_update_get = function (req, res) {
  let bici = Bicicleta.find(req.params.id);
  res.render("bicicletas/update", { bici });
};

exports.Bicicleta_update_post = function (req, res) {
  let bici = Bicicleta.find(req.body.id);
  bici.color = req.body.color;
  bici.modelo = req.body.modelo;
  bici.lat = req.body.lat;
  bici.lon = req.body.lon;
  res.redirect("/bicicletas");
};

exports.Bicicleta_update_get = function (req, res) {
  let id = req.params.id;

  Bicicleta.find(id).then((bici) => {
    // Si el producto no existe entonces
    if (bici == null) {
      // Regresa el error 404
      res.status(404).send("Not found");
      return;
    }
    // Si el producto existe entonces muestra la vista products/show.hbs
    // con la información del productoß
    res.render("bicicletas/update", { bici });
  });
};

exports.Bicicleta_update_post = function (req, res) {
  let id = req.params.id;
  console.log(id)
  Bicicleta.find(id).then((bici) => {
    // Si el producto no existe entonces
    if (bici == null) {
      // Regresa el error 404
      res.status(404).send("Not found");
      return;
    }

    // Define los datos del producto actualizado
    let updateBici = {
      modelo: req.body.modelo,
      color: req.body.color,
      lat: req.body.lat,
      lon: req.body.lon,
    };
    console.log(req.body.name);
    // Actualiza los datos del producto
    Bicicleta.update(bici.id, updateBici).then((id) => {
      // Al terminar redirige el índice

      res.redirect("/bicicletas");
    });
  });
};
