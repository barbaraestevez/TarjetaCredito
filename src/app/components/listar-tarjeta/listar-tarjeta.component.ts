import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Tarjeta } from 'src/app/model/tarjeta';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {
  cuentasBancarias:Tarjeta[] = [];

  constructor(private _ts:TarjetaService, private _toastr:ToastrService){}

  ngOnInit():void {
    this.cuentasBancarias = this._ts.read();
  }

  //vamos a implementar update y delete para poder borrar en el front
  //comunicamos listar tarjeta con crear tarjeta para que aparezcan los datos y los podamos editar. Entra en juego el método Subject.
  editarTarjeta(tarjeta:Tarjeta){
    this._ts.setTarjeta(tarjeta);
  }

  /*if(confirm)
  <button onclick="confirmDelete()">Try it</button>

  function confirmDelete() {
  let text = "Press a button!\nEither OK or Cancel.";
  if (confirm(text) == true) {
    text = "You pressed OK!";
  } else {
    text = "You canceled!";
  }
  document.getElementById("demo").innerHTML = text;
}
  */


  // para eliminar una tarjeta
  eliminarTarjeta(id:any){
    this._ts.delete(id).subscribe(()=>{
      this._toastr.error('La tarjeta de ha eliminado con éxito.', 'Registro eliminado');
      //llamamos al ngOnInit para refrescar la ventana tras el delete
      this.ngOnInit();
    });
  }

}
