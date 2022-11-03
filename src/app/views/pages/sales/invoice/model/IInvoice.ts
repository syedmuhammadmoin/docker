import { IInvoiceLines } from "./IInvoiceLines";

export interface IInvoice {
  id: number;
  customerId: number;
  invoiceDate: string;
  dueDate: string;
  contact: string;
  invoiceLines: IInvoiceLines[];
  isSubmit?: any;
}

