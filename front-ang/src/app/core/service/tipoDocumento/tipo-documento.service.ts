import { Injectable } from '@angular/core';
import {Config} from "../../models/Config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Response} from "../../models/Response";
import {TipoContribuyente} from "../../models/TipoContribuyente.model";
import {TipoDocumento} from "../../models/TipoDocumento.model";

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  private URL = 'http://localhost:8080/api/tipoDocumento/';
  private jwt = "";
  private message = "";
  private headers;

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('jwt')){
      this.jwt = sessionStorage.getItem('jwt')!;
    }else this.message = "PLEASE LOG IN"

    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwt}`)
  }

  getAllTipoDocumento(){
    return this.http.get<Response<TipoDocumento>>(this.URL + "getAll", {headers: this.headers, withCredentials: false})
  }

  getTipoDocumento(id: string){
    return this.http.get(this.URL + `${id}`)
  }

  saveTipoDocumento(tipoDocumento: TipoDocumento){
    return this.http.post(this.URL,tipoDocumento,{headers: this.headers, withCredentials: false})
  }

  deleteTipoDocumento(id: number){
    return this.http.delete(this.URL + `delete/${id}`,{headers: this.headers, withCredentials: false})
  }
}
