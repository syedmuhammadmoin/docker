export interface IPurchaseOrderLines {
    id: number;
    itemId: number;
    description: string;
    quantity: number;
    cost: number;
    tax: number;
    accountId: number;
    locationId: number;
}