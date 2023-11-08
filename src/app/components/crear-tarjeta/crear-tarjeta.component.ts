import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tarjeta } from 'src/app/model/tarjeta';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css'],
})
export class CrearTarjetaComponent implements OnInit {
  form: FormGroup;
  titulo:string = "Crear Tarjeta"; //por interpolación va a aparecer en el título de la tarjeta del listado
  id:string | undefined; //este id va a servir como medida de control
  private mensajeToast: string[] = ["", ""]; // Podría quedar así también -> private mensajeToast: string[] = [];

  constructor(private _fb: FormBuilder, private _ts: TarjetaService, private _toastr:ToastrService) {
    this.form = this._fb.group(
      //los formularios reactivos permiten, a través de Validators,
      {
        titular: ['', [Validators.required, Validators.maxLength(40)]],
        numeroTarjeta: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]{16}$/)],
        ], // Validators.minLength(16), Validators.maxLength(16),
        fechaCaducidad: [
          '',
          [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)],
        ], //Validators.minLength(5), Validators.maxLength(5)
        cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]], //Validators.minLength(3), Validators.maxLength(3),
      }
    );
  }

  ngOnInit(): void {
    this._ts.getTarjeta().subscribe((data)=>{ //data es el Subject que tenemos. se podría llamar como quisiéramos, incluso "pepino".
      this.titulo = "Editar Tarjeta";
      this.id = data._id;
      this.form.patchValue({//asignamos los valores al formulario
        titular:data.titular,
        numeroTarjeta:data.numeroTarjeta,
        fechaCaducidad:data.fechaCaducidad,
        cvv:data.cvv
      })
    });
  }

  guardarTarjeta() {
    if(this.id === undefined) {
      this.crearTarjeta();
      this.mensajeToast = ["Registro añadido con éxito", "Registro Añadido"];
    }
    else 
    {
      const TARJETA: Tarjeta = 
      {
        _id: this.id,
        titular: this.form.value.titular,
        numeroTarjeta: this.form.value.numeroTarjeta,
        fechaCaducidad: this.form.value.fechaCaducidad,
        cvv: this.form.value.cvv
      }
      this.editarTarjeta(TARJETA);
      this.mensajeToast = ["Registro editado con éxito", "Registro Editado"];
    }
    this._toastr.success(this.mensajeToast[0],this.mensajeToast[1]);
    //setTimeout(()=>{ window.location.reload()}, 2000);
  }

  crearTarjeta() {
      const TARJETA = new Tarjeta(
      this.form.value.titular,
      this.form.value.numeroTarjeta,
      this.form.value.cvv,
      this.form.value.fechaCreacion,
      this.form.value.fechaCaducidad
    );

    this._ts.create(TARJETA);
    this._toastr.success("Registro añadido con éxito en la BBDD", "Operación exitosa");
    // setInterval(()=>{
    //   window.location.reload()
    // }, 2000);
  }

  editarTarjeta(tarjeta:Tarjeta){
    this._ts.update(tarjeta).subscribe();
  }
}

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyEm_hxYNZ9l5Ovvvp4K1O9gx8s-BKKBc",
  authDomain: "tarjetacredito-84dd8.firebaseapp.com",
  projectId: "tarjetacredito-84dd8",
  storageBucket: "tarjetacredito-84dd8.appspot.com",
  messagingSenderId: "112486162447",
  appId: "1:112486162447:web:6a0c21505219d982c8037a",
  measurementId: "G-SB4277JKXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/
