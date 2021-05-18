/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/quotes */
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService, Message } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nota-editar',
  templateUrl: './nota-editar.page.html',
  styleUrls: ['./nota-editar.page.scss'],
})
export class NotaEditarPage implements OnInit {
  //Declaracion de la variable que usaremos para manejar la nota que se selecciono a editar
  message: Message;
  //declaracion del formulario
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
//Al entrar a la pagina recibe el mensaje (nota) a editar, al mismo tiempo
//que actualiza las notas cargandolas desde el storage
  ngOnInit() {
    this.getMessage();
    this.data.cargarNotas();
    console.log(this.message);
  }
 //Recibe como parametro los datos recogidos en el formulario
  //y los envia como parametro un metodo que lo ingresa al arreglo
  //en la posicion de una variable que contiene la posicion en el arreglo de la nota a editar
  //Tambien routea a la pagina notas
  ingresarDatos(datos){
    this.data.editarMessageInput(datos,this.data.aEditar);
    this.router.navigateByUrl("/notas");
  }
//Asigna a la variable message el valor de la nota a editar
  getMessage(){
  this.message=this.data.messages[this.data.aEditar];
  }


}
