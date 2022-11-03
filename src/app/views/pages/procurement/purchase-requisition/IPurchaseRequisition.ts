import {IInvoiceLines} from "./IInvoiceLines"

export interface IPurchaseRequisition {
    id: number;
    businessPartnerId: number;
    product : string;
    billDate: Date;
    dueDate: Date;
    requester: string;
    priority: string;
    contactNo: string;
    invoiceDetails: IInvoiceLines[];
    transactionId: number;
}