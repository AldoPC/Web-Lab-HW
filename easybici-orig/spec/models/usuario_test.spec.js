const mongoose = require("mongoose");
const Bicicleta = require("../../models/bicicleta");
const Usuario = require("../../models/usuario");
const Reserva = require("../../models/reserva");
const { db } = require("../../models/reserva");

describe("testing usuarios", function () {
  beforeEach(function (done) {
    var mongoDB = "mongodb://localhost/red_bicicletas";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", function () {
      done();
    });
  });
  afterEach(function (done) {
    Reserva.deleteMany({}, function (err, success) {
      if (err) console.log(err);
      Usuario.deleteMany({}, function (err, success) {
        if (err) console.log(err);
        Bicicleta.deleteMany({}, function (err, success) {
          if (err) console.log(err);
          db.close();
          done();
        });
      });
    });
  });
});

describe("Un usuario reserva una bici", () => {
  it("debe existir la reserva", (done) => {
    let usuario = new Usuario({ nombre: "Luis" });
    usuario.save();
    let bicicleta = new Bicicleta({
      code: 1,
      color: "verde",
      modelo: "urbana",
    });
    bicicleta.save();
    let hoy = new Date();
    let mañana = new Date();
    mañana.setDate(hoy.getDate() + 1);
    usuario.reservar(bicicleta.id, hoy, mañana, function (err, reserva) {
      Reserva.find({})
        .populate("bicicleta")
        .populate("usuario")
        .exec(function (err, reservas) {
          console.log(reservas[0]);
          expect(reservas.length).toBe(1);
          expect(reservas[0].diasDeReserva()).toBe(2);
          expect(reservas[0].bicicleta.code).toBe(1);
          expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
          done();
        });
    });
  });
});
