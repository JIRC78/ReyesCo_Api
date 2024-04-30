// test.js

//import assert from 'node:assert';
//import test from 'node:test';
//import * as area from '../src/AreaTriangulo.js'
const area = require('../src/AreaTriangulo.js')

//jest.spyOon(area, 'numAleatorio')

area.numAleatorio=jest.fn( ()=> 5 )

test('Calcular área de un triángulo con base 10 y altura 5', () => {
    let resultado = area.calcularArea(10, 5);
    expect(resultado).toBe(25)

    let ale = area.numAleatorio(1, 20);
    expect(ale).toBe(5)
    
});

