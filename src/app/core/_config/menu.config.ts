import {
  ACCESS_MANAGEMENT,
  APP_ROUTES,
  BANK_ACCOUNT,
  BANK_RECONCILIATION,
  BANK_STATEMENT,
  BILL,
  BUSINESS_PARTNER,
  CASH_ACCOUNT,
  CATEGORY,
  CHART_OF_ACCOUNT,
  CREDIT_NOTE,
  CRUD_ROUTES,
  DEBIT_NOTE,
  DEPARTMENT,
  DISPATCH_NOTE,
  GOODS_RECEIVED_NOTE,
  INVENTORY_ADJUSTMENT,
  INVOICE,
  JOURNAL_ENTRY,
  LOCATION,
  PAYMENT,
  PRODUCT,
  PURCHASE_ORDER,
  PURCHASE_REQUISITION,
  REPORT,
  SALES_ORDER,
  STATUS,
  STOCK,
  WAREHOUSE,
  WORKFLOW
} from 'src/app/views/shared/AppRoutes';
import {Permissions} from '../../views/shared/AppEnum'

export class MenuConfig {
  public defaults: any = {
    header: {
      self: {},
      items: [
        {
          title: 'Dashboards',
          root: true,
          alignment: 'left',
          page: '/' + APP_ROUTES.DASHBOARD,
          translate: 'MENU.DASHBOARD',
        },
        {
          title: 'Add Journal Entry',
          root: true,
          alignment: 'left',
          page: '/' + JOURNAL_ENTRY.CREATE
        },
        {
          title: 'General Ledger',
          root: true,
          alignment: 'left',
          page: '/' + APP_ROUTES.REPORT + '/' + REPORT.GENERAL_LEDGER
        },
      ]
    },
    aside: {
      self: {},
      items: [
        //region General
        {
          title: 'Dashboard',
          root: true,
          icon: 'flaticon2-architecture-and-city',
          page: '/' + APP_ROUTES.DASHBOARD,
          translate: 'MENU.DASHBOARD',
          bullet: 'dot',
        },

        // {
        //   title: 'Layout Builder',
        //   root: true,
        //   icon: 'flaticon2-expand',
        //   page: '/builder'
        // },
        // {
        // 	title: 'Client', // <= Title of the page
        // 	desc: 'Some my description goes here', // <= Description of the page
        // 	root: true,
        // 	page: '/list-client', // <= URL
        // 	icon: 'flaticon2-avatar' // <= Choose the icon class
        // },
        // // { section: 'User Management' },
        // {
        //   title: 'User Management',
        //   bullet: 'dot',
        //   icon: 'flaticon2-avatar',
        //   submenu: [
        //     {
        //       title: 'Roles', // <= Title of the page
        //       page: '/user-management/roles', // <= URL
        //     },
        //     {
        //       title: 'Users', // <= Title of the page
        //       page: '/user-management/users', // <= URL
        //     },
        //   ]
        // },

        {
          title: 'Access Management',
          bullet: 'dot',
          icon: 'flaticon2-avatar',
          permission: [
            Permissions.AUTH_CREATE,
            Permissions.AUTH_VIEW,
            Permissions.AUTH_EDIT,
            Permissions.AUTH_DELETE,
          ],
          submenu: [
            {
              title: 'Roles', // <= Title of the page
              page: '/' + APP_ROUTES.ACCESS_MANAGEMENT + '/' + ACCESS_MANAGEMENT.ROLE_LIST, // <= URL
              permission: [
                Permissions.AUTH_CREATE,
                Permissions.AUTH_VIEW,
                Permissions.AUTH_EDIT,
                Permissions.AUTH_DELETE,
              ],
            },
            {
              title: 'Users', // <= Title of the page
              page: '/' + APP_ROUTES.ACCESS_MANAGEMENT + '/' + ACCESS_MANAGEMENT.USER_LIST, // <= URL
              permission: [
                Permissions.AUTH_CREATE,
                Permissions.AUTH_VIEW,
                Permissions.AUTH_EDIT,
                Permissions.AUTH_DELETE,
              ],
            },
          ]
        },

        // { section: 'profiling' },
        {
          title: 'Profiling',
          bullet: 'dot',
          icon: 'flaticon2-grids',
          permission: [
            Permissions.BUSINESSPARTNER_VIEW,
            Permissions.BUSINESSPARTNER_CREATE,
            Permissions.BUSINESSPARTNER_EDIT,
            Permissions.BUSINESSPARTNER_DELETE,
            Permissions.CATEGORIES_VIEW,
            Permissions.CATEGORIES_CREATE,
            Permissions.CATEGORIES_EDIT,
            Permissions.CATEGORIES_DELETE,
            Permissions.PRODUCT_VIEW,
            Permissions.PRODUCT_CREATE,
            Permissions.PRODUCT_EDIT,
            Permissions.PRODUCT_DELETE,
            Permissions.WAREHOUSE_VIEW,
            Permissions.WAREHOUSE_CREATE,
            Permissions.WAREHOUSE_EDIT,
            Permissions.WAREHOUSE_DELETE,
            Permissions.LOCATION_VIEW,
            Permissions.LOCATION_CREATE,
            Permissions.LOCATION_EDIT,
            Permissions.LOCATION_DELETE,
            Permissions.DEPARTMENTS_VIEW,
            Permissions.DEPARTMENTS_CREATE,
            Permissions.DEPARTMENTS_EDIT,
            Permissions.DEPARTMENTS_DELETE,
            Permissions.ORGANIZATION_VIEW,
            Permissions.ORGANIZATION_CREATE,
            Permissions.ORGANIZATION_EDIT,
            Permissions.ORGANIZATION_DELETE
          ],
          submenu: [
            // {
            // 	title: 'Client',
            //   page: '/client/list',
            // },
            /*{
              title: 'Organization',
              page: '/' + ORGANIZATION.LIST,
              permission: [
                Permissions.ORGANIZATION_VIEW,
                Permissions.ORGANIZATION_CREATE,
                Permissions.ORGANIZATION_EDIT,
                Permissions.ORGANIZATION_DELETE
              ]
            },*/
            {
              title: 'Department',
              page: '/' + DEPARTMENT.LIST,
              permission: [
                Permissions.DEPARTMENTS_VIEW,
                Permissions.DEPARTMENTS_CREATE,
                Permissions.DEPARTMENTS_EDIT,
                Permissions.DEPARTMENTS_DELETE
              ]
            },
            {
              title: 'Warehouse',
              page: '/' + WAREHOUSE.LIST,
              permission: [
                Permissions.WAREHOUSE_VIEW,
                Permissions.WAREHOUSE_CREATE,
                Permissions.WAREHOUSE_EDIT,
                Permissions.WAREHOUSE_DELETE
              ]
            },
            {
              title: 'Location',
              page: '/' + LOCATION.LIST,
              permission: [
                Permissions.LOCATION_VIEW,
                Permissions.LOCATION_CREATE,
                Permissions.LOCATION_EDIT,
                Permissions.LOCATION_DELETE
              ]
            },
            {
              title: 'Business Partner', // <= Title of the page
              page: '/' + BUSINESS_PARTNER.LIST, // <= URL
              permission: [
                Permissions.BUSINESSPARTNER_VIEW,
                Permissions.BUSINESSPARTNER_CREATE,
                Permissions.BUSINESSPARTNER_EDIT,
                Permissions.BUSINESSPARTNER_DELETE
              ]
            },
            {
              title: 'Category',
              page: '/' + CATEGORY.LIST,
              permission: [
                Permissions.CATEGORIES_VIEW,
                Permissions.CATEGORIES_CREATE,
                Permissions.CATEGORIES_EDIT,
                Permissions.CATEGORIES_DELETE
              ]
            },
            {
              title: 'Product',
              page: '/' + PRODUCT.LIST,
              permission: [
                Permissions.PRODUCT_VIEW,
                Permissions.PRODUCT_CREATE,
                Permissions.PRODUCT_EDIT,
                Permissions.PRODUCT_DELETE
              ]
            },
          ]
        },
        //finance Portion
        {
          title: 'Finance',
          bullet: 'dot',
          icon: 'flaticon-notepad',
          permission: [
            Permissions.JOURNALENTRY_VIEW,
            Permissions.JOURNALENTRY_CREATE,
            Permissions.JOURNALENTRY_EDIT,
            Permissions.JOURNALENTRY_DELETE,
            Permissions.JOURNALENTRY_REVIEW,
            Permissions.JOURNALENTRY_APPROVE,

            // Payment Voucher
            Permissions.PAYMENT_VIEW,
            Permissions.PAYMENT_CREATE,
            Permissions.PAYMENT_EDIT,
            Permissions.PAYMENT_DELETE,
            Permissions.PAYMENT_REVIEW,
            Permissions.PAYMENT_APPROVE,

            // Payment Receipt
            Permissions.RECEIPT_CREATE,
            Permissions.RECEIPT_VIEW,
            Permissions.RECEIPT_EDIT,
            Permissions.RECEIPT_DELETE,

            Permissions.BANKSTATEMENT_VIEW,
            Permissions.BANKSTATEMENT_CREATE,
            Permissions.BANKSTATEMENT_EDIT,
            Permissions.BANKSTATEMENT_DELETE,
            Permissions.BANKACCOUNT_VIEW,
            Permissions.BANKACCOUNT_CREATE,
            Permissions.BANKACCOUNT_EDIT,
            Permissions.BANKACCOUNT_DELETE,
            Permissions.CASHACCOUNT_VIEW,
            Permissions.CASHACCOUNT_CREATE,
            Permissions.CASHACCOUNT_EDIT,
            Permissions.CASHACCOUNT_DELETE,
            Permissions.LEVEL3_VIEW,
            Permissions.LEVEL3_CREATE,
            Permissions.LEVEL3_EDIT,
            Permissions.LEVEL3_DELETE,
            Permissions.LEVEL4_VIEW,
            Permissions.LEVEL4_CREATE,
            Permissions.LEVEL4_EDIT,
            Permissions.LEVEL4_DELETE,
            Permissions.CHARTOFACCOUNT_VIEW,
            Permissions.BANK_RECON_VIEW,
            Permissions.BANK_RECON_CREATE
          ],
          submenu: [
            {
              title: 'Cash Account',
              page: '/' + CASH_ACCOUNT.LIST,
              permission: [
                Permissions.CASHACCOUNT_VIEW,
                Permissions.CASHACCOUNT_CREATE,
                Permissions.CASHACCOUNT_EDIT,
                Permissions.CASHACCOUNT_DELETE
              ]
            },
            {
              title: 'Bank Account',
              page: '/' + BANK_ACCOUNT.LIST,
              permission: [
                Permissions.BANKACCOUNT_VIEW,
                Permissions.BANKACCOUNT_CREATE,
                Permissions.BANKACCOUNT_EDIT,
                Permissions.BANKACCOUNT_DELETE
              ]
            },
            {
              title: 'Payment Voucher',
              page: PAYMENT.CONDITIONAL_ROUTE('voucher') + CRUD_ROUTES.LIST,
              permission: [
                Permissions.PAYMENT_VIEW,
                Permissions.PAYMENT_CREATE,
                Permissions.PAYMENT_EDIT,
                Permissions.PAYMENT_DELETE,
                Permissions.PAYMENT_REVIEW,
                Permissions.PAYMENT_APPROVE,
              ]
            },
            {
              title: 'Receipt Voucher',
              page: PAYMENT.CONDITIONAL_ROUTE('receipt') + CRUD_ROUTES.LIST,
              permission: [
                Permissions.RECEIPT_CREATE,
                Permissions.RECEIPT_VIEW,
                Permissions.RECEIPT_EDIT,
                Permissions.RECEIPT_DELETE,
              ]
            },
            {
              title: 'Journal Entry',
              page: '/' + JOURNAL_ENTRY.LIST,
              permission: [
                Permissions.JOURNALENTRY_VIEW,
                Permissions.JOURNALENTRY_CREATE,
                Permissions.JOURNALENTRY_EDIT,
                Permissions.JOURNALENTRY_DELETE,
                Permissions.JOURNALENTRY_REVIEW,
                Permissions.JOURNALENTRY_APPROVE,
              ]
            },
            {
              title: 'Bank Statement',
              page: '/' + BANK_STATEMENT.LIST,
              permission: [
                Permissions.BANKSTATEMENT_VIEW,
                Permissions.BANKSTATEMENT_CREATE,
                Permissions.BANKSTATEMENT_EDIT,
                Permissions.BANKSTATEMENT_DELETE,
              ]
            },
            {
              title: 'Bank Reconciliation',
              page: '/' + BANK_RECONCILIATION.LIST,
              permission: [
                Permissions.BANK_RECON_VIEW,
                Permissions.BANK_RECON_CREATE
              ]
            },
            {
              title: 'Chart Of Account',
              page: '/' + CHART_OF_ACCOUNT.LIST,
              permission: [
                Permissions.LEVEL3_VIEW,
                Permissions.LEVEL3_CREATE,
                Permissions.LEVEL3_EDIT,
                Permissions.LEVEL3_DELETE,
                Permissions.LEVEL4_VIEW,
                Permissions.LEVEL4_CREATE,
                Permissions.LEVEL4_EDIT,
                Permissions.LEVEL4_DELETE,
                Permissions.CHARTOFACCOUNT_VIEW
              ]
            },
          ]
        },
        // { section: 'sales' },
        {
          title: 'Sales',
          bullet: 'dot',
          icon: 'flaticon2-delivery-package',
          permission: [
            Permissions.INVOICE_VIEW,
            Permissions.INVOICE_CREATE,
            Permissions.INVOICE_EDIT,
            Permissions.INVOICE_DELETE,
            Permissions.INVOICE_REVIEW,
            Permissions.INVOICE_APPROVE,
            Permissions.CREDITNOTE_VIEW,
            Permissions.CREDITNOTE_CREATE,
            Permissions.CREDITNOTE_EDIT,
            Permissions.CREDITNOTE_DELETE,
            Permissions.CREDITNOTE_REVIEW,
            Permissions.CREDITNOTE_APPROVE,
            Permissions.SALESORDER_VIEW,
            Permissions.SALESORDER_CREATE,
            Permissions.SALESORDER_EDIT,
            Permissions.SALESORDER_DELETE,
            Permissions.SALESORDER_REVIEW,
            Permissions.SALESORDER_APPROVE,
          ],
          submenu: [
            {
              title: 'Sales Order',
              page: '/' + SALES_ORDER.LIST,
              permission: [
                Permissions.SALESORDER_VIEW,
                Permissions.SALESORDER_CREATE,
                Permissions.SALESORDER_EDIT,
                Permissions.SALESORDER_DELETE,
                Permissions.SALESORDER_REVIEW,
                Permissions.SALESORDER_APPROVE,
              ]
            },
            {
              title: 'Invoice',
              page: '/' + INVOICE.LIST,
              permission: [
                Permissions.INVOICE_VIEW,
                Permissions.INVOICE_CREATE,
                Permissions.INVOICE_EDIT,
                Permissions.INVOICE_DELETE,
                Permissions.INVOICE_REVIEW,
                Permissions.INVOICE_APPROVE,
              ]
            },
            {
              title: 'Credit Note',
              page: '/' + CREDIT_NOTE.LIST,
              permission: [
                Permissions.CREDITNOTE_VIEW,
                Permissions.CREDITNOTE_CREATE,
                Permissions.CREDITNOTE_EDIT,
                Permissions.CREDITNOTE_DELETE,
                Permissions.CREDITNOTE_REVIEW,
                Permissions.CREDITNOTE_APPROVE,
              ]
            },
          ]
        },
        // { section: 'purchase' },
        {
          title: 'Purchase',
          bullet: 'dot',
          icon: 'flaticon2-shopping-cart',
          permission: [
            Permissions.BILL_VIEW,
            Permissions.BILL_CREATE,
            Permissions.BILL_EDIT,
            Permissions.BILL_DELETE,
            Permissions.BILL_REVIEW,
            Permissions.BILL_APPROVE,
            Permissions.DEBITNOTE_VIEW,
            Permissions.DEBITNOTE_CREATE,
            Permissions.DEBITNOTE_EDIT,
            Permissions.DEBITNOTE_DELETE,
            Permissions.DEBITNOTE_REVIEW,
            Permissions.DEBITNOTE_APPROVE,
            Permissions.PURCHASEORDER_VIEW,
            Permissions.PURCHASEORDER_CREATE,
            Permissions.PURCHASEORDER_EDIT,
            Permissions.PURCHASEORDER_DELETE,
            Permissions.PURCHASEORDER_REVIEW,
            Permissions.PURCHASEORDER_APPROVE,
          ],
          submenu: [
            {
              title: 'Purchase Order',
              page: '/' + PURCHASE_ORDER.LIST,
              // permission: [
              //   Permissions.PURCHASEORDER_VIEW,
              //   Permissions.PURCHASEORDER_CREATE,
              //   Permissions.PURCHASEORDER_EDIT,
              //   Permissions.PURCHASEORDER_DELETE,
              //   Permissions.PURCHASEORDER_REVIEW,
              //   Permissions.PURCHASEORDER_APPROVE,
              // ]
            },
            {
              title: 'Requisition',
              page: '/' + PURCHASE_REQUISITION.LIST,
              // permission: [
              //   Permissions.PURCHASEORDER_VIEW,
              //   Permissions.PURCHASEORDER_CREATE,
              //   Permissions.PURCHASEORDER_EDIT,
              //   Permissions.PURCHASEORDER_DELETE,
              //   Permissions.PURCHASEORDER_REVIEW,
              //   Permissions.PURCHASEORDER_APPROVE,
              // ]
            },
            {
              title: 'Vendor Bill',
              page: '/' + BILL.LIST,
              permission: [
                Permissions.BILL_VIEW,
                Permissions.BILL_CREATE,
                Permissions.BILL_EDIT,
                Permissions.BILL_DELETE,
                Permissions.BILL_REVIEW,
                Permissions.BILL_APPROVE,
              ]
            },
            {
              title: 'Debit Note',
              page: '/' + DEBIT_NOTE.LIST,
              permission: [
                Permissions.DEBITNOTE_VIEW,
                Permissions.DEBITNOTE_CREATE,
                Permissions.DEBITNOTE_EDIT,
                Permissions.DEBITNOTE_DELETE,
                Permissions.DEBITNOTE_REVIEW,
                Permissions.DEBITNOTE_APPROVE,
              ]
            },
          ]
        },

        // { section: 'Inventory' },
        {
          title: 'Inventory',
          bullet: 'dot',
          icon: 'flaticon-open-box',
          /*permission: [
            Permissions.GRN_VIEW,
            Permissions.GRN_CREATE,
            Permissions.GRN_EDIT,
            Permissions.GRN_DELETE,
            Permissions.GDN_VIEW,
            Permissions.GDN_CREATE,
            Permissions.GDN_EDIT,
            Permissions.GDN_DELETE,
          ],*/
          submenu: [
            {
              title: 'Stock',
              page: '/' + STOCK.LIST,
            },
            {
              title: 'inventory-adjustment',
              page: '/' + INVENTORY_ADJUSTMENT.LIST,
            },
            {
              title: 'Goods Received Note',
              page: '/' + GOODS_RECEIVED_NOTE.LIST,
              /*permission: [
                Permissions.GRN_VIEW,
                Permissions.GRN_CREATE,
                Permissions.GRN_EDIT,
                Permissions.GRN_DELETE
              ],*/
            },
            {
              title: 'Goods Dispatch Note',
              page: '/' + DISPATCH_NOTE.LIST,
              /*permission: [
                Permissions.GDN_VIEW,
                Permissions.GDN_CREATE,
                Permissions.GDN_EDIT,
                Permissions.GDN_DELETE
              ],*/
            },
          ]
        },
        //endregion

        //region Report
        {
          title: 'Report',
          bullet: 'dot',
          icon: 'flaticon2-graphic',
          permission: [
            Permissions.GENERALLEDGER_VIEW,
            Permissions.TRIALBALANCE_VIEW,
            Permissions.BALANCESHEET_VIEW,
            Permissions.PROFITLOSS_VIEW
          ],
          submenu: [
            {
              title: 'General Ledger', // <= Title of the page
              page: '/' + APP_ROUTES.REPORT + '/' + REPORT.GENERAL_LEDGER, // <= URL
              permission: [
                Permissions.GENERALLEDGER_VIEW,
              ]
            },
            {
              title: 'Balance Sheet',
              page: '/' + APP_ROUTES.REPORT + '/' + REPORT.BALANCE_SHEET,
              permission: [
                Permissions.BALANCESHEET_VIEW,
              ]
            },
            {
              title: 'Profit & Loss',
              page: '/' + APP_ROUTES.REPORT + '/' + REPORT.PROFIT_N_LOSS,
              permission: [
                Permissions.PROFITLOSS_VIEW,
              ]
            },
            {
              title: 'Trial Balance',
              page: '/' + APP_ROUTES.REPORT + '/' + REPORT.TRIAL_BALANCE,
              permission: [
                Permissions.TRIALBALANCE_VIEW,
              ]
            },
          ]
        },
        // {section: 'Workflow'},
        {
          title: 'Workflow',
          bullet: 'dot',
          icon: 'flaticon-map',
          permission: [
            Permissions.WORKFLOW_CREATE,
            Permissions.WORKFLOW_VIEW,
            Permissions.WORKFLOW_EDIT,
            Permissions.WORKFLOW_DELETE,
            Permissions.STATUS_CREATE,
            Permissions.STATUS_EDIT,
            Permissions.STATUS_VIEW,
            Permissions.STATUS_DELETE,
          ],
          submenu: [
            {
              title: 'Workflows',
              page: '/' + WORKFLOW.LIST,
              permission: [
                Permissions.WORKFLOW_CREATE,
                Permissions.WORKFLOW_VIEW,
                Permissions.WORKFLOW_EDIT,
                Permissions.WORKFLOW_DELETE,
              ]
            },
            {
              title: 'Status',
              page: '/' + STATUS.LIST,
              permission: [
                Permissions.STATUS_CREATE,
                Permissions.STATUS_EDIT,
                Permissions.STATUS_VIEW,
                Permissions.STATUS_DELETE,
              ]
            }
          ]
        },
        //endregion

        // {
        //   title: 'Dashboard',
        //   root: true,
        //   icon: 'flaticon2-architecture-and-city',
        //   page: '/' + APP_ROUTES.DASHBOARD,
        //   translate: 'MENU.DASHBOARD',
        //   bullet: 'dot',
        // },
      ]
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
