const express = require('express');
const path = require("path");
const app = express();


app.set('view engine','pug')
app.set('views', path.join(__dirname,'views'));

app.get('/', (req, res, next) => {
  //res.send('el servidor responde')
  res.render('index.pug',{nombre:"Josue",apellidoP:"Reyes", apellidoM:"Coronado"})
})
 
 
app.listen(3000, () => {
  console.log('Example app listening on port 3000');
});