const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cardEntryModel = require('./entry-schema.js');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://barbaraestevezmongodb:ClU$t3rP$$wordPrueb4@clusterprueba.0ibsnes.mongodb.net/bank?retryWrites=true&w=majority")
    .then(()=> {
        console.log('MongoDB');
    })
    .catch(()=> {
        console.log('No connected!');
    })
    
    let cuentasBancarias = [];

    //definimos cómo vamos a usar express 
    app.use(bodyParser.json());

    //establecemos los permisos que necesitamos
    app.use((req, res, next)=>{
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
        res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
        next();
    })

    //definimos los métodos HTTP
    app.post('/addcard', (req, res)=>{
        //recogemos toda la información que no está pasando el usuario
        const cardEntry = new cardEntryModel({
            titular: req.body.titular,
            numeroTarjeta: req.body.numeroTarjeta,
            fechaCaducidad: req.body.fechaCaducidad,
            cvv: req.body.cvv,
            fechaCreacion: new Date()
        }) 
        // guardamos la información que el usuario ha introducido en la const cardEntry
        cardEntry.save();
        cuentasBancarias.push(cardEntry);
        res.status(200).json({
            message:'Post Submitted'
        })
    });
    // obtenemos la imformación
    app.get('/cards',(req,res,next) => {
        cardEntryModel.find()
        .then((data)=>{
            cuentasBancarias = data;
            res.json({'cards':data});
        })
        .catch(()=>{
            console.log('Error fetching cards');
        })
    })

    app.use('/bank', (req,res,next)=>{
        cardEntryModel.find()
        .then((data)=>{
            cuentasBancarias = data;
            res.json({'cuentasBancarias': cuentasBancarias});
        })
    });

    module.exports = app;