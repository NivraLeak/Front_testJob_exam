import {TipoContribuyente} from "./TipoContribuyente.model";

export interface Response<T> {
  status:  string;
  code:    string;
  message: string;
  data:    T[];
}

