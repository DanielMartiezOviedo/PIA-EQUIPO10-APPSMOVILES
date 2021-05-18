import { DataService, Eventos } from './../../services/data.service';
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-evento-input',
  templateUrl: './evento-input.page.html',
  styleUrls: ['./evento-input.page.scss'],
})
export class EventoInputPage implements OnInit {
  //Variable donde se guardara el valor de la fecha seleccionada
  fecha : string;
  //Declaracion del formulario
  datosEForm: FormGroup;
  //Declaracion de los mensajes a mostrar en los input
  mensajesValidacion = {
    datos: [
      {type:'required', message: 'Por favor llene el dato completo.'},
      {type:'pattern', message: 'Por favor use carácteres válidos.'},
    ]
  };
    //Creacion del formulario, asi como para cada campo se señala su modelo y que son requeridos
  constructor(private formBuilder: FormBuilder, private data: DataService, private router: Router) {
    this.datosEForm = this.formBuilder.group({
      titulo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('')
      ])),
      descripcion: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('')

      ])),
      id: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ])),
      date: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('')
      ])),
    });
   }

   //Metodo para cambiar el parametro (tipo fecha) a texto
fechaSelect(e){
    this.fecha= e.detail.value;
  }
     //Actualiza el los datos en la pagina, cargando los datos desde el storage
  ngOnInit() {
    this.data.cargarEventos();
  }
    //Recibe como parametro los datos recogidos en el formulario
  //y los envia como parametro un metodo que lo ingresa al arreglo
  //Tambien routea a la pagina home (calendario)
  ingresarDatos(datos){
    this.data.addEventoInput(datos);
    this.router.navigateByUrl('/home');
  }
  //Obtiene el boton de regresar
  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
}
}
