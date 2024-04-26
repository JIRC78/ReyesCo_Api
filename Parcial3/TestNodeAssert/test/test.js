// test.js

import assert from 'node:assert';
import test from 'node:test';
import * as area from '../src/AreaTriangulo.js'

test('Calcular área de un triángulo con base 10 y altura 5', () => {
    let resultado = area.calcularArea(10, 5);
    assert.strictEqual(resultado, 25);
});

