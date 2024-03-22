const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'baselibro2'
});

app.use(express.json());


const validateRequest = [
  body('Nombre').notEmpty().withMessage('El nombre es requerido'),
  body('Genero').notEmpty().withMessage('El género es requerido'),
  body('SubGenero').notEmpty().withMessage('El subgénero es requerido'),
  body('Autor').notEmpty().withMessage('El autor es requerido'),
  body('Idioma').notEmpty().withMessage('El idioma es requerido'),
  body('Editorial').notEmpty().withMessage('La editorial es requerida'),
  body('Año').isNumeric().withMessage('El año debe ser numérico'),
  
  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      next();
  }
];

//CONSULTA
app.get('/libro', async (req, res) =>{
  try {
   if (typeof req.query.idLibro == 'undefined') {
     connection.query('SELECT * FROM libro', (err, rows) => {
       if (err) throw err;
       res.json(rows);
     });
   } else {
     connection.query(`SELECT * FROM libro WHERE idLibro = ${req.query.idLibro}`, (err, rows) => {
       if (err) throw err;
       if (rows.length === 0) {
         res.status(404).json({ error: 'Libro no encontrado' });
       } else {
         res.json(rows);
       }
     });
   }
  } catch (error) {
    res.status(500).json({ error: 'Error en la consulta a la base de datos' });
  }
 });


//INSERTAR
app.post('/libro', validateRequest, async (req, res) => {
  try {
      const { Nombre, Genero, SubGenero, Autor, Idioma, Editorial, Año } = req.body;
      
      connection.query(
          'INSERT INTO libro (Nombre, Genero, SubGenero, Autor, Idioma, Editorial, Año) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [Nombre, Genero, SubGenero, Autor, Idioma, Editorial, Año],
          (err, result) => {
              if (err) {
                  console.error('Error al insertar:', error);
                  res.status(404).json({ error: 'Error al insertar el libro' });
              } else {
                  res.status(201).json({ message: 'Libro insertado' });
              }
          }
      );
  } catch (error) {
      console.error('Error al insertar:', error);
      res.status(404).json({ error: 'Error al insertar el libro' });
  } finally {
      connection.end();
  }
});

//ELIMINAR
app.delete('/libro/:idLibro', async (req, res) => {
  try {
    const idLibro = req.params.idLibro;
    
    connection.query(
      'DELETE FROM libro WHERE idLibro = ?',
      [idLibro],
      (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Ya esta eliminado' });
        } else {
          res.json({ message: 'Libro eliminado' });
        }
      }
    );
  } catch (error) {
    console.error('Error al eliminar:', error);
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
});

//ACTUALIZAR
app.put('/libro/:idLibro', async (req, res) => {
  try {
    const idLibro = req.params.idLibro;
    const { Nombre, Genero, SubGenero, Autor, Idioma, Editorial, Año } = req.body;
    
    connection.query(
      'UPDATE libro SET Nombre = ?, Genero = ?, SubGenero = ?, Autor = ?, Idioma = ?, Editorial = ?, Año = ? WHERE idLibro = ?',
      [Nombre, Genero, SubGenero, Autor, Idioma, Editorial, Año, idLibro],
      (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'no se pudo actualizar' });
        } else {
          res.json({ message: 'Libro actualizado' });
        }
      }
    );
  } catch (error) {
    console.error('Error al actualizar el libro:', error);
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
});



app.listen(3000, () => {
  console.log('listening on port 3000!');
});