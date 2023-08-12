import { Component, OnInit } from '@angular/core';
import {eventos} from 'src/app/models/eventos-model';
import {AsientosService} from 'src/app/SERVICIOS/asientos.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public eventosList: eventos[] = [];
  constructor(private asientosServicio:AsientosService,private router:Router) {

  }

  ngOnInit(): void {
   this.asientosServicio.obtenerEventos().subscribe(data => 
    {
      this.eventosList = <any>data;
      console.log(this.eventosList);
    },err => {console.log(err)}
    );
  }

  salir(){
    this.asientosServicio.getOutLogin();
    this.router.navigate(['/login']);
  }

}
