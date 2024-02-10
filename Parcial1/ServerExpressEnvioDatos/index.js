const express = require('express');
const morgan = require('morgan');
const app = express();


 
app.use(morgan('tiny'))
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:false}));




app.get('/alumnos', (req, res, next) => {
    console.log(req.query);
res.send('constestame a get desde server express');
});

app.get('/maestros/:carrera', (req, res, next) => {
    console.log(req.params.carrera);
    res.send('Contestame a post desde server express');
    });

    app.get('/administrativos', (req, res, next) => {
       // console.log(req.body.id);
    // console.log(req.body.nombre);
        for (const campo in req.body) {
        console.log(req.body[campo])
        }
        res.send('Contestame a post1 desde server express');
        }); 

        app.get('/prefectos', (req, res, next) => {
           console.log(req.body);
             res.send('constestame soy un prefecto');
             }); 

app.listen(3000, () => {
console.log('Example app listening on port 3000!');
});