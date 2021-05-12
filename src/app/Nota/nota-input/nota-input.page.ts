import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-nota-input',
  templateUrl: './nota-input.page.html',
  styleUrls: ['./nota-input.page.scss'],
})
export class NotaInputPage implements OnInit {
  message: Message;
  datosForm: FormGroup;
  mensajesValidacion = {
    datos: [
      {type:'required', message: 'Por favor llene el dato completo.'},
      {type:'pattern', message: 'Por favor use carácteres válidos.'},
    ]
  };
  constructor(private formBuilder: FormBuilder, private data: DataService, private router: Router) {
    this.datosForm = this.formBuilder.group({
      titulo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$')
      ])),
      descripcion: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$')

      ])),
      id: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]))
    });
   }

   ngOnInit() {
  }

  ingresarDatos(datos){
    this.data.addMessageInput(datos);
    this.router.navigateByUrl('/notas');
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';

}
}
