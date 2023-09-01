import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CrearUsuario} from 'src/app/models/crear-usuario-model'
import { AsientosService } from 'src/app/SERVICIOS/asientos.service';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  hide = true;
  hide2 = true;
  public crearUser : CrearUsuario ={
    NOMBRE:'',
    APELLIDO:'',
    CORREO:'',
    NUM_CELULAR:'',
    CONTRASENA:''
  };

  agregarform: UntypedFormGroup;

  constructor(private asientosServicio: AsientosService
    ,private router:Router
    ){
this.agregarform = this.createformgroup();
  }

  createformgroup(){
    return new UntypedFormGroup({
      NOMBRE: new UntypedFormControl('',[Validators.required, Validators.minLength(1)]),
      APELLIDO: new UntypedFormControl('',[Validators.required,Validators.minLength(1)]),
      CORREO: new UntypedFormControl('',[Validators.required,Validators.minLength(1)]),
      CONTRASENA: new UntypedFormControl('',[Validators.required,Validators.minLength(5)]),
      NUM_CELULAR: new UntypedFormControl('',[Validators.required,Validators.minLength(1)]),
      CONF: new UntypedFormControl('',[Validators.required,Validators.minLength(5)])
    });
  }
  ngOnInit(): void {

  }

  onSubmit() {
    if(this.agregarform.controls['CONTRASENA'].value != this.agregarform.controls['CONF'].value){
      alert("Las contraseñas no coinciden!");
    }else{
      this.asientosServicio.verfCuenta(this.agregarform.controls['CORREO'].value).subscribe(data => {
        if(data.length > 0){
          alert("Ya existe una cuenta creada con este correo");
        }else{
          this.crearUsuario();
        }
      }, err => {console.log(err)});

    }
    
  }
  
   crearUsuario(){
    this.crearUser.NOMBRE = this.agregarform.controls['NOMBRE'].value;
    this.crearUser.APELLIDO = this.agregarform.controls['APELLIDO'].value;
    this.crearUser.CORREO = this.agregarform.controls['CORREO'].value;
    this.crearUser.NUM_CELULAR = this.agregarform.controls['NUM_CELULAR'].value;
    this.crearUser.CONTRASENA = this.agregarform.controls['CONTRASENA'].value;
    this.asientosServicio.crearCuenta(this.crearUser).subscribe(data => {
      console.log(data);
      alert("Cuenta creada con exito, inicia sesion ahora");
      this.router.navigate(['/login']);
    });
   }

}
