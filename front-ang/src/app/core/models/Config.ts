import {TipoContribuyente} from "./TipoContribuyente.model";

export interface Config {
  status: string;
  code: string;
  message: string;
  data: TipoContribuyente[]
}
