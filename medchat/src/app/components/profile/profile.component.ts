import { Component, OnInit } from '@angular/core';
import { Recordatorio } from 'src/app/models/recordatorio.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioServiceService } from 'src/app/Servicios/usuario-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public token;
  public identidad;
  public recordatorioModelPost: Recordatorio;
  public usuarioLogeado : Usuario;
  public usuarioModelGetiId: Usuario;
  public usuarioModelUpdate: Usuario;
  public usuarioModelDelete: Usuario;
  public usuarioModelGet: any;


  public id: String;
  constructor(private _usuarioService: UsuarioServiceService,  private _router: Router) {
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
      '',
      ''
    ),
    this.usuarioModelUpdate = new Usuario(
      '',
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
    this.usuarioLogeado = this._usuarioService.getIdentidad()

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

  putUser(){
    Swal.fire({
      title: 'Desea editar el usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.isConfirmed) {
        this._usuarioService.editarUsuario(this.token, this.usuarioLogeado).subscribe({
          next: (response: any)=>{      
              localStorage.setItem('identidad', JSON.stringify(response.usuarioEditado))

          },
          error: (err)=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hubo un error',
            })

          }
        })
        Swal.fire(
          'Editado',
          'usuario editado',
          'success'
        )
      }else{
        Swal.fire('Cancelado')

      }
    })
  }

  deleteUser() {
      Swal.fire({
        title: 'Desea eliminar el usuario',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI'
      }).then((result) => {
        if (result.isConfirmed) {
          this._router.navigate(['/login']);
          localStorage.clear()
          this._usuarioService.eliminarUsuario(this.token).subscribe({
            next: (response: any)=>{
            },
            error: (err)=>{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error',
              })
  
            }
          })
          Swal.fire(
            'Eliminado',
            'usuario eliminado',
            'success'
          ).then((o)=>{
            this._router.navigate(['/login']);

          })
        }else{
          Swal.fire('Cancelado')
  
        }
      })
    }
  
}
