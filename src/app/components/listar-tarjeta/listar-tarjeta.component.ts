import { Component, OnInit } from '@angular/core';
import { Tarjeta } from 'src/app/model/tarjeta';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {
  cuentasBancarias:Tarjeta[] = [];

  constructor(private _ts:TarjetaService){}

  ngOnInit():void {
    this.cuentasBancarias = this._ts.read();
  }

}
