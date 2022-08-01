import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from 'src/app/Servicios/usuario-service.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public usuarioModel: Usuario;

  constructor(private _usuarioService: UsuarioServiceService) {
    this.usuarioModel = new Usuario(
      "",
      "",
      "",
      "",
      ""
    );
  }
  ngOnInit(): void {
  }

  getToken() {
    this._usuarioService.login(this.usuarioModel, "true").subscribe(
      (response) => {
        console.log(response.token);
        localStorage.setItem("token", response.token)
      },
      (error) => {
        console.log(<any>error);

      }
    )
  }

  getTokenPromesa(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._usuarioService.login(this.usuarioModel, "true").subscribe(
        (response) => {
          localStorage.setItem("token", response.token)
          resolve(response);
        },
        (error) => {
          console.log(<any>error);

        }
      )
    })
  }

  login() {
    this._usuarioService.login(this.usuarioModel).subscribe(
      (response) => {

        this.getTokenPromesa().then(respuesta => {
          console.log(respuesta);
          localStorage.setItem('identidad', JSON.stringify(response.usuario))

        })
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
