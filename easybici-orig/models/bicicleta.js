let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let bicicletaSchema = new Schema({
  code: Number,
  color: String,
  modelo: String,
  ubicacion: { type: [Number], index: { type: "2dsphere", sparse: true } },
});

bicicletaSchema.method.toString = function () {
  return `code: ${this.code}, color: ${this.color}, modelo: ${this.modelo}`;
};

bicicletaSchema.statics.allBicis = function (cb) {
  return this.find({}, cb);
};

bicicletaSchema.statics.createInstantce = function (
  code,
  color,
  modelo,
  ubicacion
) {
  return new this({
    code: code,
    color: color,
    modelo: modelo,
    ubicacion: ubicacion,
  });
};

bicicletaSchema.statics.add = function (bici, cb) {
  this.create(bici, cb);
};

bicicletaSchema.static.findByCode = function (aCode, cb) {
  return this.findOne({ code: aCode }, cb);
};

bicicletaSchema.statics.removeByCode = function (aCode, cb) {
  return this.deleteOne({ code: aCode }, cb);
};

module.exports = mongoose.model("Bicicletas", bicicletaSchema);
