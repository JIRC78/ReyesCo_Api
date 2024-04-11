const fs = require('fs');
const yaml = require('yaml');
const path = require('path');
const datosPath = path.join(__dirname, 'datos.yaml');
const datosYaml = fs.readFileSync(datosPath, 'utf8');
const datosObjeto = yaml.parse(datosYaml);
console.log('Datos:', datosObjeto);

const arregloPath = path.join(__dirname, 'arreglo.yaml');
const arregloYaml = fs.readFileSync(arregloPath, 'utf8');
const arregloObjeto = yaml.parse(arregloYaml);
console.log('Arreglo:', arregloObjeto);