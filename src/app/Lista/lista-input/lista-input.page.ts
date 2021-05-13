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

  dataForm: FormGroup;
  mensajesValidacion = {
    datos: [
      {type:'required', message: 'Por favor llene el dato completo.'},
      {type:'pattern', message: 'Por favor use carácteres válidos.'},
    ]
  };
  constructor(private formBuilder: FormBuilder, private data: DataService, private router: Router) {
    this.dataForm = this.formBuilder.group({
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

   ngOnInit() {
  }

  ingresarDatos(datos){
    this.data.addListInput(datos);
    this.router.navigateByUrl('/inicio');
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';

}
}
