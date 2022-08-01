import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from 'src/app/Servicios/usuario-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public _usuarioService: UsuarioServiceService) { }

  ngOnInit(): void {
  }

}
