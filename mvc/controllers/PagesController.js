// controllers/PagesController.js
// Importa el modelo de productos
let ProductModel = require('../models/Product')

// Reglas para la respuesta para la petición "/"
exports.homepage = (req, res) => {
  // Nota que la consulta a los productos utiliza "promesas"
  // conoce más en: 
  // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise
  ProductModel.all()
    .then((data) => {
      // Guardamos los productos en una variable
      let products = data;
      // Enviamos los datos a la vista
      res.render('pages/homepage', { products: products });
    });
}

// Reglas para la respuesta para la petición "/about"
exports.about = (req, res) => {
  res.send('About us');
}