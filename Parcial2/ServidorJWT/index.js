const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('./config');

const app = express();
app.use(express.json());


app.post('/login', (req, res) => {

  const { username, password } = req.body;
  if (username === 'jirc' && password === 'jirc.12345') {
    const token = jwt.sign({ username }, config.jwtSecret, { expiresIn: config.jwtExpiration });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});


function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token.split(' ')[1], config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = decoded;
    next();
  });
}

app.get('/protegido', verifyToken, (req, res) => {
  res.json({ message: 'ruta protegida.', user: req.user });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
