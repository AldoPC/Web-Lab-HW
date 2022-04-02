const Bicicleta = require("../models/bicicleta");

beforeEach(() => {
    Bicicleta.allBicis = [];
})

describe("Bicicleta.allBicis", () => {
  it("ccomienza vacia", () => {
    expect(Bicicleta.allBicis.length).toBe(0);
  });
});

describe("Bicicleta.add", () => {
    it("agrega una bici", () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        let bici = new Bicicleta(3, "rojo", "bmx", [19.284770943610578, -99.13729060406136]);
        Bicicleta.add(bici);
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(bici);
    })
})


describe("Bicicleta.find", () => {
    it("buscar una bici", () => {
        let bici = new Bicicleta(3, "rojo", "bmx", [19.284770943610578, -99.13729060406136]);
        Bicicleta.add(bici);
        let b = Bicicleta.findById(3);
        expect(b.color).toBe("rojo");
    })
})

describe("Bicicleta.removeId", () => {
    it("eliminar una bici", () => {
        let bici = new Bicicleta(3, "rojo", "bmx", [19.284770943610578, -99.13729060406136]);
        Bicicleta.add(bici);
        expect(Bicicleta.allBicis.length).toBe(1);
        Bicicleta.removeById(3);
        expect(Bicicleta.allBicis.length).toBe(0);
    })
})