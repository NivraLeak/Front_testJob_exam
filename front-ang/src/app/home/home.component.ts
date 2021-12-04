import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TipoContribuyente} from "../core/models/TipoContribuyente.model";
import {TipoContribuyenteService} from "../core/service/tipoContribuyente/tipo-contribuyente.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = "You are not authenticate";
  authenticated = false;
  tipoContribuyenteList: TipoContribuyente[] = [ ]
  tipoContribuyente: TipoContribuyente = {} as TipoContribuyente;
  tipoContribuyenteSeleted: TipoContribuyente = {} as TipoContribuyente;

  constructor(private http: HttpClient, private  tipoContribuyenteService: TipoContribuyenteService) {
  }

  ngOnInit(): void {
    //sessionStorage.getItem('jwt')? this.message = "you are authenticated" : this.message = "PLEASE LOG IN"
    this.isAuthenticated();
    this.getAlTipoContribuyente();
  }

  isAuthenticated(): void{
    sessionStorage.getItem('jwt')? this.authenticated = true : this.authenticated = false
  }

   getAlTipoContribuyente(): void{
    if (this.authenticated){
      this.tipoContribuyenteService.getAllTipoContribuyente().subscribe((data) => {
        console.log("Config dentro ",  data.data[0])
        this.tipoContribuyenteList = data.data;
      })
    }
  }
  addOrEdit(): void{
    console.log("Name: ",this.tipoContribuyente.name);
    console.log("State: ",this.tipoContribuyente.state);
    this.tipoContribuyenteService.saveTipoContribuyente(this.tipoContribuyente).subscribe(value => {
      console.log("Valor Respuesta: ", value)
    })
    this.getAlTipoContribuyente();

  }

  openForEdit(tipoContribuyente: TipoContribuyente): void{
    this.tipoContribuyenteSeleted = tipoContribuyente
    this.tipoContribuyente=tipoContribuyente;
  }

  delete(id: number): void{
    this.tipoContribuyenteService.deleteTipoContribuyente(id).subscribe(value => {
      console.log("Valor delete: ", value)
    })
  }

}
