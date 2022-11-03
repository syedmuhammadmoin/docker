export interface IInvoiceLines {
    id: number;
    itemId?: any;
    description: string;
    price: number;
    quantity: number;
    tax: number;
    accountId: number;
    locationId?: any;
}
