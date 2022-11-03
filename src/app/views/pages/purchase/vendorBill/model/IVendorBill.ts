import {IVendorBillLines} from "./IVendorBillLines";

export interface IVendorBill {
  id: number;
  vendorId: number;
  billDate: string;
  dueDate: string;
  contact: string;
  billLines: IVendorBillLines[];
  isSubmit?: any;
}
