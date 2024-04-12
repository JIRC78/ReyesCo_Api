const https = require('https');
const fs = require('fs');
const express = require('express');
 
const app = express();
 
const options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert')
};
 
app.get('/', (req, res) => {
    res.send('hola soy josue, aver si jala');
});
 
const server = https.createServer(options, app);
 
server.listen(443, () => {
    console.log('Servidor HTTPS corriendo en el puerto 443');
});