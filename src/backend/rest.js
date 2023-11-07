const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cardEntryModel = require("./entry-schema.js");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://barbaraestevezmongodb:ClU$t3rP$$wordPrueb4@clusterprueba.0ibsnes.mongodb.net/bank?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB");
  })
  .catch(() => {
    console.log("No connected!");
  });

let cuentasBancarias = [];

//definimos cómo vamos a usar express
app.use(bodyParser.json());

//establecemos los permisos que necesitamos
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

//definimos los métodos HTTP
app.post("/addcard", (req, res) => {
  //recogemos toda la información que no está pasando el usuario
  try {
    const cardEntry = new cardEntryModel({
      titular: req.body.titular,
      numeroTarjeta: req.body.numeroTarjeta,
      fechaCaducidad: req.body.fechaCaducidad,
      cvv: req.body.cvv,
      fechaCreacion: new Date(),
    });
    // guardamos la información que el usuario ha introducido en la const cardEntry
    cardEntry.save();
    cuentasBancarias.push(cardEntry);
    res.status(200).json({
      message: "Post Submitted",
    });
  } catch (error) {
    res.send("Error:\n" + error);
  }
});

//DELETE
app.delete("/removecard/:id", (req, res) => {
  cardEntryModel
    .deleteOne({ _id: req.params.id })
    //este mensaje es para verlo en postman porque en la interfaz de la web el usuario no lo ve
    .then(() => {
      res.status(200).json({
        message: "Post Delete",
      });
    })
    .catch((error) => {
      res.status(403).send("Error:\n" + error);
    });
});

app.put("update-entry/:card", (req, res) => {
  const updateEntry = new cardEntryModel({
    _id: req.body._id,
    titular: req.body.titular,
    numeroTarjeta: req.body.numeroTarjeta,
    fechaCaducidad: req.body.fechaCaducidad,
    cvv: req.body.cvv,
    fechaCreacion: new Date(),
  });
  cardEntryModel.updateOne({ _id: req._id }, updateEntry).then(() => {
    res
      .status(200)
      .json({
        message: "Update Completed",
      })
      .catch((error) => {
        res.status(403).send("Error:\n" + error);
      });
  });
});

// obtenemos la imformación
app.get("/cards", (req, res, next) => {
  cardEntryModel
    .find()
    .then((data) => {
      cuentasBancarias = data;
      res.json({ cards: data });
    })
    .catch((error) => {
      console.log("Error fetching cards");
      res.send("Error:\n" + error);
    });
});

app.use("/bank", (req, res, next) => {
  cardEntryModel.find().then((data) => {
    cuentasBancarias = data;
    res.json({ cuentasBancarias: cuentasBancarias });
  });
});

module.exports = app;
