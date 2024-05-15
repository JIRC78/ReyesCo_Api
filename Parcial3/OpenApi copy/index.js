const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { SwaggerTheme, SwaggerThemeNameEnum } = require('swagger-themes');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'baselibro2'
});

app.use(express.json());
const theme = new SwaggerTheme();
const darkStyle = theme.getBuffer(SwaggerThemeNameEnum.DARK);

const options = {
  explorer: true,
  customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK)
};



/**
 *
@swagger
 * /libro:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
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


/**
 *
@swagger
 * /libro:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
//INSERTAR
app.post('/libro', async (req, res) => {
  try {
    const { Nombre, Genero, SubGenero, Autor, Idioma, Editorial, Año } = req.body;
    
    connection.query(
      'INSERT INTO libro (Nombre, Genero, SubGenero, Autor, Idioma, Editorial, Año) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [Nombre, Genero, SubGenero, Autor, Idioma, Editorial, Año]
    );
    
    res.status(201).json({ message: 'Libro insertado' });
  } catch (error) {
    console.error('Error al insertar:', error);
    res.status(404).json({ error: 'Error al insertar el libro' });
  } finally {
    connection.end();
  }
});


/**
 *
@swagger
 * /libro:
 *   delete:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
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

/**
 *
@swagger
 * /libro:
 *   put:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
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

const swaggerOptions = {
  definition: {
  openapi: '3.0.0',
  info: {
  title: 'API Empleados',
  version: '1.0.0',
  },
  servers:[
  {url: "http://localhost:8083"}
  ], 
  },
  apis: [`${path.join(__dirname,"./index.js")}`],
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUI.serve,swaggerUI.setup(swaggerDocs));
  app.get("/api-docs-json", () =>{
    res.json(swaggerDocs);
  });



app.listen(3000, () => {
  console.log('listening on port 3000!');
})
module.exports = app;