import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {eventos } from 'src/app/models/eventos-model';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AsientosService {

  constructor(private httpClient: HttpClient, private cookies: CookieService) { }

  obtenerHacientos(id:string): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:3000/api/hacientos/' + id
    );
  }

  obtenerEventos():Observable<eventos> {
    return this.httpClient.get<eventos>('http://localhost:3000/api/eventos');
  }

  obtenerEventoId(id:string):Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/api/eventos/'+id);
  }
/*
  setToken(token: any) {
    this.cookies.set("token",token);
  }
  getToken() {
    return this.cookies.get("token");
  }

  getout(){
    this.cookies.delete("token");
  } */

  setlogin(token: any) {
    this.cookies.set("login",token);
  }
  getlogin() {
    return this.cookies.get("login");
  }

  getOutLogin(){
    this.cookies.delete("login");
  }

  login(user:string,contra:string):Observable<any>{
    return this.httpClient.get<any>('http://localhost:3000/api/login/'+user+'/'+contra);
  }

  verfCuenta(correo:string):Observable<any>{
    return this.httpClient.get<any>('http://localhost:3000/api/verif/'+correo);
  }

  crearCuenta(datos:any){
    return this.httpClient.post<any>('http://localhost:3000/api/crear-cuenta', datos );
  }

  comprarBoleto(datos:any){
    return this.httpClient.put<any>('http://localhost:3000/api/compra-boleto', datos );
  }

  enviarMail(datos:any){
    return this.httpClient.post<any>('http://localhost:3000/api/sendMail', datos );
  }
}
