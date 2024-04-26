// import assert from 'node:assert';
// let assert

import * as areas from 'chai'
import test from 'node:test';
import * as areas from '../src/modulo.js';

test('un triangulo de base y altura 4, el area debe ser 4',() => {
    let resultado=areas.areaTriangulo(2,4);
    chai.assert.equal(resultado,4);
})
