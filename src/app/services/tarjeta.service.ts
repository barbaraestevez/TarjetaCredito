import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarjeta } from '../model/tarjeta';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TarjetaService {
  //creamos un subject de tipo tarjeta. encapsula la información para después obtenerla o leerla dónde y cómo queramos
  private tarjeta$ = new Subject<Tarjeta>();

  constructor(private _http: HttpClient) {}

  //CRUD
  create(tarjeta: Tarjeta) {
    this._http
      .post<{ tarjetasCredito: Tarjeta }>(
        'http://localhost:3000/addcard',
        tarjeta
      )
      .subscribe();
  }

  read(): Tarjeta[] {
    let cuentasBancarias: Tarjeta[] = [];
    this._http
      .get<{ cards: Tarjeta[] }>('http://localhost:3000/cards')
      .subscribe((jsonData) => {
        jsonData.cards.forEach((ele) => cuentasBancarias.push(ele));
        // cuentasBancarias = jsonData.cards;
      });
    return cuentasBancarias;
  }

  update(tarjeta: Tarjeta): Observable<any> {
    return this._http.put(
      'http://localhost:3000/update-entry/' + tarjeta,
      tarjeta
    );
  }

  delete(id: string): Observable<any> {
    return this._http.delete('http://localhost:3000/removecard/' + id);
  }
  setTarjeta(tarjeta: Tarjeta) {
    this.tarjeta$.next(tarjeta);
  }
  getTarjeta(): Observable<Tarjeta> {
    return this.tarjeta$.asObservable();
  }
}