const express = require('express');
const app = express()

app.get('/maestros', (req, res, next) => {
  if(tru){
    res.send("respondiendo maestros");
  }
  else{
    res.send("respondiendo false");
  }
  })
  

app.get('/alumnos', (req, res, next) => {
try {
throw new Error("ocurrio un error")
}
catch(e){
  next(e)
  }
})


app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})

app.use((err, req, res, next) => {
  res.status(500).send( err.message);
});