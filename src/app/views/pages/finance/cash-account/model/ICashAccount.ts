export interface ICashAccount {
  id: number;
  cashAccountName: string;
  handler: string;
  openingBalance: number;
  openingBalanceDate: string;
  currency: string;
}
