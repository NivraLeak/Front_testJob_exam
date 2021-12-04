import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Response} from "../../models/Response";
import {TipoContribuyente} from "../../models/TipoContribuyente.model";
import {Entidad} from "../../models/Entidad.model";

@Injectable({
  providedIn: 'root'
})
export class EntidadService {
  private URL = 'http://localhost:8080/api/Entidad/';
  private jwt = "";
  private message = "";
  private headers;

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('jwt')){
      this.jwt = sessionStorage.getItem('jwt')!;
    }else this.message = "PLEASE LOG IN"

    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwt}`)
  }

  getAllEntidad(){
    return this.http.get<Response<Entidad>>(this.URL + "getAll", {headers: this.headers, withCredentials: false})
  }

  getEntidadById(id: string){
    return this.http.get(this.URL + `${id}`)
  }

  saveEntidad(entidad: Entidad){
    return this.http.post(this.URL,entidad,{headers: this.headers, withCredentials: false})
  }

  deleteEntidad(id: number){
    return this.http.delete(this.URL + `delete/${id}`,{headers: this.headers, withCredentials: false})
  }
}
