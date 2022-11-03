import { Injector } from '@angular/core';
import { PermissionService } from '../pages/auth/service/permission.service';
import { InvoiceService } from '../pages/sales/invoice/services/invoice.service';
import { CreditNoteService } from '../pages/sales/credit-note/service/credit-note.service';
import { SaleOrderService } from '../pages/sales/sales-order/service/sale-order.service';
import { DebitNoteService } from '../pages/purchase/debit-note/service/debit-note.service';
import { ProductService } from '../pages/profiling/product/service/product.service';
import { VendorBillService } from '../pages/purchase/vendorBill/services/vendor-bill.service';
import { PurchaseOrderService } from '../pages/purchase/purchase-order/service/purchase-order.service';
import { WarehouseService } from '../pages/profiling/warehouse/services/warehouse.service';
import { LocationService } from '../pages/profiling/location/service/location.service';
import { DepartmentService } from '../pages/profiling/department/service/department.service';
import { CategoryService } from '../pages/profiling/category/service/category.service';
import { PaymentService } from '../pages/finance/payment/service/payment.service';
import { CashAccountService } from '../pages/finance/cash-account/service/cashAccount.service';
import { BankStatementService } from '../pages/finance/bank-statement/service/bank-statement.service';
import { BankAccountService } from '../pages/finance/bank-account/service/bankAccount.service';
import { JournalEntryService } from '../pages/finance/journalEntry/services/journal-entry.service';
import { BankReconciliationService } from '../pages/finance/bank-reconciliation/service/bank-reconciliation.service';
import { PurchaseRequisitionService } from '../pages/purchase/purchase-requisition/service/purchase-requisition.service';
import { GrnService } from '../pages/inventory/goods-received-note/service/grn.service';
import { DispatchNoteService } from '../pages/inventory/dispatch-note/service/dispatch-note.service';
import { PaginationHelperService } from '../store/pagination/pagination-helper.service';
import { DateHelperService } from './helpers/date-helper';
import { ServiceInjectorAngular } from './service-injector-angular';
import { DecodeTokenService } from './decode-token.service';
import { ValidatorService } from 'src/app/core/services/validator.service';

export abstract class ServiceInjectorLocal extends ServiceInjectorAngular {
  // Helper Servicies
  public permission: PermissionService
  public paginationHelper: PaginationHelperService
  public dateHelperService: DateHelperService
  public decodeService: DecodeTokenService
  public vs: ValidatorService
  // addButtonService: AddModalButtonService

  // ngxsService: NgxsCustomService

  // API Servicies
  invoiceService: InvoiceService;
  creditNoteService: CreditNoteService;
  salesOrderService: SaleOrderService;
  debitNoteService: DebitNoteService;
  productService: ProductService;
  billService: VendorBillService;
  purchaseOrderService: PurchaseOrderService;
  warehouseService: WarehouseService;
  locationService: LocationService;
  departmentService: DepartmentService;
  categoryService: CategoryService;
  paymentService: PaymentService;
  cashAccountService: CashAccountService;
  bankStatementService: BankStatementService;
  bankAccountService: BankAccountService;
  journalEntryService: JournalEntryService;
  bankReconService: BankReconciliationService;
  purchaseRequisitionService: PurchaseRequisitionService;
  grnService: GrnService;
  dispatchNoteService: DispatchNoteService;

  constructor(injector: Injector) {
    super(injector)
    // Inject Api Services
    this.permission = injector.get(PermissionService);
    this.paginationHelper = injector.get(PaginationHelperService);
    this.dateHelperService = injector.get(DateHelperService);
    this.decodeService = injector.get(DecodeTokenService)
    this.vs = injector.get(ValidatorService);

    this.invoiceService = injector.get(InvoiceService);
    this.creditNoteService = injector.get(CreditNoteService);
    this.salesOrderService = injector.get(SaleOrderService);
    this.debitNoteService = injector.get(DebitNoteService);
    this.productService = injector.get(ProductService);
    this.billService = injector.get(VendorBillService);
    this.purchaseOrderService = injector.get(PurchaseOrderService);
    this.warehouseService = injector.get(WarehouseService);
    this.locationService = injector.get(LocationService);
    this.departmentService = injector.get(DepartmentService);
    this.categoryService = injector.get(CategoryService);
    this.paymentService = injector.get(PaymentService);
    this.cashAccountService = injector.get(CashAccountService);
    this.bankStatementService = injector.get(BankStatementService);
    this.bankAccountService = injector.get(BankAccountService);
    this.journalEntryService = injector.get(JournalEntryService);
    this.bankReconService = injector.get(BankReconciliationService)
    this.purchaseRequisitionService = injector.get(PurchaseRequisitionService);
    this.grnService = injector.get(GrnService);
    this.dispatchNoteService = injector.get(DispatchNoteService);
    // this.addButtonService = injector.get(AddModalButtonService)
    // this.ngxsService = injector.get(NgxsCustomService)
  }
}
