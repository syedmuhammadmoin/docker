export interface ISalesOrderLines {
  id: number;
  itemId: number;
  description: string;
  price: number;
  quantity: number;
  tax: number;
  accountId: string;
  locationId: number;
}
