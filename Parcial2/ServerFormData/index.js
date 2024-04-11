const express = require('express');
const multer = require('multer');

const app = express();

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.any(), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No se ha proporcionado ningún archivo');
  }
  
  res.send('Archivo subido exitosamente');
});

app.listen(3000, () => {
  console.log(`listening on port 3000!`);
});
