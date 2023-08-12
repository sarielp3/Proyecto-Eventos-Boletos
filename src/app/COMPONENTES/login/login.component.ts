import { Component,OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AsientosService} from 'src/app/SERVICIOS/asientos.service'
import {usuario} from 'src/app/models/usuario-model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private asientosServicio:AsientosService, private router:Router
    ,private activeRoute:ActivatedRoute) { 
      
    }

  public login: usuario = {
    ID_USUARIO:0,
    CORREO:'',
    NUM_CELULAR:'',
    CONTRASENA:''
  }
  ngOnInit(): void {
    
  }

  validar(){
    this.asientosServicio.login(this.login.CORREO,this.login.CONTRASENA).subscribe(data =>{
        if(data.length > 0){
          //console.log(data);
          var idUsuario = data[0].ID_USUARIO;
          localStorage.setItem('idUsuario', idUsuario);
          this.asientosServicio.setlogin(this.login.CORREO);
          this.router.navigate(['/inicio']);
        }else{
          alert("Datos Incorrectos o no existen !");
          //console.log(data);
        }
    });
    console.log(this.login.CORREO);
    console.log(this.login.CONTRASENA);
  }
}
