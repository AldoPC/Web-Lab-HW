/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('bicicletas').del()
  await knex('bicicletas').insert([
    {modelo: 'bmx', color: 'rojo', lat: 19.284003770763764, lon: -99.13849037146178},
    {modelo: 'benotto', color: 'azul', lat: 19.285006328329395, lon: -99.13506787292435}
  ]);
};
