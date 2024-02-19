const express = require('express');
const morgan = require('morgan');
const app = express();
const mysql = require('mysql2');

 
app.use(morgan('tiny'))
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:false}));



// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'baselibro',
});

// execute will internally call prepare and query
connection.execute(
  'SELECT * FROM `libro` WHERE `Nombre` = ? AND `Genero` > ?',
  ['Rick C-137', 53],
  function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);


app.get('/Nombre', (req, res, next) => {
    console.log(req.query);
res.send('constestame a get desde server express');
});


app.listen(3000, () => {
console.log('Example app listening on port 3000!');
});