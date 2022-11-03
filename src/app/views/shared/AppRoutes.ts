export const APP_ROUTES = {

  // AUTH
  AUTH: 'auth',

  // DASHBOARD
  BUILDER: 'builder',
  DASHBOARD: 'dashboard',

  // ACCESS MANAGEMENT
  ACCESS_MANAGEMENT: 'access-management',

  // FINANCE
  BANK_ACCOUNT: 'bank-account',
  BANK_RECONCILIATION: 'bank-reconciliation',
  BANK_STATEMENT: 'bank-statement',
  CASH_ACCOUNT: 'cash-account',
  CHART_OF_ACCOUNT: 'chart-of-account',
  JOURNAL_ENTRY: 'journal-entry',
  PAYMENT: 'payment',

  // INVENTORY
  DISPATCH_NOTE: 'dispatch-note',
  GOODS_RECEIVED_NOTE: 'goods-received-note',
  INVENTORY_ADJUSTMENT: 'inventory-adjustment',
  STOCK: 'stock',

  // PROCUREMENT
  PURCHASE_REQUISITION: 'purchase-requisition',
  QUOTATION: 'quotation',

  // PROFILING
  BUSINESS_PARTNER: 'business-partner',
  CATEGORY: 'category',
  DEPARTMENT: 'department',
  LOCATION: 'location',
  ORGANIZATION: 'organization',
  PRODUCT: 'product',
  WAREHOUSE: 'warehouse',

  // PURCHASE
  DEBIT_NOTE: 'debit-note',
  BILL: 'vendor-bill',
  PURCHASE_ORDER: 'purchase-order',

  // REPORT
  REPORT: 'report',

  // SALES
  CREDIT_NOTE: 'credit-note',
  INVOICE: 'invoice',
  SALES_ORDER: 'sales-order',

  // WORKFLOW
  WORKFLOW: 'workflow',

  // STATUS
  STATUS: 'status'
}

export const CRUD_ROUTES = {
  CREATE: 'create',
  LIST: 'list',
  EDIT: 'edit/:id',
  DETAILS: 'details/:id',
  PRINT: 'print/:id',
  AGING_REPORT: 'aging-report'
}

// AUTH SECTION
export const AUTH = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'fp',
  NEW_PASSWORD: 'np',
}

// ACCESS_MANAGEMENT SECTION
export const ACCESS_MANAGEMENT = {
  USER_LIST: 'users',
  CREATE_USER: 'users/create',
  ROLE_LIST: 'roles',
  CREATE_ROLE: 'roles/create',
  CHANGE_PASSWORD: 'users/change-password',
}

// FINANCE SECTION
export const BANK_ACCOUNT = {
  LIST: APP_ROUTES.BANK_ACCOUNT + '/' + CRUD_ROUTES.LIST
}

export const BANK_RECONCILIATION = {
  LIST: APP_ROUTES.BANK_RECONCILIATION + '/' + CRUD_ROUTES.LIST
}

export const BANK_STATEMENT = {
  LIST: APP_ROUTES.BANK_STATEMENT + '/' + CRUD_ROUTES.LIST,
  CREATE: APP_ROUTES.BANK_STATEMENT + '/' + CRUD_ROUTES.CREATE,
  ID_BASED_ROUTE(route: string, id: number) {
    return APP_ROUTES.BANK_STATEMENT + '/' + route + '/' + id
  }
}

export const CASH_ACCOUNT = {
  LIST: APP_ROUTES.CASH_ACCOUNT + '/' + CRUD_ROUTES.LIST
}

export const CHART_OF_ACCOUNT = {
  LIST: APP_ROUTES.CHART_OF_ACCOUNT + '/' + CRUD_ROUTES.LIST,
}

