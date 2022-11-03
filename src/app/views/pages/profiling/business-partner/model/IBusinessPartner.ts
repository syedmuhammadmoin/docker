export interface IBusinessPartner {
  id: number;
  businessPartnerType: string;
  entity: string;
  address: string;
  country: string;
  state: string;
  city: string;
  name: string;
  phone: number;
  mobile: number;
  email: string;
  cnic: string;
  website: string;
  incomeTaxId: string;
  salesTaxId: string;
  bankAccountTitle: string;
  bankAccountNumber: string;
  accountPayableId: number;
  accountReceivableId: number;
}
