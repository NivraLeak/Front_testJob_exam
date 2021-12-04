import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {TipoContribuyente} from "../../models/TipoContribuyente.model";
import {Config} from "../../models/Config";
import {Response} from "../../models/Response";

@Injectable({
  providedIn: 'root'
})
export class TipoContribuyenteService {
  private URL = 'http://localhost:8080/api/tipoContribuyente/';
  private jwt = "";
  private message = "";
  private headers;

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('jwt')){
      this.jwt = sessionStorage.getItem('jwt')!;
    }else this.message = "PLEASE LOG IN"

    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwt}`)
  }

  getAllTipoContribuyente(){
      return this.http.get<Response<TipoContribuyente>>(this.URL + "getAll", {headers: this.headers, withCredentials: false})
  }

  getTipoContribuyenteById(id: string){
    return this.http.get(this.URL + `${id}`)
  }

  saveTipoContribuyente(tipoContribuyente: TipoContribuyente){
    return this.http.post(this.URL,tipoContribuyente,{headers: this.headers, withCredentials: false})
  }

  deleteTipoContribuyente(id: number){
    return this.http.delete(this.URL + `delete/${id}`,{headers: this.headers, withCredentials: false})
  }

}
