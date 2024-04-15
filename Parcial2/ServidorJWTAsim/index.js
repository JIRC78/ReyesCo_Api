const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const privateKey = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, 'public.key'), 'utf8');

function generarToken(payload) {
  return jwt.sign(payload, privateKey, { algorithm: 'RS256' });
}

function verificarToken(token) {
  try {
    return jwt.verify(token, publicKey);
  } catch (error) {
    return null; 
  }
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'jirc' && password === 'jirc.12345') {
    const token = generarToken({ username });
    res.json({ token });
  } else {
    res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }
});

app.get('/protegido', (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  const payload = verificarToken(token.replace('Bearer ', ''));
  if (!payload) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }

  res.json({ mensaje: 'hola, como estas?...', usuario: payload.username });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
