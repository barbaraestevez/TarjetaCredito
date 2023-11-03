import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarjeta } from 'src/app/model/tarjeta';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent {
  form:FormGroup;
  
  constructor(private _fb:FormBuilder){
    this.form = this._fb.group(   //los formularios reactivos permiten, a través de Validators, 
    {
      titular:['', [Validators.required, Validators.maxLength(40)]],
      numeroTarjeta:['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)] ], // Validators.pattern(/^[0-9]{16}$/)
      fechaCaducidad:['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]], //Validators.minLength(5), Validators.maxLength(5)
      cvv:['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]], //Validators.pattern(/^\d{3}$/)
    }
    ) 
  }
  crearTarjeta(){
    // const TARJETA:Tarjeta = {
    //   titular:this.form.value.titular,
    //   numeroTarjeta:this.form.value.numeroTarjeta,
    //   fechaCaducidad:this.form.value.fechaCaducidad,
    //   cvv:this.form.value.cvv,
    //   fechaCreacion: new Date()
    // }

    const TARJETA = new Tarjeta (
      this.form.value.titular,
      this.form.value.numeroTarjeta,
      this.form.value.cvv,
      this.form.value.fechaCreacion,
      this.form.value.fechaCaducidad,
    )
    console.log(this.form);
  }
}
