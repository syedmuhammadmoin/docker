export interface InventoryAdjustmentLines {
    id          : number;
    itemId      : number;
    description : string;
    price  : number;
    quantity    : number;
    locationId  : number;
}