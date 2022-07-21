import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioServiceService } from 'src/app/Servicios/usuario-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UsuarioServiceService]
})
export class RegistroComponent implements OnInit {

  public usuarioModelPost: Usuario;
  usuarioModel: Usuario;
  private _router: any;

  constructor(private _usuarioService: UsuarioServiceService) {
    this.usuarioModel = new Usuario(
      "",
      "",
      ""
    );
  }

  ngOnInit(): void {
  }

  postUsuario() {
    this._usuarioService.registro(this.usuarioModelPost).subscribe(
      (response) => {

        Swal.fire({
          title: 'Guardado exitosamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          this._router.navigate(['/login']);
          console.log(response);
          this.usuarioModelPost.correo = '',
            this.usuarioModelPost.password = ''

        });
      }


    )
  }


}