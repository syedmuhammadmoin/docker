import { InventoryAdjustmentLines } from "./InventoryAdjustmentLines";

export interface IInventoryAdjustment {
    id : number;
    employeeId : string;
    adjustmentDate : string;
    adjustmentNature: number;
    contact?: number;
    isSubmit?:number;
    inventoryAdjustmentLines: InventoryAdjustmentLines[];
}
