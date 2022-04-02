const Bicicleta = require("../../models/bicicleta");
let mongoose = require("mongoose");

describe("Testing Bicicleta", () => {
  beforeEach(function (done) {
    var mongoDB = "mongodb://localhost/red_bicicletas";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", function () {
      done();
    });
  });
  afterEach(function (done) {
    Bicicleta.deleteMany({}, function (err, success) {
      if (err) console.log(err);
      const db = mongoose.connection;
      db.close();
      done();
    });
  });
  describe("Bicicleta.createInstance", () => {
    it("crea una instancia de la bicicleta", () => {
      let bici = Bicicleta.createInstance(1, "rojo", "urbana", [-34.5, -58.5]);
      expect(bici.code).toBe(1);
      expect(bici.color).toBe("rojo");
      expect(bici.modelo).toBe("urbana");
      expect(bici.ubicacion[0]).toEqual(-34.5);
      expect(bici.ubicacion[1]).toEqual(-58.5);
    });
  });
  describe("Find a bike by its code", () => {
    it("should return bike with code 1", (done) => {
      Bicicleta.allBicis(function (err, bicis) {
        expect(bicis.length).toBe(0);

        let bici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });
        Bicicleta.add(bici, function (err, newBike) {
          if (err) console.log(err);

          Bicicleta.findByCode(1, function (err, targetBici) {
            expect(targetBici.code).toBe(1);
            expect(targetBici.color).toBe("verde");
            expect(targetBici.modelo).toBe("urbana");
            done();
          });
        });
      });
    });
  });
  describe("Remove a bike by its code", () => {
    it("should delete bike with code 1"),
      (done) => {
        Bicicleta.allBicis(function (err, bicis) {
          expect(bicis.length).toBe(0);
          let bici = new Bicicleta({
            code: 1,
            color: "verde",
            modelo: "urbana",
          });
          Bicicleta.add(bici, function (err, newBike) {
            if (err) console.log(err);
            Bicicleta.allBicis(function (err, bicis) {
              expect(bicis.length).toBe(0);
              done();
            });
          });
        });
      };
  });
});
