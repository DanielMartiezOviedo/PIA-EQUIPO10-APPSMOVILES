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
  fecha : string;
  eventos: Eventos;
  datosEForm: FormGroup;
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
   fechaSelect(e){
    this.fecha= e.detail.value;
  }
  ngOnInit() {
  }
  ingresarDatos(datos){
    this.data.addEventoInput(datos);
    this.router.navigateByUrl('/home');
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';

}
}