export const JOURNAL_ENTRY = {
  LIST: APP_ROUTES.JOURNAL_ENTRY + '/' + CRUD_ROUTES.LIST,
  CREATE: APP_ROUTES.JOURNAL_ENTRY + '/' + CRUD_ROUTES.CREATE,

  EDIT: APP_ROUTES.JOURNAL_ENTRY + '/edit/',          //
  DETAIL: APP_ROUTES.JOURNAL_ENTRY + '/detail/',      //  JOURNAL_ENTRY.EDIT + this.journalEntry.id
  PRINT: APP_ROUTES.JOURNAL_ENTRY + '/print/',        //

  // OR
  ID_BASED_ROUTE(route: string, id: number) {               // JOURNAL_ENTRY.ID_BASED_ROUTE('edit' , this.journalEntry.id)
    return APP_ROUTES.JOURNAL_ENTRY + '/' + route + '/' + id
  }
}

export const PAYMENT = {
  CONDITIONAL_ROUTE(condition) {
    const route = '/' + APP_ROUTES.PAYMENT + `/${condition}/`
    return route
  },
  // LIST: APP_ROUTES.PAYMENT + '/' + CRUD_ROUTES.LIST,
  ID_BASED_ROUTE(route: string, id: number) {
    return route + '/' + id
  }
}


// INVENTORY SECTION
export const DISPATCH_NOTE = {
  LIST: APP_ROUTES.DISPATCH_NOTE + '/' + CRUD_ROUTES.LIST,
  CREATE: APP_ROUTES.DISPATCH_NOTE + '/' + CRUD_ROUTES.CREATE,
  ID_BASED_ROUTE(route: string, id: number) {
    return APP_ROUTES.DISPATCH_NOTE + '/' + route + '/' + id
  }
}

export const GOODS_RECEIVED_NOTE = {
  LIST: APP_ROUTES.GOODS_RECEIVED_NOTE + '/' + CRUD_ROUTES.LIST,
  CREATE: APP_ROUTES.GOODS_RECEIVED_NOTE + '/' + CRUD_ROUTES.CREATE,
  ID_BASED_ROUTE(route: string, id: number) {
    return APP_ROUTES.GOODS_RECEIVED_NOTE + '/' + route + '/' + id
  }
}

export const INVENTORY_ADJUSTMENT = {
  LIST: APP_ROUTES.INVENTORY_ADJUSTMENT + '/' + CRUD_ROUTES.LIST,
  CREATE: APP_ROUTES.INVENTORY_ADJUSTMENT + '/' + CRUD_ROUTES.CREATE,
  ID_BASED_ROUTE(route: string, id: number) {
    return APP_ROUTES.INVENTORY_ADJUSTMENT + '/' + route + '/' + id
  }
}

export const STOCK = {
  LIST: APP_ROUTES.STOCK + '/' + CRUD_ROUTES.LIST,
}


// PROCUREMENT SECTION
export const PURCHASE_REQUISITION = {
  LIST: APP_ROUTES.PURCHASE_REQUISITION + '/' + CRUD_ROUTES.LIST,
  CREATE: APP_ROUTES.PURCHASE_REQUISITION + '/' + CRUD_ROUTES.CREATE,
  ID_BASED_ROUTE(route: string, id: number) {
    return APP_ROUTES.PURCHASE_REQUISITION + '/' + route + '/' + id
  }
}

export const QUOTATION = {
  // LIST: APP_ROUTES.QUOTATION + '/' + CRUD_ROUTES.LIST,
  // CREATE: APP_ROUTES.QUOTATION + '/' + CRUD_ROUTES.CREATE,
  // ID_BASED_ROUTE (route: string , id: number) {
  //   return APP_ROUTES.QUOTATION + '/' + route + '/' + id
  // }
}


// PROFILING SECTION
export const BUSINESS_PARTNER = {
  LIST: APP_ROUTES.BUSINESS_PARTNER + '/' + CRUD_ROUTES.LIST,
}

export const CATEGORY = {
  LIST: APP_ROUTES.CATEGORY + '/' + CRUD_ROUTES.LIST,
}

export const DEPARTMENT = {
  LIST: APP_ROUTES.DEPARTMENT + '/' + CRUD_ROUTES.LIST
}

