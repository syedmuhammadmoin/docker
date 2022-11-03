import { IQuotationLines } from "./IQuotationLines";

export interface IQuotation {
    id: number;
    businessPartnerId: number;
    customerName : string;
    paymentTerms: string;
    billDate: string;
    dueDate: string;
    contactNo: string;
    currency: string;
    vehicleNo: string;
    from: string;
    to: string;
    quotationDetails: IQuotationLines[];
    transactionId: number;
}
