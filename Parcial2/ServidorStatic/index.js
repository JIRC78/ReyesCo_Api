const express = require('express');
const app = express()
const path = require("path")
const basicAuth = require('express-basic-auth')

app.use(basicAuth({
  users: {
      'josue': '026687'
  }
}))
app.get('/', (req, res) => {
  res.send('el servidor responde')
})

app.use('/public', express.static(path.join(__dirname,"/public"))) 
 
app.listen(3000, () => {
  console.log('Example app listening on port 3000');
});