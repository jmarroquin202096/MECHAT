import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Recordatorio } from '../models/recordatorio.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {


  public url : String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;
  public identidad;

  constructor(public _http: HttpClient) { }

  registro(modeloUsuario: Usuario): Observable<any>{
    let parametros = JSON.stringify(modeloUsuario);

    return this._http.post(this.url + '/registro', parametros, {headers: this.headersVariable})

  }

  login(usuario, obtenerToken = null): Observable<any> {

    if(obtenerToken != null){
      usuario.obtenerToken = obtenerToken;
    }

    let params = JSON.stringify(usuario);

    return this._http.post(this.url + '/login', params, { headers: this.headersVariable });
  }

  getToken(){
    var token2 = localStorage.getItem("token");
    if(token2 != undefined){
      this.token = token2
    } else {
      this.token = '';
    }

    return this.token;
  }

  getIdentidad() {
    var identidad2 = JSON.parse(localStorage.getItem('identidad'));
    if(identidad2 != undefined){
      this.identidad = identidad2;
    }else{
      this.identidad = null;
    }

    return this.identidad;
  }
  obtenerRecordatorios(token){ 
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerRecordatorios', { headers: headersToken});
  }
  otbenerPacientes(token){
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/VerPacientes', { headers: headersToken});
  }
  obtnerUserId(id){
    

    return this._http.get(this.url + '/buscarUserId/'+ id, { headers: this.headersVariable});

  }
  agregarRecordatorio(id, token, modeloRecordatorio: Recordatorio){
    let parametros = JSON.stringify(modeloRecordatorio);
    let headersToken = this.headersVariable.set('Authorization', token);


    return this._http.post(this.url + '/agregarRecordatorio/'+ id, parametros,{ headers: headersToken});

  }



}
