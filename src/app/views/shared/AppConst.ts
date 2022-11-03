import {DocType} from './AppEnum';

export class AppConst {

  static appBaseUrl: string;
  static remoteServiceBaseUrl: string;
  static websiteBaseUrl: string;
  static appBaseHref: string;


  static PurchasedOrSold = {
    1: 'Purchased',
    2: 'Sold'
  }
  static ConsumableOrService = {
    1: 'Consumable',
    2: 'Service'
  }
  static docType = {
    0: 'Payment',
    1: 'CreditNote',
    2: 'DebitNote'
  };
  static ConsileOrReconcile = {
    0: 'Unconciled',
    1: 'Partial',
    2: 'Reconciled'
  }
  static status = {
    0: 'Pending',
    1: 'Partial',
    2: 'Paid'
  }
  static paymentType = {
    0: 'Inflow',
    1: 'Outflow'
  }
  static PermissionsDisplayName = {

    // Business Partner
    'Permissions.BusinessPartnerClaims.Create': 'Business Partner Create',
    'Permissions.BusinessPartnerClaims.View': 'Business Partner View',
    'Permissions.BusinessPartnerClaims.Edit': 'Business Partner Edit',
    'Permissions.BusinessPartnerClaims.Delete': 'Business Partner Delete',

    // Invoice
    'Permissions.InvoiceClaims.Create': 'Invoice Create',
    'Permissions.InvoiceClaims.View': 'Invoice View',
    'Permissions.InvoiceClaims.Edit': 'Invoice Edit',
    'Permissions.InvoiceClaims.Delete': 'Invoice Delete',
    'Permissions.InvoiceClaims.Review': 'Invoice Review',
    'Permissions.InvoiceClaims.Approve': 'Invoice Approve',

    // Bank Account
    'Permissions.BankAccountClaims.View': 'Bank Account View',
    'Permissions.BankAccountClaims.Create': 'Bank Account Create',
    'Permissions.BankAccountClaims.Edit': 'Bank Account Update',
    'Permissions.BankAccountClaims.Delete': 'Bank Account Delete',

    // Bank Statement
    'Permissions.BankStatementClaims.View': 'Bank Statement View',
    'Permissions.BankStatementClaims.Create': 'Bank Statement Create',
    'Permissions.BankStatementClaims.Edit': 'Bank Statement Update',
    'Permissions.BankStatementClaims.Delete': 'Bank Statement Delete',

    // Business Partner Entities
    'Permissions.BusinessPartnerEntitiesClaims.View': 'Business Partner Entities View',
    'Permissions.BusinessPartnerEntitiesClaims.Create': 'Business Partner Entities Create',
    'Permissions.BusinessPartnerEntitiesClaims.Edit': 'Business Partner Entities Update',
    'Permissions.BusinessPartnerEntitiesClaims.Delete': 'Business Partner Entities Delete',

    // Business Partner type
    'Permissions.BusinessPartnerTypesClaims.View': 'Business Partner Type View',
    'Permissions.BusinessPartnerTypesClaims.Create': 'Business Partner Type Create',
    'Permissions.BusinessPartnerTypesClaims.Edit': 'Business Partner Type Update',
    'Permissions.BusinessPartnerTypesClaims.Delete': 'Business Partner Type Delete',

    // Campus
    'Permissions.CampusClaims.View': 'Campus View',
    'Permissions.CampusClaims.Create': 'Campus Create',
    'Permissions.CampusClaims.Edit': 'Campus Update',
    'Permissions.CampusClaims.Delete': 'Campus Delete',

    // Cash Account
    'Permissions.CashAccountClaims.View': 'Cash Account View',
    'Permissions.CashAccountClaims.Create': 'Cash Account Create',
    'Permissions.CashAccountClaims.Edit': 'Cash Account Update',
    'Permissions.CashAccountClaims.Delete': 'Cash Account Delete',

    // Category
    'Permissions.CategoriesClaims.View': 'Category View',
    'Permissions.CategoriesClaims.Create': 'Category Create',
    'Permissions.CategoriesClaims.Edit': 'Category Update',
    'Permissions.CategoriesClaims.Delete': 'Category Delete',

    // Chart of Account
    'Permissions.ChartOfAccountClaims.View': 'Chart of Account View',

    // Country
    'Permissions.CountryClaims.View': 'Country View',
    'Permissions.CountryClaims.Create': 'Country Create',
    'Permissions.CountryClaims.Edit': 'Country Update',
    'Permissions.CountryClaims.Delete': 'Country Delete',

    // State
    'Permissions.StateClaims.View': 'State View',
    'Permissions.StateClaims.Create': 'State Create',
    'Permissions.StateClaims.Edit': 'State Update',
    'Permissions.StateClaims.Delete': 'State Delete',

    // City
    'Permissions.CityClaims.View': 'City View',
    'Permissions.CityClaims.Create': 'City Create',
    'Permissions.CityClaims.Edit': 'City Update',
    'Permissions.CityClaims.Delete': 'City Delete',

    // Department
    'Permissions.DepartmentsClaims.View': 'Department View',
    'Permissions.DepartmentsClaims.Create': 'Department Create',
    'Permissions.DepartmentsClaims.Edit': 'Department Update',
    'Permissions.DepartmentsClaims.Delete': 'Department Delete',

    // Designation
    'Permissions.DesignationsClaims.View': 'Designation View',
    'Permissions.DesignationsClaims.Create': 'Designation Create',
    'Permissions.DesignationsClaims.Edit': 'Designation Update',
    'Permissions.DesignationsClaims.Delete': 'Designation Delete',

    // Employee
    'Permissions.EmployeesClaims.View': 'Employee View',
    'Permissions.EmployeesClaims.Create': 'Employee Create',
    'Permissions.EmployeesClaims.Edit': 'Employee Update',
    'Permissions.EmployeesClaims.Delete': 'Employee Delete',

    // Organization
    'Permissions.OrganizationClaims.View': 'Organization View',
    'Permissions.OrganizationClaims.Create': 'Organization Create',
    'Permissions.OrganizationClaims.Edit': 'Organization Update',
    'Permissions.OrganizationClaims.Delete': 'Organization Delete',

    // Payroll Item
    'Permissions.PayrollItemClaims.View': 'Payroll Item View',
    'Permissions.PayrollItemClaims.Create': 'Payroll Item View',
    'Permissions.PayrollItemClaims.Edit': 'Payroll Item View',
    'Permissions.PayrollItemClaims.Delete': 'Payroll Item View',

    // Product
    'Permissions.ProductsClaims.View': 'Product View',
    'Permissions.ProductsClaims.Create': 'Product Create',
    'Permissions.ProductsClaims.Edit': 'Product Update',
    'Permissions.ProductsClaims.Delete': 'Product Delete',

    // Vehicle
    'Permissions.VehicleClaims.View': 'Vehicle View',
    'Permissions.VehicleClaims.Create': 'Vehicle Create',
    'Permissions.VehicleClaims.Edit': 'Vehicle Update',
    'Permissions.VehicleClaims.Delete': 'Vehicle Delete',

    // Level 3
    'Permissions.Level3Claims.View': 'Chart of Account Level 3 View',
    'Permissions.Level3Claims.Create': 'Chart of Account Level 3 Create',
    'Permissions.Level3Claims.Edit': 'Chart of Account Level 3 Update',
    'Permissions.Level3Claims.Delete': 'Chart of Account Level 3 Delete',

    // Level 4
    'Permissions.Level4Claims.View': 'Chart of Account Level 4 View',
    'Permissions.Level4Claims.Create': 'Chart of Account Level 4 Create',
    'Permissions.Level4Claims.Edit': 'Chart of Account Level 4 Update',
    'Permissions.Level4Claims.Delete': 'Chart of Account Level 4 Delete',

    // Balance Sheet
    'Permissions.BalanceSheetClaims.View': 'Balance Sheet',

    // General Ledger
    'Permissions.GeneralLedgerClaims.View': 'General Ledger',

    // Income Expenditure
    'Permissions.ProfitLossClaims.View': 'Profit and Loss Statement',

    // Trial Balance
    'Permissions.TrialBalanceClaims.View': 'Trial Balance',

    // Bill
    'Permissions.BillClaims.View': 'Bill View',
    'Permissions.BillClaims.Create': 'Bill Create',
    'Permissions.BillClaims.Edit': 'Bill Update',
    'Permissions.BillClaims.Delete': 'Bill Delete',
    'Permissions.BillClaims.Review': 'Bill Review',
    'Permissions.BillClaims.Approve': 'Bill Approve',

    // Payment Voucher
    'Permissions.PaymentClaims.View': 'Payment View',
    'Permissions.PaymentClaims.Create': 'Payment Create',
    'Permissions.PaymentClaims.Edit': 'Payment Update',
    'Permissions.PaymentClaims.Delete': 'Payment Delete',
    'Permissions.PaymentClaims.Review': 'Payment Review',
    'Permissions.PaymentClaims.Approve': 'Payment Approve',

    // Payment Receipt
    'Permissions.ReceiptClaims.View': 'Receipt View',
    'Permissions.ReceiptClaims.Create': 'Receipt Create',
    'Permissions.ReceiptClaims.Edit': 'Receipt Update',
    'Permissions.ReceiptClaims.Delete': 'Receipt Delete',
    // 'Permissions.PaymentClaims.Review': 'Payment Review',
    // 'Permissions.PaymentClaims.Approve': 'Payment Approve',

    // Credit Note
    'Permissions.CreditNoteClaims.View': 'Credit Note View',
    'Permissions.CreditNoteClaims.Create': 'Credit Note Create',
    'Permissions.CreditNoteClaims.Edit': 'Credit Note Update',
    'Permissions.CreditNoteClaims.Delete': 'Credit Note Delete',
    'Permissions.CreditNoteClaims.Review': 'Credit Note Review',
    'Permissions.CreditNoteClaims.Approve': 'Credit Note Approve',

    // Debit Note
    'Permissions.DebitNoteClaims.View': 'Debit Note View',
    'Permissions.DebitNoteClaims.Create': 'Debit Note Create',
    'Permissions.DebitNoteClaims.Edit': 'Debit Note Update',
    'Permissions.DebitNoteClaims.Delete': 'Debit Note Delete',
    'Permissions.DebitNoteClaims.Review': 'Debit Note Review',
    'Permissions.DebitNoteClaims.Approve': 'Debit Note Approve',

    // Journal Voucher
    'Permissions.JournalEntryClaims.View': 'Journal Voucher View',
    'Permissions.JournalEntryClaims.Create': 'Journal Voucher Create',
    'Permissions.JournalEntryClaims.Edit': 'Journal Voucher Update',
    'Permissions.JournalEntryClaims.Delete': 'Journal Voucher Delete',
    'Permissions.JournalEntryClaims.Review': 'Journal Voucher Review',
    'Permissions.JournalEntryClaims.Approve': 'Journal Voucher Approve',

    // Access Management
    'Permissions.AuthClaims.Create': 'Access Management Create',
    'Permissions.AuthClaims.View': 'Access Management View',
    'Permissions.AuthClaims.Edit': 'Access Management Edit',
    'Permissions.AuthClaims.Delete': 'Access Management Delete',

    // Workflow
    'Permissions.WorkflowClaims.Create': 'Workflow Create',
    'Permissions.WorkflowClaims.View': 'Workflow View',
    'Permissions.WorkflowClaims.Edit': 'Workflow Edit',
    'Permissions.WorkflowClaims.Delete': 'Workflow Delete',

    // Status
    'Permissions.WorkflowStatusClaims.Create': 'Status Create',
    'Permissions.WorkflowStatusClaims.View': 'Status View',
    'Permissions.WorkflowStatusClaims.Edit': 'Status Edit',
    'Permissions.WorkflowStatusClaims.Delete': 'Status Delete',

    // Bank Reconciliation
    'Permissions.BankReconClaims.Create': 'Bank Reconciliation Create',
    'Permissions.BankReconClaims.View': 'Bank Reconciliation View',
    'Permissions.BankReconClaims.Edit': 'Bank Reconciliation Edit',
    'Permissions.BankReconClaims.Delete': 'Bank Reconciliation Delete',

    // Location
    'Permissions.LocationClaims.View': 'Location View',
    'Permissions.LocationClaims.Create': 'Location Create',
    'Permissions.LocationClaims.Edit': 'Location Edit',
    'Permissions.LocationClaims.Delete': 'Location Delete',

    //  Warehouse
    'Permissions.WarehouseClaims.View': 'Warehouse View',
    'Permissions.WarehouseClaims.Create': 'Warehouse Create',
    'Permissions.WarehouseClaims.Edit': 'Warehouse Update',
    'Permissions.WarehouseClaims.Delete': 'Warehouse Delete',

    // sales Order
    'Permissions.SalesOrderClaims.View': 'Sales Order View',
    'Permissions.SalesOrderClaims.Create': 'Sales Order Create',
    'Permissions.SalesOrderClaims.Edit': 'Sales Order Update',
    'Permissions.SalesOrderClaims.Delete': 'Sales Order Delete',

    //  purchase Order
    'Permissions.PurchaseOrderClaims.View': 'Purchase Order View',
    'Permissions.PurchaseOrderClaims.Create': 'Purchase Order Create',
    'Permissions.PurchaseOrderClaims.Edit': 'Purchase Order Update',
    'Permissions.PurchaseOrderClaims.Delete': 'Purchase Order Delete',

    // GRN
    'Permissions.GoodsReceivingNoteClaims.View': 'Good Receive Note View',
    'Permissions.GoodsReceivingNoteClaims.Create': 'Good Receive Note Create',
    'Permissions.GoodsReceivingNoteClaims.Edit': 'Good Receive Note Update',
    'Permissions.GoodsReceivingNoteClaims.Delete': 'Good Receive Note Delete',

    //  GDN
    'Permissions.GoodsDispatchNoteClaims.View': 'Good Dispatch Note View',
    'Permissions.GoodsDispatchNoteClaims.Create': 'Good Dispatch Note Create',
    'Permissions.GoodsDispatchNoteClaims.Edit': 'Good Dispatch Note Update',
    'Permissions.GoodsDispatchNoteClaims.Delete': 'Good Dispatch Note Delete',

    //  Requisition
    'Permissions.RequisitionClaims.View': 'Requisition View',
    'Permissions.RequisitionClaims.Create': 'Requisition Create',
    'Permissions.RequisitionClaims.Edit': 'Requisition Update',
    'Permissions.RequisitionClaims.Delete': 'Requisition Delete',

    // Transaction Recon
    'Permissions.TransactionReconClaims.View': 'Transaction Reconcile View',
    'Permissions.TransactionReconClaims.Create': 'Transaction Reconcile Create',
    'Permissions.TransactionReconClaims.Edit': 'Transaction Reconcile Update',
    'Permissions.TransactionReconClaims.Delete': 'Transaction Reconcile Delete',
  }
  static paymentRegisterType = {
    1: 'Cash Account',
    2: 'Bank Account'
  }

