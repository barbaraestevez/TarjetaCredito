export class Tarjeta {
    // id?:string;
    titular:string;
    numeroTarjeta:string;
    cvv:number;
    fechaCaducidad:string;
    fechaCreacion?:Date;

    constructor(titular:string,numeroTarjeta:string,cvv:number,fechaCreacion:string, fechaCaducidad:string){ //id:string
        // this.id = id;
        this.titular = titular;
        this.numeroTarjeta = numeroTarjeta;
        this.cvv = cvv;
        this.fechaCreacion = new Date();
        this.fechaCaducidad = fechaCaducidad;
    }
}