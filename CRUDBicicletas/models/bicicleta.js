let Bicicleta = function (id, color, modelo, ubicacion) {
  this.id = id;
  this.color = color;
  this.modelo = modelo;
  this.ubicacion = ubicacion;
};

Bicicleta.prototype.toString = function () {
  return `Bicicleta id: ${this.id}, color: ${this.color}, modelo: ${this.modelo}, ubicacion: ${this.ubicacion}`;
};

Bicicleta.allBicis = [];

Bicicleta.add = function (bici) {
  Bicicleta.allBicis.push(bici);
};

let b1 = new Bicicleta(
  1,
  "rojo",
  "bmx",
  [19.284003770763764, -99.13849037146178]
);
let b2 = new Bicicleta(
  2,
  "azul",
  "benotto",
  [19.285006328329395, -99.13506787292435]
);
let b3 = new Bicicleta(
  3,
  "verde",
  "mamalons",
  [19.28426706930462, -99.13413446423233]
);

Bicicleta.add(b1);
Bicicleta.add(b2);
Bicicleta.add(b3);

Bicicleta.findById = function (id) {
  let bici = Bicicleta.allBicis.find((x) => x.id == id);
  if (bici) {
    return bici;
  } else {
    throw new Error(`Bicicleta no encontrada con id ${id}`);
  }
};

Bicicleta.removeById = function (id) {
  for (let i = 0; i < Bicicleta.allBicis.length; i++) {
    if (Bicicleta.allBicis[i].id == id) {
      Bicicleta.allBicis.splice(i, 1);
      break;
    }
  }
};

module.exports = Bicicleta;
