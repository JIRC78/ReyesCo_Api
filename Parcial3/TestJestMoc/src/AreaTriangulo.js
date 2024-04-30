//funcion determinista
function calcularArea(base, altura) {
    return (base * altura) / 2;
}

//funcion no determinista
function numAleatorio(min, max){
return Math.random()*(max - min)+min;
}

module.exports.calcularArea = calcularArea;
module.exports.numAleatorio = numAleatorio;