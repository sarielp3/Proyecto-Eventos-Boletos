import { Component, OnInit } from '@angular/core';
import {sillas} from 'src/app/models/sillas'
import { ActivatedRoute, Router } from '@angular/router';
import {eventos} from 'src/app/models/eventos-model';
import {InfoMail} from 'src/app/models/bodyMail';
import {boletoCompra} from 'src/app/models/compra-boleto-model';
import { AsientosService } from 'src/app/SERVICIOS/asientos.service';
import { JavascriptAsientosService } from 'src/app/SERVICIOS/javascript-asientos.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  public asientosSeleccionados:any[] = JSON.parse(localStorage.getItem('asientosSeleccionados') || '');
  public asientos:any[] = [];
  public total = localStorage.getItem('precioTotal') || '';
  public Devento : eventos = {
    ID_EVENTOS:0,
    TITULO:'',
    DESCRIPCION:'',
    FECHA_HORA:new Date(),
    STATUS:'',
    TIPO_EVENTO:'',
    FOTO:''

  }

  public mail: InfoMail ={
    correo:'',
    evento:'',
    fecha:new Date(),
    total:'',
    asientos:[]
  }

  public compraBoleto : boletoCompra = {
    id_evento:0,
    noSilla:'',
    id_usuario:'',
    id_compra:''
  }
  constructor(private asientosServicio: AsientosService,private activeRoute:ActivatedRoute,private javascriptService: JavascriptAsientosService
    ,private router:Router
    ){

  }
  ngOnInit(): void {
    this.javascriptService.loadScriptPago();
    var idEvento = <string>this.activeRoute.snapshot.params['id'];
    this.asientosServicio.obtenerEventoId(idEvento).subscribe(data => {
      this.Devento = data[0];
    });
    
    this.asientosSeleccionados.forEach((asient) => {
      if(asient > 39){
        asient = asient - 39;
        this.asientos.push('U' + asient)
      }else if (asient > 31){
        asient = asient - 31;
        this.asientos.push('V' + asient)
      }else if (asient > 23){
        asient = asient - 23;
        this.asientos.push('L' + asient)
      }else if (asient > 15){
        asient = asient - 15;
        this.asientos.push('G' + asient)
      }else if (asient > 7){
        asient = asient - 7;
        this.asientos.push('P' + asient)
      }else{
        this.asientos.push('S' + (asient + 1))
      }
      
    });//fin de foreach
    
    console.log(this.asientos);
    
  }

  enviarCompraCorreo(){
    var correo = this.asientosServicio.getlogin();
    this.mail.correo = correo;
    this.mail.evento = this.Devento.TITULO;
    this.mail.fecha = this.Devento.FECHA_HORA;
    this.mail.total = this.total.toString();
    this.mail.asientos = this.asientos;
    console.log(this.mail);
    this.asientosServicio.enviarMail(this.mail).subscribe(data => {
     
    }
    );
  }

  comprarBoleto(){

    //pendiente mostrar mensaje de compra hecha con exito y mandar por correo la info de la compra
    this.compraBoleto.id_evento = <number>this.activeRoute.snapshot.params['id'];
    //this.compraBoleto.noSilla = this.asientosSeleccionados[0] + 1;
    this.compraBoleto.id_usuario = localStorage.getItem('idUsuario') || '';
    this.compraBoleto.id_compra = '0';
    this.asientosSeleccionados.forEach((asient) => {
      this.compraBoleto.noSilla = asient + 1;
      this.asientosServicio.comprarBoleto(this.compraBoleto).subscribe(data => {
        console.log(data);
      });
    });
    
    console.log("No silla:" + this.compraBoleto.noSilla);
    console.log("id usuario:" + this.compraBoleto.id_usuario);

    this.enviarCompraCorreo();
    alert("Compra realizada con exito! Recibiras por tu correo la confirmacion de la compra");
    this.router.navigate(['/inicio']);
  }

}
