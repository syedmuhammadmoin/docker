import {IPurchaseRequisitionLines} from './IPurchaseRequisitionLines'

export interface IPurchaseRequisition {
  id: number;
  vendorId: number;
  requisitionDate: string
  requisitionLines: IPurchaseRequisitionLines[];
  isSubmit?: any;
}
