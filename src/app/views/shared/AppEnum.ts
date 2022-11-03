export class Permissions {
  // Access Management
  static ROLE_CREATE : 'Permissions.AuthClaims.Create'
  static ROLE_VIEW : 'Permissions.AuthClaims.View'
  static ROLE_EDIT : 'Permissions.AuthClaims.Edit'
  static ROLE_DELETE : 'Permissions.AuthClaims.Delete'
  // Business Partner
  static BUSINESSPARTNER_CREATE = 'Permissions.BusinessPartnerClaims.Create'
  static BUSINESSPARTNER_VIEW = 'Permissions.BusinessPartnerClaims.View'
  static BUSINESSPARTNER_EDIT = 'Permissions.BusinessPartnerClaims.Edit'
  static BUSINESSPARTNER_DELETE = 'Permissions.BusinessPartnerClaims.Delete'

  // Bank Account
  static BANKACCOUNT_VIEW = 'Permissions.BankAccountClaims.View';
  static BANKACCOUNT_CREATE = 'Permissions.BankAccountClaims.Create';
  static BANKACCOUNT_EDIT = 'Permissions.BankAccountClaims.Edit';
  static BANKACCOUNT_DELETE = 'Permissions.BankAccountClaims.Delete';

  // Bank Statement
  static BANKSTATEMENT_VIEW = 'Permissions.BankStatementClaims.View';
  static BANKSTATEMENT_CREATE = 'Permissions.BankStatementClaims.Create';
  static BANKSTATEMENT_EDIT = 'Permissions.BankStatementClaims.Edit';
  static BANKSTATEMENT_DELETE = 'Permissions.BankStatementClaims.Delete';

  // Address
  // static ADDRESS_VIEW = 'Permissions.AddressClaims.View';
  // static ADDRESS_CREATE = 'Permissions.AddressClaims.Create';
  // static ADDRESS_EDIT = 'Permissions.AddressClaims.Edit';
  // static ADDRESS_DELETE = 'Permissions.AddressClaims.Delete';

  // Warehouse
  static WAREHOUSE_VIEW = 'Permissions.WarehouseClaims.View';
  static WAREHOUSE_CREATE = 'Permissions.WarehouseClaims.Create';
  static WAREHOUSE_EDIT = 'Permissions.WarehouseClaims.Edit';
  static WAREHOUSE_DELETE = 'Permissions.WarehouseClaims.Delete';

  // Location
  static LOCATION_VIEW = 'Permissions.LocationClaims.View';
  static LOCATION_CREATE = 'Permissions.LocationClaims.Create';
  static LOCATION_EDIT = 'Permissions.LocationClaims.Edit';
  static LOCATION_DELETE = 'Permissions.LocationClaims.Delete';

  // Cash Account
  static CASHACCOUNT_VIEW = 'Permissions.CashAccountClaims.View';
  static CASHACCOUNT_CREATE = 'Permissions.CashAccountClaims.Create';
  static CASHACCOUNT_EDIT = 'Permissions.CashAccountClaims.Edit';
  static CASHACCOUNT_DELETE = 'Permissions.CashAccountClaims.Delete';

  // Category
  static CATEGORIES_VIEW = 'Permissions.CategoriesClaims.View';
  static CATEGORIES_CREATE = 'Permissions.CategoriesClaims.Create';
  static CATEGORIES_EDIT = 'Permissions.CategoriesClaims.Edit';
  static CATEGORIES_DELETE = 'Permissions.CategoriesClaims.Delete';

  // Chart of Account
  static CHARTOFACCOUNT_VIEW = 'Permissions.ChartOfAccountClaims.View';

  // Department
  static DEPARTMENTS_VIEW = 'Permissions.DepartmentsClaims.View';
  static DEPARTMENTS_CREATE = 'Permissions.DepartmentsClaims.Create';
  static DEPARTMENTS_EDIT = 'Permissions.DepartmentsClaims.Edit';
  static DEPARTMENTS_DELETE = 'Permissions.DepartmentsClaims.Delete';

  // Designation
  // static DESIGNATIONS_VIEW = 'Permissions.DesignationsClaims.View';
  // static DESIGNATIONS_CREATE = 'Permissions.DesignationsClaims.Create';
  // static DESIGNATIONS_EDIT = 'Permissions.DesignationsClaims.Edit';
  // static DESIGNATIONS_DELETE = 'Permissions.DesignationsClaims.Delete';

  // Organization
  static ORGANIZATION_VIEW = 'Permissions.OrganizationClaims.View';
  static ORGANIZATION_CREATE = 'Permissions.OrganizationClaims.Create';
  static ORGANIZATION_EDIT = 'Permissions.OrganizationClaims.Edit';
  static ORGANIZATION_DELETE = 'Permissions.OrganizationClaims.Delete';

  // Product
  static PRODUCT_VIEW = 'Permissions.ProductsClaims.View';
  static PRODUCT_CREATE = 'Permissions.ProductsClaims.Create';
  static PRODUCT_EDIT = 'Permissions.ProductsClaims.Edit';
  static PRODUCT_DELETE = 'Permissions.ProductsClaims.Delete';

  // Level 3
  static LEVEL3_VIEW = 'Permissions.Level3Claims.View';
  static LEVEL3_CREATE = 'Permissions.Level3Claims.Create';
  static LEVEL3_EDIT = 'Permissions.Level3Claims.Edit';
  static LEVEL3_DELETE = 'Permissions.Level3Claims.Delete';

  // Level 4
  static LEVEL4_VIEW = 'Permissions.Level4Claims.View';
  static LEVEL4_CREATE = 'Permissions.Level4Claims.Create';
  static LEVEL4_EDIT = 'Permissions.Level4Claims.Edit';
  static LEVEL4_DELETE = 'Permissions.Level4Claims.Delete';

  // Report
  static BALANCESHEET_VIEW = 'Permissions.BalanceSheetClaims.View';
  static GENERALLEDGER_VIEW = 'Permissions.GeneralLedgerClaims.View';
  static PROFITLOSS_VIEW = 'Permissions.ProfitLossClaims.View';
  static TRIALBALANCE_VIEW = 'Permissions.TrialBalanceClaims.View';

  // Invoice
  static INVOICE_VIEW = 'Permissions.InvoiceClaims.View';
  static INVOICE_CREATE = 'Permissions.InvoiceClaims.Create';
  static INVOICE_EDIT = 'Permissions.InvoiceClaims.Edit';
  static INVOICE_DELETE = 'Permissions.InvoiceClaims.Delete';
  static INVOICE_REVIEW = 'Permissions.InvoiceClaims.Review';
  static INVOICE_APPROVE = 'Permissions.InvoiceClaims.Approve';

  // sales Order
  static SALESORDER_VIEW = 'Permissions.SalesOrderClaims.View';
  static SALESORDER_CREATE = 'Permissions.SalesOrderClaims.Create';
  static SALESORDER_EDIT = 'Permissions.SalesOrderClaims.Edit';
  static SALESORDER_DELETE = 'Permissions.SalesOrderClaims.Delete';
  static SALESORDER_REVIEW = 'Permissions.SalesOrderClaims.Review';
  static SALESORDER_APPROVE = 'Permissions.SalesOrderClaims.Approve';

  // Bill
  static BILL_VIEW = 'Permissions.BillClaims.View';
  static BILL_CREATE = 'Permissions.BillClaims.Create';
  static BILL_EDIT = 'Permissions.BillClaims.Edit';
  static BILL_DELETE = 'Permissions.BillClaims.Delete';
  static BILL_REVIEW = 'Permissions.BillClaims.Review';
  static BILL_APPROVE = 'Permissions.BillClaims.Approve';

  // purchase Order
  static PURCHASEORDER_VIEW = 'Permissions.PurchaseOrderClaims.View';
  static PURCHASEORDER_CREATE = 'Permissions.PurchaseOrderClaims.Create';
  static PURCHASEORDER_EDIT = 'Permissions.PurchaseOrderClaims.Edit';
  static PURCHASEORDER_DELETE = 'Permissions.PurchaseOrderClaims.Delete';
  static PURCHASEORDER_REVIEW = 'Permissions.PurchaseOrderClaims.Review';
  static PURCHASEORDER_APPROVE = 'Permissions.PurchaseOrderClaims.Approve';

  // Payment Voucher
  static PAYMENT_VIEW = 'Permissions.PaymentClaims.View';
  static PAYMENT_CREATE = 'Permissions.PaymentClaims.Create';
  static PAYMENT_EDIT = 'Permissions.PaymentClaims.Edit';
  static PAYMENT_DELETE = 'Permissions.PaymentClaims.Delete';
  static PAYMENT_REVIEW = 'Permissions.PaymentClaims.Review';
  static PAYMENT_APPROVE = 'Permissions.PaymentClaims.Approve';

  // Payment Receipt
  static RECEIPT_VIEW = 'Permissions.ReceiptClaims.View';
  static RECEIPT_CREATE = 'Permissions.ReceiptClaims.Create';
  static RECEIPT_EDIT = 'Permissions.ReceiptClaims.Edit';
  static RECEIPT_DELETE = 'Permissions.ReceiptClaims.Delete';
  // static RECEIPT_REVIEW = 'Permissions.ReceiptClaims.Review';
  // static RECEIPT_APPROVE = 'Permissions.ReceiptClaims.Approve';

  // Credit Note
  static CREDITNOTE_VIEW = 'Permissions.CreditNoteClaims.View';
  static CREDITNOTE_CREATE = 'Permissions.CreditNoteClaims.Create';
  static CREDITNOTE_EDIT = 'Permissions.CreditNoteClaims.Edit';
  static CREDITNOTE_DELETE = 'Permissions.CreditNoteClaims.Delete';
  static CREDITNOTE_REVIEW = 'Permissions.CreditNoteClaims.Review';
  static CREDITNOTE_APPROVE = 'Permissions.CreditNoteClaims.Approve';

  // Debit Note
  static DEBITNOTE_VIEW = 'Permissions.DebitNoteClaims.View';
  static DEBITNOTE_CREATE = 'Permissions.DebitNoteClaims.Create';
  static DEBITNOTE_EDIT = 'Permissions.DebitNoteClaims.Edit';
  static DEBITNOTE_DELETE = 'Permissions.DebitNoteClaims.Delete';
  static DEBITNOTE_REVIEW = 'Permissions.DebitNoteClaims.Review';
  static DEBITNOTE_APPROVE = 'Permissions.DebitNoteClaims.Approve';

  // Journal Entry Permissions
  static JOURNALENTRY_VIEW = 'Permissions.JournalEntryClaims.View';
  static JOURNALENTRY_CREATE = 'Permissions.JournalEntryClaims.Create';
  static JOURNALENTRY_EDIT = 'Permissions.JournalEntryClaims.Edit';
  static JOURNALENTRY_DELETE = 'Permissions.JournalEntryClaims.Delete';
  static JOURNALENTRY_REVIEW = 'Permissions.JournalEntryClaims.Review';
  static JOURNALENTRY_APPROVE = 'Permissions.JournalEntryClaims.Approve';

  // Auth Permissions
  static AUTH_VIEW = 'Permissions.AuthClaims.View';
  static AUTH_CREATE = 'Permissions.AuthClaims.Create';
  static AUTH_EDIT = 'Permissions.AuthClaims.Edit';
  static AUTH_DELETE = 'Permissions.AuthClaims.Delete';

  // WORKFLOW Permissions
  static WORKFLOW_VIEW = 'Permissions.WorkflowClaims.View';
  static WORKFLOW_CREATE = 'Permissions.WorkflowClaims.Create';
  static WORKFLOW_EDIT = 'Permissions.WorkflowClaims.Edit';
  static WORKFLOW_DELETE = 'Permissions.WorkflowClaims.Delete';

  // STATUS Permissions
  static STATUS_VIEW = 'Permissions.WorkflowStatusClaims.View';
  static STATUS_CREATE = 'Permissions.WorkflowStatusClaims.Create';
  static STATUS_EDIT = 'Permissions.WorkflowStatusClaims.Edit';
  static STATUS_DELETE = 'Permissions.WorkflowStatusClaims.Delete';

  // Transaction Recon
  static TRANSACTION_RECON_VIEW = 'Permissions.TransactionReconClaims.View';
  static TRANSACTION_RECON_CREATE = 'Permissions.TransactionReconClaims.Create';
  static TRANSACTION_RECON_EDIT = 'Permissions.TransactionReconClaims.Edit';
  static TRANSACTION_RECON_DELETE = 'Permissions.TransactionReconClaims.Delete';

  // Bank Recon
  static BANK_RECON_VIEW = 'Permissions.BankReconClaims.View';
  static BANK_RECON_CREATE = 'Permissions.BankReconClaims.Create';
  static BANK_RECON_EDIT = 'Permissions.BankReconClaims.Edit';
  static BANK_RECON_DELETE = 'Permissions.BankReconClaims.Delete';

  // GRN
  static GRN_VIEW = 'Permissions.GoodsReceivingNoteClaims.View';
  static GRN_CREATE = 'Permissions.GoodsReceivingNoteClaims.Create';
  static GRN_EDIT = 'Permissions.GoodsReceivingNoteClaims.Edit';
  static GRN_DELETE = 'Permissions.GoodsReceivingNoteClaims.Delete';

  // GDN
  static GDN_VIEW = 'Permissions.GoodsDispatchNoteClaims.View';
  static GDN_CREATE = 'Permissions.GoodsDispatchNoteClaims.Create';
  static GDN_EDIT = 'Permissions.GoodsDispatchNoteClaims.Edit';
  static GDN_DELETE = 'Permissions.GoodsDispatchNoteClaims.Delete';

  // Inventory Adjustment
  static INVENTORY_ADJUSTMENT_VIEW = 'Permissions.InventoryAdjustmentClaims.View';
  static INVENTORY_ADJUSTMENT_CREATE = 'Permissions.InventoryAdjustmentClaims.Create';
  static INVENTORY_ADJUSTMENT_EDIT = 'Permissions.InventoryAdjustmentClaims.Edit';
  static INVENTORY_ADJUSTMENT_DELETE = 'Permissions.InventoryAdjustmentClaims.Delete';

  // Stock
  static STOCK_VIEW = 'Permissions.StockClaims.View';

  // Requisition
  static REQUISITION_VIEW = 'Permissions.RequisitionClaims.View';
  static REQUISITION_CREATE = 'Permissions.RequisitionClaims.Create';
  static REQUISITION_EDIT = 'Permissions.RequisitionClaims.Edit';
  static REQUISITION_DELETE = 'Permissions.RequisitionClaims.Delete';

}

export enum ActionButton {
  Approve,
  Reject
}

export enum AccountType
{
  SystemDefined,
  UserDefined
}

export enum DocType {
  Payment,
  CreditNote,
  DebitNote,
  Invoice,
  Bill,
  JournalEntry,
  BankAccount,
  CashAccount,
  PurchaseOrder,
  SalesOrder,
  GRN,
  GDN,
  InventoryAdjustment,
  Quotation,
  Requisition,
  Receipt,
  PayrollTransaction,
  PayrollPayment
}

export enum DocumentStatus {
  Draft,
  Rejected,
  Unpaid,
  Partial,
  Paid,
  Submitted,
  Reviewed,
  Cancelled,
  Unreconciled,
  Reconciled
}

export enum PayrollType {
  BasicPay,
  Increment,
  Deduction,
  Others
}

export enum PayrollItemType {
  FixedAmount,
  Percentage
}

export enum BusinessPartnerType {
  Customer,
  Vendor,
  Employee
}

// Draft - Yellow,  Cancelled - Gray, Upaid - Red, Partial - Yellow,  Paid - Green, Submitted - Yellow, Reviewed - Green
