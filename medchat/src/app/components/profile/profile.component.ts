import { Component, OnInit } from '@angular/core';
import { Recordatorio } from 'src/app/models/recordatorio.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioServiceService } from 'src/app/Servicios/usuario-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public token;
  public identidad;
  public recordatorioModelPost: Recordatorio;  
  public usuarioModelGetiId: Usuario;
  public usuarioModelGet: any;
  public id: String; 
  constructor(private _usuarioService: UsuarioServiceService) {
    this.token = _usuarioService.getToken()
    this.recordatorioModelPost = new Recordatorio(
      '',
      '',
      0,
      '',
      '',
      ''
    ),
    this.usuarioModelGetiId = new Usuario(
      '',
      '',
      '',
      ''
    )
   }

  ngOnInit(): void {
    this.obtenerDatos()
  }
  obtenerDatos(){
    this.identidad = this._usuarioService.getIdentidad()
    console.log(this.identidad);
      
  }
  obtnerUserId(id){
    this._usuarioService.obtnerUserId(id).subscribe({
      next: (response : any)=>{
        this.usuarioModelGetiId = response.usuario
        console.log(this.usuarioModelGetiId._id);
                
      }, 
      error: (err)=>{
        console.log(err);
        
      }
    })
  }
  obtenerPacientes(){
    this._usuarioService.otbenerPacientes(this.token).subscribe({
      next: (response: any)=>{
        this.usuarioModelGet = response.Pacientes
      },
      error: (err)=>{
        console.log(err);
        
      }
    })
  }
  postRecordatorio(){
    this._usuarioService.agregarRecordatorio(this.usuarioModelGetiId._id, this.token, this.recordatorioModelPost).subscribe({
    
      next: (response: any)=>{
        console.log(response);
        
      },
      error: (err)=>{
        console.log(err);
        console.log(this.usuarioModelGetiId._id);
        
      }
    })
  }
}
