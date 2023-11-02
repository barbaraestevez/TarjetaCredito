export class Tarjeta {
    id?:string;
    titular:string;
    numeroTarjeta:string;
    cvv:number;
    fechaCreacion?:string;
    fechaCaducidad:Date;

    constructor(id:string,titular:string,numeroTarjeta:string,cvv:number,fechaCreacion:string){
        this.id = id;
        this.titular = titular;
        this.numeroTarjeta = numeroTarjeta;
        this.cvv = cvv;
        this.fechaCreacion = fechaCreacion;
        this.fechaCaducidad = new Date();
    }
}