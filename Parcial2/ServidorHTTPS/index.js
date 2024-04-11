const https = require("https");
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const options = {
    key: fs.readFileSync(path.join(__dirname, 'certificado/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certificado/cert.pem')),
};


app.get('/',()=>{
    res.json({mensaje:"servidor express contestastando"})
})

https.createServer(options.app).listen(8080, ()=>{
    console.log("servidor escuchando en 8080");
})
