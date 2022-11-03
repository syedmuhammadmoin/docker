export interface IStock {
    id           : number;
    productId    : number;
    reservedQty  : number;
    availableQty : number;
    cost         : number;
    price        : number;
    locationId   : number;
}