import { Component, OnInit } from '@angular/core';
import {TipoDocumento} from "../core/models/TipoDocumento.model";
import {HttpClient} from "@angular/common/http";
import {TipoDocumentoService} from "../core/service/tipoDocumento/tipo-documento.service";
import {Entidad} from "../core/models/Entidad.model";
import {EntidadService} from "../core/service/entidad/entidad.service";

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.css']
})
export class EntidadComponent implements OnInit {
  message = "You are not authenticate";
  authenticated = false;
  entidadList: Entidad[] = [ ]
  entidad: Entidad = {} as Entidad;
  entidadSelected: Entidad = {} as Entidad;

  constructor(private http: HttpClient, private  entidadSevice: EntidadService) { }

  ngOnInit(): void {
    this.isAuthenticated();
    this.getAllEntidad();
  }

  isAuthenticated(): void{
    sessionStorage.getItem('jwt')? this.authenticated = true : this.authenticated = false
  }

  getAllEntidad(): void{
    if (this.authenticated){
      this.entidadSevice.getAllEntidad().subscribe((data) => {
        console.log("Config dentro entidad: ",  data.data[0])
        this.entidadList= data.data;
      })
    }
  }

  addOrEdit(): void{
    console.log("BusinessName: ",this.entidad.businessName);
    console.log("State: ",this.entidad.state);
    this.entidadSevice.saveEntidad(this.entidad).subscribe(value => {
      console.log("Valor Respuesta: ", value)
    })
    this.getAllEntidad();

  }

  openForEdit(entidad: Entidad): void{
    this.entidadSelected = entidad
    this.entidad = entidad;
  }

  delete(id: number): void{
    this.entidadSevice.deleteEntidad(id).subscribe(value => {
      console.log("Valor delete entidad: ", value)
    })
  }
}
