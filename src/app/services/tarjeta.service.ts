import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TarjetaService {

    constructor(private _http:HttpClient) {}

create(tarjeta:any){
    this._http.post<{tarjetasCredito:any}>('http://localhost:3000/addcard',tarjeta).subscribe();
}

read():any{
    let cuentasBancarias:any [] = [];
    this._http.get<{cards:any[]}>('http://localhost:3000/cards').subscribe(
        (jsonData) => {
            jsonData.cards.forEach((ele)=>cuentasBancarias.push(ele));
            // cuentasBancarias = jsonData.cards;
        }
    )
    return cuentasBancarias;
}

}