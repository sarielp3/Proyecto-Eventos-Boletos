import { Component, OnInit } from '@angular/core';
import { JavascriptAsientosService } from 'src/app/SERVICIOS/javascript-asientos.service';
import { AsientosService } from 'src/app/SERVICIOS/asientos.service';
import {sillas} from 'src/app/models/sillas'
import { ActivatedRoute, Router } from '@angular/router';
import {eventos} from 'src/app/models/eventos-model';

@Component({
  selector: 'app-asientos',
  templateUrl: './asientos.component.html',
  styleUrls: ['./asientos.component.css']
})
export class AsientosComponent implements OnInit {
  public LSillas: sillas[] = [];
  
  public eventosDetalle:eventos = {
    ID_EVENTOS:0,
    TITULO:'',
    DESCRIPCION:'',
    FECHA_HORA: new Date(),
    STATUS:'',
    TIPO_EVENTO:'',
    FOTO:''
  }
  public disponibilidad: string[] = [];
  constructor(private javascriptService: JavascriptAsientosService,private asientosService: AsientosService
    ,private activeRoute:ActivatedRoute,private router:Router
    ) {
    
  }

  ngOnInit(): void {
    //const asientosSeleccionados = JSON.parse(localStorage.getItem('asientosSeleccionados') || '');
    //console.log(this.asientosSeleccionados);
  const idEvento = <string>this.activeRoute.snapshot.params['id'];
    this.asientosService.obtenerHacientos(idEvento).subscribe(
      (data) => {
        this.LSillas = data;
        var newArr = this.LSillas.map(function(val, index){
          if(val.STATUS == 'D'){
            val.STATUS = "seat";
          }else{
            val.STATUS = "seat ocupado";
          }
          // printing element
          console.log("key : ",index, "silla : ",val.NoSilla,"status : ",val.STATUS);
        });
        this.javascriptService.loadScript();
      }
    );

    this.asientosService.obtenerEventoId(idEvento).subscribe(
      data =>{
        this.eventosDetalle = data[0];

    });
  }

  comprobarAsientos(){
    var asientosSeleccionados = JSON.parse(localStorage.getItem('asientosSeleccionados') || '');
    if(asientosSeleccionados.length > 0){
      //var asientosArray:any[] = asientosSeleccionados;
      //console.log(asientosArray);
      //localStorage.getItem('precioTotal');
      var idEvento = <string>this.activeRoute.snapshot.params['id'];
      this.router.navigate(['/compra/' + idEvento]);
      //onsole.log(localStorage.getItem('precioTotal'));
    }else{
      console.log('No Valido')
      alert("No has seleccionado ningun asiento!");
    }
  }

}
