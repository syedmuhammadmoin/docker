import {ISalesOrderLines} from "./ISalesOrderLines";

export interface ISalesOrder {
  id: number;
  customerId: number;
  soDate: string;
  dueDate: string;
  contact: string;
  salesOrderLines: ISalesOrderLines[];
  isSubmit?: any;
}
