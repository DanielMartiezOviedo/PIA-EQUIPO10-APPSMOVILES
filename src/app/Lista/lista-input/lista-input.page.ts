import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService, List } from '../../services/data.service';
@Component({
  selector: 'app-lista-input',
  templateUrl: './lista-input.page.html',
  styleUrls: ['./lista-input.page.scss'],
})
export class ListaInputPage implements OnInit {
  //Declaracion del formulario
  dataForm: FormGroup;
    //Declaracion de los mensajes a mostrar en el control de los input
  mensajesValidacion = {
    datos: [
      {type:'required', message: 'Por favor llene el dato completo.'},
      {type:'pattern', message: 'Por favor use carácteres válidos.'},
    ]
  };
  //Creacion del formulario, asi como para cada campo se señala su modelo y que son requeridos
  constructor(private formBuilder: FormBuilder, private data: DataService, private router: Router) {
    this.dataForm = this.formBuilder.group({
      titulo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('')
      ]))
    });
   }

   ngOnInit() {
  }
    //Recibe como parametro los datos recogidos en el formulario
  //y los envia como parametro un metodo que lo ingresa al arreglo
  //Tambien routea a la pagina inicio (donde aparece la lista de cosas pendientes)
  ingresarDatos(datos){
    this.data.addListInput(datos);
    this.router.navigateByUrl('/inicio');
  }
  //Obtiene el boton de regresar
  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';

}
}
