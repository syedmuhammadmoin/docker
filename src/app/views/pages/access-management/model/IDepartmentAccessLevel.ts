import { IWarehouseAccessLevel } from "./IWarehouseAccessLevel";

export interface IDepartmentAccessLevel {
    id: number;
    name: string;
    warehouses: IWarehouseAccessLevel[];
}