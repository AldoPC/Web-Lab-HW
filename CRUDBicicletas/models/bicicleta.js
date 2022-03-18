const knex = require('../database/connection');
// Crea un nuevo Producto (pero no lo almacena en la base)
exports.factory = (name, description, price) => {
  return {
    name: name,
    description: description,
    price: price
  }
}

// Obtiene todos los productos en la base
exports.all = () => {
  // Realiza la consulta dentro de knex
  return knex
    .select('*')
    .from('bicicletas');
}

exports.create = (bici) => {
  return knex('bicicletas')
    .insert({
      modelo: bici.modelo,
      color: bici.color,
      lat: bici.lat,
      lon: bici.lon
    });
}

exports.update = (id, product) => {
  return knex('bicicletas')
    .update(product)
    .update('updated_at', knex.fn.now())
    .where('id', id);
}

exports.find = (id) => {
  return knex
    .select('*')
    .from('bicicletas')
    .where('id', id)
    .first();
}

exports.update = (id, product) => {
  return knex('bicicletas')
    .update(product)
    .update('updated_at', knex.fn.now())
    .where('id', id);
}

exports.delete = (id) => {
  return knex('bicicletas')
    .delete()
    .where('id', id);
}