export const LOCATION = {
  LIST: APP_ROUTES.LOCATION + '/' + CRUD_ROUTES.LIST
}

export const ORGANIZATION = {
  LIST: APP_ROUTES.ORGANIZATION + '/' + CRUD_ROUTES.LIST
}

export const PRODUCT = {
  LIST: APP_ROUTES.PRODUCT + '/' + CRUD_ROUTES.LIST
}

export const WAREHOUSE = {
  LIST: APP_ROUTES.WAREHOUSE + '/' + CRUD_ROUTES.LIST
}

// PURCHASE SECTION
export const DEBIT_NOTE = {
  LIST: APP_ROUTES.DEBIT_NOTE + '/' + CRUD_ROUTES.LIST,
  CREATE: APP_ROUTES.DEBIT_NOTE + '/' + CRUD_ROUTES.CREATE,
  ID_BASED_ROUTE(route: string, id: number) {
    return APP_ROUTES.DEBIT_NOTE + '/' + route + '/' + id
  }
}

export const PURCHASE_ORDER = {
  LIST: APP_ROUTES.PURCHASE_ORDER + '/' + CRUD_ROUTES.LIST,
  CREATE: APP_ROUTES.PURCHASE_ORDER + '/' + CRUD_ROUTES.CREATE,
  ID_BASED_ROUTE(route: string, id: number) {
    return APP_ROUTES.PURCHASE_ORDER + '/' + route + '/' + id
  }
}

export const BILL = {
  LIST: APP_ROUTES.BILL + '/' + CRUD_ROUTES.LIST,
  CREATE: APP_ROUTES.BILL + '/' + CRUD_ROUTES.CREATE,
  AGING_REPORT: APP_ROUTES.BILL + '/aging-report',
  ID_BASED_ROUTE(route: string, id: number) {
    return APP_ROUTES.BILL + '/' + route + '/' + id
  }
}

// REPORT SECTION
export const REPORT = {
  GENERAL_LEDGER: 'ledger',
  TRIAL_BALANCE: 'trial-balance',
  BALANCE_SHEET: 'balance-sheet',
  PROFIT_N_LOSS: 'profit-n-loss',
  PRINT: 'print'
}

// SALES SECTION
export const CREDIT_NOTE = {
  LIST: APP_ROUTES.CREDIT_NOTE + '/' + CRUD_ROUTES.LIST,
  CREATE: APP_ROUTES.CREDIT_NOTE + '/' + CRUD_ROUTES.CREATE,
  ID_BASED_ROUTE(route: string, id: number) {
    return APP_ROUTES.CREDIT_NOTE + '/' + route + '/' + id
  }
}

export const INVOICE = {
  LIST: APP_ROUTES.INVOICE + '/' + CRUD_ROUTES.LIST,
  CREATE: APP_ROUTES.INVOICE + '/' + CRUD_ROUTES.CREATE,
  AGING_REPORT: APP_ROUTES.INVOICE + '/aging-report',
  ID_BASED_ROUTE(route: string, id: number) {
    return APP_ROUTES.INVOICE + '/' + route + '/' + id
  }
}

export const SALES_ORDER = {
  LIST: APP_ROUTES.SALES_ORDER + '/' + CRUD_ROUTES.LIST,
  CREATE: APP_ROUTES.SALES_ORDER + '/' + CRUD_ROUTES.CREATE,
  ID_BASED_ROUTE(route: string, id: number) {
    return APP_ROUTES.SALES_ORDER + '/' + route + '/' + id
  }
}

// WORKFLOW SECTION
export const WORKFLOW = {
  LIST: APP_ROUTES.WORKFLOW + '/' + CRUD_ROUTES.LIST,
  CREATE: APP_ROUTES.WORKFLOW + '/' + CRUD_ROUTES.CREATE,
  ID_BASED_ROUTE(route: string, id: number) {
    return APP_ROUTES.WORKFLOW + '/' + route + '/' + id
  }
}

export const STATUS = {
  LIST: APP_ROUTES.STATUS + '/' + CRUD_ROUTES.LIST,
}

