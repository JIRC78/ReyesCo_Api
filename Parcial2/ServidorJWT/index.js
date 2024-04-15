const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('./config');

const app = express();
app.use(express.json());

// Endpoint para la autenticación
app.post('/login', (req, res) => {
  // Verificar las credenciales del usuario (por ejemplo, en una base de datos)
  const { username, password } = req.body;
  if (username === 'jirc' && password === 'jirc.12345') {
    // Generar un token JWT
    const token = jwt.sign({ username }, config.jwtSecret, { expiresIn: config.jwtExpiration });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

// Middleware para verificar el token en las rutas protegidas
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

// Ruta protegida
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Ruta protegida', user: req.user });
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
