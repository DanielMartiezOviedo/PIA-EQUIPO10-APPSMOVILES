import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService, Message } from '../../services/data.service';

@Component({
  selector: 'app-nota-input',
  templateUrl: './nota-input.page.html',
  styleUrls: ['./nota-input.page.scss'],
})
export class NotaInputPage implements OnInit {
 //Declaracion del formulario
   datosForm: FormGroup;
 //Declaracion de los mensajes a mostrar en los input
  mensajesValidacion = {
    datos: [
      {type:'required', message: 'Por favor llene el dato completo.'},
      {type:'pattern', message: 'Por favor use carácteres válidos.'},
    ]
  };
  //Creacion del formulario, asi como para cada campo se señala su modelo y que son requeridos
  constructor(private formBuilder: FormBuilder, private data: DataService, private router: Router) {
    this.datosForm = this.formBuilder.group({
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
      ]))
    });
   }
   //Actualiza el los datos en la pagina, cargando los datos desde el storage
   ngOnInit() {
     this.data.cargarNotas();
  }
  //Recibe como parametro los datos recogidos en el formulario
  //y los envia como parametro un metodo que lo ingresa al arreglo
  //Tambien routea a la pagina notas
  ingresarDatos(datos){
    this.data.addMessageInput(datos);
    this.router.navigateByUrl('/notas');
  }
  //Obtiene el boton de regresar
  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
}
}