  static DocStatus = {
    0: {value: 'Draft', viewValue: 'Draft'},
    1: {value: 'Rejected', viewValue: 'Rejected'},
    2: {value: 'Unpaid', viewValue: 'Approved'},
    3: {value: 'Partial', viewValue: 'Partial'},
    4: {value: 'Paid', viewValue: 'Paid'},
    5: {value: 'Submitted', viewValue: 'Submitted'},
    6: {value: 'Reviewed', viewValue: 'Reviewed'}
  }

  static workflowStates = [
    // {viewValue: 'Draft',  value: 'Draft', id: 0 },
    // { value: 'Cancelled', id: 1 },
    {viewValue: 'Approved', value: 'Unpaid', id: 2},
    // { value: 'Partial', id: 3 },
    // { value: 'Paid', id: 4 },
    {viewValue: 'Submitted', value: 'Submitted', id: 5},
    {viewValue: 'Reviewed', value: 'Reviewed', id: 6},
  ]

  static Documents = [
    {value: 'Payment', id: DocType.Payment, route: 'voucher'},
    {value: 'Receipt', id: DocType.Receipt, route: 'receipt'},
    {value: 'Credit Note', id: DocType.CreditNote},
    {value: 'Debit Note', id: DocType.DebitNote},
    {value: 'Invoice', id: DocType.Invoice},
    {value: 'Bill', id: DocType.Bill},
    {value: 'Journal Voucher', id: DocType.JournalEntry},
    {value: 'purchase Order', id: DocType.PurchaseOrder},
    {value: 'sales Order', id: DocType.SalesOrder},
    {value: 'Goods Receiving Note', id: DocType.GRN},
    {value: 'Goods Dispatch Note', id: DocType.GDN},
    {value: 'Inventory Adjustment', id: DocType.InventoryAdjustment}
  ]

  static DocTypeValue = {
    0: 'Payment',
    1: 'CreditNote',
    2: 'DebitNote',
    3: 'Invoice',
    4: 'Bill',
    5: 'JournalEntry',
    6: 'BankAccount',
    7: 'CashAccount',
    8: 'PurchaseOrder',
    9: 'SalesOrder',
    10: 'GRN',
    11: 'GDN',
    12: 'InventoryAdjustment',
    13: 'Quotation',
    14: 'Requisition',
    15: 'Receipt',
    16: 'PayrollTransaction',
    17: 'PayrollPayment'
  }

  static filterStatus = [
    {value: 'Draft', id: 0},
    {value: 'Rejected', id: 1},
    {value: 'Unpaid', id: 2},
    {value: 'Partial', id: 3},
    {value: 'Paid', id: 4},
    {value: 'Submitted', id: 5},
    {value: 'Reviewed', id: 6},
  ];

}
