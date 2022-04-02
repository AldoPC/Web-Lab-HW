const Bicicleta = require('../../models/bicicleta')
const request = require('request')

beforeEach( () => {
    Bicicleta.allBicis = []
})

describe('Bicicletas API', () => {
    describe('GET BICICLETAS /', () => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0)
            
            //let bici = new Bicicleta(1, 'rojo', 'bmx', [19.284770943610578, -99.13729060406136])
            //Bicicleta.add(bici)

            request.get('http://localhost:3000/api/bicicletas', (error, response, body) => {
                expect(response.statusCode).toBe(200)
            })
        })
    })
    describe('POST BICICLETA /create', () => {
        it('Status 200', (done) => {
            let headers = {'content-type' : 'application/json'}
            let aBici = '{"id" : 3, "color": "green", "modelo": "bmx", "lat": 19.28, "lon": -99.13}'
            
            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/create',
                body: aBici
            }, (error, response, body) => {
                expect(response.statusCode).toBe(200)
                let b = Bicicleta.findById(3)
                expect(b.color).toBe(aBici.color)
                done()
            })
        })
    })
})

