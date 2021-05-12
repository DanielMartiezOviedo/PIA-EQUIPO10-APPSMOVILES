/* eslint-disable @typescript-eslint/quotes */
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService, Message } from '../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nota-editar',
  templateUrl: './nota-editar.page.html',
  styleUrls: ['./nota-editar.page.scss'],
})
export class NotaEditarPage implements OnInit {
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
    this.getMessage();
    console.log(this.message);
  }

  ingresarDatos(datos){
    this.data.editarMessageInput(datos,this.data.aEditar);
    this.router.navigateByUrl("/notas");
  }

  getMessage(){
  this.message=this.data.messages[this.data.aEditar];
  }


}
