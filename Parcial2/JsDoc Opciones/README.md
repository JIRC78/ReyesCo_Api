Para utilizar este módulo, primero asegúrate de tener Node.js instalado en tu sistema. Luego, puedes instalar el módulo usando npm:
npm i modulousers-josueirc

Aquí hay ejemplos de cómo puedes utilizar las funciones proporcionadas por este módulo:

Saludar a una persona

const { greet } = require('./src');
console.log(greet('Juan')); // Output: "hola Juan"

Obtener datos de usuarios

const { users } = require('./src');
users().then(data => {
  console.log(data); // Output: [ { id: 1, name: 'John', ... }, { id: 2, name: 'Jane', ... } ]
});
