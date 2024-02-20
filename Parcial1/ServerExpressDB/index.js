const express = require('express');
const app = express();
const mysql = require('mysql2');



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'baselibro'
});

app.get('/libro', async (req, res) =>{
 if(typeof req.query.idLibro == 'undefined'){
  connection.query('SELECT * FROM baselibro.libro', (err, rows) => {
    if(err)throw err;
    res.json(rows);
  });
 } else {
  connection.query(`SELECT * FROM baselibro.libro WHERE idLibro = ${req.query.idLibro}`,(err, rows) =>{
    if(err)throw err;
    res.json(rows);
  });
 }
 
});
  


app.listen(3000, () => {
console.log('listening on port 3000!');
});