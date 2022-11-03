export interface IGeneralLedger {
  level1Id?: string;
  nature?: string;
  ledgerId?: number;
  departmentId?: number;
  departmentName?: string;
  warehouseId?: number;
  warehouseName?: string;
  locationId?: number;
  locationName?: string;
  accountId?: string;
  accountName?: string;
  transactionId?: number;
  docDate?: string;
  docDate2?: string;
  docType?: number;
  docNo?: string;
  organization?: string;
  description?: string;
  debit?: number;
  credit?: number;
  balance?: number;
  bId?: number;
  businessPartnerName?: string;
  isOpeningBalance?: boolean;
}
