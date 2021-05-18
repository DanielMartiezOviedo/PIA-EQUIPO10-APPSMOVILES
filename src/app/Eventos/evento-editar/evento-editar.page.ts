/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService, Eventos } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evento-editar',
  templateUrl: './evento-editar.page.html',
  styleUrls: ['./evento-editar.page.scss'],
})
export class EventoEditarPage implements OnInit {
 //Variable donde se guardara el valor de la fecha seleccionada
  fecha : string;
 //Declaracion de la variable que usaremos para manejar el evento que se selecciono a editar
  eventos: Eventos;
  //Declaracion del formulario
  datosEForm: FormGroup;
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
  //Al entrar a la pagina recibe el evento a editar, al mismo tiempo
//que actualiza las notas cargandolas desde el storage
  ngOnInit() {
    this.getEvento();
    this.data.cargarEventos();
  }
  //Asigna a la variable evento el valor de la nota a editar
getEvento(){
  this.eventos=this.data.eventos[this.data.aEditar];
}
 //Recibe como parametro los datos recogidos en el formulario
  //y los envia como parametro un metodo que lo ingresa al arreglo
  //en la posicion de una variable que contiene la posicion en el arreglo del evento a editar
  //Tambien routea a la pagina home (calendario)
  ingresarDatos(datos){
    this.data.editarEventoInput(datos, this.data.aEditar);
    this.router.navigateByUrl('/home');
  }
  //Obtiene el boton de regresar
  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';

}
}
