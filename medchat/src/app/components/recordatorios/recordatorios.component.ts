import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from 'src/app/Servicios/usuario-service.service';
import { Recordatorio } from 'src/app/models/recordatorio.model';
@Component({
  selector: 'app-recordatorios',
  templateUrl: './recordatorios.component.html',
  styleUrls: ['./recordatorios.component.scss']
})
export class RecordatoriosComponent implements OnInit {
  public token;
  public recordatoriosModelGet: any;
  public recordatorioModePost: Recordatorio;  
  constructor(private _usuarioService: UsuarioServiceService) { 
    this.token = _usuarioService.getToken();
    this.recordatorioModePost = new Recordatorio(
      '',
      '',
      0,
      '',
      '',
      ''
    )
  }

  ngOnInit(): void {
    this.obtenerRecordatorios()
  }
  obtenerRecordatorios(){
    this._usuarioService.obtenerRecordatorios(this.token).subscribe({
      next: (response: any)=>{
        console.log(response.recordatorios);
        this.recordatoriosModelGet = response.recordatorios;
      },
      error: (err)=>{
        console.log(err);
        
      }
    })
  }
  
}
