import { Component,OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AsientosService }  from 'src/app/SERVICIOS/asientos.service';
import {eventos} from 'src/app/models/eventos-model';


@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  public eventosDetalle:eventos = {
    ID_EVENTOS:0,
    TITULO:'',
    DESCRIPCION:'',
    FECHA_HORA: new Date(),
    STATUS:'',
    TIPO_EVENTO:'',
    FOTO:''
  }
  constructor(private router:Router
    ,private activeRoute:ActivatedRoute,private asientosServicio:AsientosService) { }
  ngOnInit(): void {
    const idEvento = <string>this.activeRoute.snapshot.params['id'];
    
    this.asientosServicio.obtenerEventoId(idEvento).subscribe(data =>{
      this.eventosDetalle = data[0];
      console.log(this.eventosDetalle);
    });
  }

  comprarBoletos(){
    const idEvento = <string>this.activeRoute.snapshot.params['id'];
    this.router.navigate(['/asientos/' + idEvento]);
  }

}
