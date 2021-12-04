import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { TipoContribuyente } from "../core/models/TipoContribuyente.model";
import { TipoContribuyenteService } from "../core/service/tipoContribuyente/tipo-contribuyente.service";

@Component({
  selector: 'app-tipo-contribuyente',
  templateUrl: './tipo-contribuyente.component.html',
  styleUrls: ['./tipo-contribuyente.component.css']
})
export class TipoContribuyenteComponent implements OnInit, OnDestroy {
  today = new Date();
  tipoContribuyenteList: TipoContribuyente[] = [];
  constructor(
    private tipoContribuyenteService: TipoContribuyenteService
  ) { }
  ngOnInit() {
    console.log('3. ngOnInit');
  }

  ngOnDestroy() {
    console.log('5. ngOnDestroy');
  }

  addCart() {
    console.log('añadir al carrito');
  }

}
