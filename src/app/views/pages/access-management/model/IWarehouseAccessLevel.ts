import { ILocationAccessLevel } from "./ILocationAccessLevel";

export interface IWarehouseAccessLevel {
    id: number;
    name: string;
    locations: ILocationAccessLevel[];
  }
  