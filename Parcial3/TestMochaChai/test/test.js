import { expect } from 'chai'; // Importar la función expect de Chai
import * as area from '../src/AreaTriangulo.js';

describe('Calcular área de un triángulo', () => {
    it('debería calcular correctamente el área', () => {
        const resultado = area.calcularArea(10, 5);
        expect(resultado).to.equal(25); // Utilizar expect en lugar de assert.strictEqual
    });
});


