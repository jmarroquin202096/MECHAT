import { Component, OnInit } from '@angular/core';
import { Usuario} from 'src/app/models/usuario.model';
import { UsuarioServiceService } from 'src/app/Servicios/usuario-service.service';
import { Router } from '@angular/router';
import { Chat } from 'src/app/models/chat.model';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public token;
  public identidad;
  public usuarioLogeado : Usuario;
  public usuario2 : Usuario;
  public usuarioModelGetiId: Usuario;
  public chatModelPost: Chat;


  public id: String;
  constructor(
    private _usuarioService: UsuarioServiceService,
    private _router: Router) {
    this.token = _usuarioService.getToken()

  }

  ngOnInit() {

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

  obtenerDatos(){
    this.identidad = this._usuarioService.getIdentidad()
    this.usuarioLogeado = this._usuarioService.getIdentidad()
  }


}
