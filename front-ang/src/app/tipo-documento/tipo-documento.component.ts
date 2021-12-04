import { Component, OnInit } from '@angular/core';
import {TipoContribuyente} from "../core/models/TipoContribuyente.model";
import {TipoDocumento} from "../core/models/TipoDocumento.model";
import {HttpClient} from "@angular/common/http";
import {TipoContribuyenteService} from "../core/service/tipoContribuyente/tipo-contribuyente.service";
import {TipoDocumentoService} from "../core/service/tipoDocumento/tipo-documento.service";

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.css']
})
export class TipoDocumentoComponent implements OnInit {
  message = "You are not authenticate";
  authenticated = false;
  tipoDocumentoList: TipoDocumento[] = [ ]
  tipoDocumento: TipoDocumento = {} as TipoDocumento;
  tipoDocumentoSelected: TipoDocumento = {} as TipoDocumento;

  constructor(private http: HttpClient, private  tipoDocumentoService: TipoDocumentoService) { }

  ngOnInit(): void {
    this.isAuthenticated();
    this.getAlTipoDocumento();
  }

  isAuthenticated(): void{
    sessionStorage.getItem('jwt')? this.authenticated = true : this.authenticated = false
  }

  getAlTipoDocumento(): void{
    if (this.authenticated){
      this.tipoDocumentoService.getAllTipoDocumento().subscribe((data) => {
        console.log("Config dentro documento: ",  data.data[0])
        this.tipoDocumentoList= data.data;
      })
    }
  }

  addOrEdit(): void{
    console.log("Name: ",this.tipoDocumento.name);
    console.log("State: ",this.tipoDocumento.state);
    this.tipoDocumentoService.saveTipoDocumento(this.tipoDocumento).subscribe(value => {
      console.log("Valor Respuesta: ", value)
    })
    this.getAlTipoDocumento();

  }

  openForEdit(tipoDocumento: TipoDocumento): void{
    this.tipoDocumentoSelected = tipoDocumento
    this.tipoDocumento=tipoDocumento;
  }

  delete(id: number): void{
    this.tipoDocumentoService.deleteTipoDocumento(id).subscribe(value => {
      console.log("Valor delete: ", value)
    })
  }
}
