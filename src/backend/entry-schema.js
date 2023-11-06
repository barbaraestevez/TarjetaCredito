const mongoose = require ('mongoose');

const entrySchema = mongoose.Schema({
    titular:String,
    numeroTarjeta:String,
    fechaCaducidad:String,
    cvv:Number,
    fechaCreacion:Date
})

//para que esté accesible hay que tener un servicio model
module.exports = mongoose.model('cuentaBancaria',entrySchema);