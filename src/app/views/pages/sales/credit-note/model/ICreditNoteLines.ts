export interface ICreditNoteLines {
    id: number;
    itemId: number;
    description: string;
    price: number;
    quantity: number;
    tax: number;
    accountId: number;
    locationId: number;
}