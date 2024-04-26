const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const app = require('./index'); // Asegúrate de que la ruta sea correcta

describe('Pruebas del servidor', () => {
    it('Debe devolver un libro por su ID', function (done) {
        chai.request(app)
            .get('/libro?idLibro=1') // Cambia esto por el ID del libro que esperas recibir
            .end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').that.has.lengthOf(1); // Verifica que el cuerpo de la respuesta sea un array con una longitud de 1
                const libro = res.body[0]; // Obtiene el primer objeto del array
                expect(libro).to.have.property('idLibro', 1); // Verifica que el ID del libro sea el esperado
                done();
            });
    });

    it('Debe insertar un nuevo libro', function (done) {
        const nuevoLibro = {
            Nombre: 'Nuevo Libro',
            Genero: 'Género',
            SubGenero: 'Subgénero',
            Autor: 'Autor',
            Idioma: 'Idioma',
            Editorial: 'Editorial',
            Año: 2024 // Cambia esto por el año del nuevo libro
        };

        chai.request(app)
            .post('/libro')
            .send(nuevoLibro)
            .end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message', 'Libro insertado');
                done();
            });
    });

    // Agrega más pruebas según sea necesario para las otras funcionalidades del servidor
});
