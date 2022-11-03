import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountLevel4State } from 'src/app/core/shared-state/account-state/store/account-level4.state';

import { CityState } from 'src/app/core/shared-state/account-state/store/city.state';
import { CountryState } from 'src/app/core/shared-state/account-state/store/country.state';
import { StateState } from 'src/app/core/shared-state/account-state/store/state.state';
import { BankAccountService } from 'src/app/views/pages/finance/bank-account/service/bankAccount.service';
import { BankAccountState } from 'src/app/views/pages/finance/bank-account/store/bank-account.state';
import { ChartOfAccountService } from 'src/app/views/pages/finance/chat-of-account/service/chart-of-account.service';
import { BusinessPartnerService } from 'src/app/views/pages/profiling/business-partner/service/businessPartner.service';

import { BusinessPartnerState } from 'src/app/views/pages/profiling/business-partner/store/business-partner.state';
import { CategoryService } from 'src/app/views/pages/profiling/category/service/category.service';
import { CategoryState } from 'src/app/views/pages/profiling/category/store/category.state';
import { DepartmentService } from 'src/app/views/pages/profiling/department/service/department.service';
import { DepartmentState } from 'src/app/views/pages/profiling/department/store/department.state';
import { LocationService } from 'src/app/views/pages/profiling/location/service/location.service';
import { LocationState } from 'src/app/views/pages/profiling/location/store/location.state';
import { OrganizationService } from 'src/app/views/pages/profiling/organization/services/organization.service';
import { OrganizationState } from 'src/app/views/pages/profiling/organization/store/organization.state';
import { ProductService } from 'src/app/views/pages/profiling/product/service/product.service';
import { ProductState } from 'src/app/views/pages/profiling/product/store/product.state.state';
import { GetList } from 'src/app/views/pages/profiling/store/profiling.action';
import { WarehouseService } from 'src/app/views/pages/profiling/warehouse/services/warehouse.service';
import { WarehouseState } from 'src/app/views/pages/profiling/warehouse/store/warehouse.state';
import { CscService } from 'src/app/views/shared/csc.service';
import { PayableAccountState } from '../../../pages/finance/chat-of-account/store/payable-account.state';
import { AccountReceivablesState } from '../../../pages/finance/chat-of-account/store/account-receivables.state';
import { OtherAccountState } from '../../../pages/finance/chat-of-account/store/other-account.state';
import { Injectable } from '@angular/core';

@Injectable()
export class NgxsCustomService {

  // constructor
  constructor(
    // services
    public businessPartnerService: BusinessPartnerService,
    public categoryService: CategoryService,
    public chartOfAccountService: ChartOfAccountService,
    public departmentService: DepartmentService,
    public locationService: LocationService,
    public organizationService: OrganizationService,
    public productService: ProductService,
    public warehouseService: WarehouseService,
    public cscService: CscService,
    public bankAccountService: BankAccountService,
    public store: Store,
  ) {
  }

  // selector region start
  // Business Partner
  @Select(BusinessPartnerState.entities) businessPartners$: Observable<any>;
  @Select(BusinessPartnerState.isFetchCompleted) businessPartnerFetchCompleted$: Observable<any>;
  @Select(BusinessPartnerState.isLoading) businessPartnerIsLoading$: Observable<any>;


  // Business Partner Country
  @Select(CountryState.entities) countries$: Observable<any>;
  @Select(CountryState.isFetchCompleted) countryFetchCompleted$: Observable<any>;
  @Select(CountryState.isLoading) countryIsLoading$: Observable<any>;


  // Business Partner State
  @Select(StateState.entities) states$: Observable<any>;
  @Select(StateState.isFetchCompleted) stateFetchCompleted$: Observable<any>;
  @Select(StateState.isLoading) stateIsLoading$: Observable<any>;

  // Business Partner Cities
  @Select(CityState.entities) cities$: Observable<any>;
  @Select(CityState.isFetchCompleted) cityFetchCompleted$: Observable<any>;
  @Select(CityState.isLoading) cityIsLoading$: Observable<any>;

  // Level 4 Account Dropdown
  @Select(AccountLevel4State.entities) accountsLevel4$: Observable<any>;
  @Select(AccountLevel4State.isFetchCompleted) accountLevel4FetchCompleted$: Observable<any>;
  @Select(AccountLevel4State.isLoading) accountLevel4IsLoading$: Observable<any>;

  // Level 4 Account Payable
  @Select(PayableAccountState.entities) payableAccountsLevel4$: Observable<any>;
  @Select(PayableAccountState.isFetchCompleted) payableAccountLevel4FetchCompleted$: Observable<any>;
  @Select(PayableAccountState.isLoading) payableAccountLevel4IsLoading$: Observable<any>;

  // Level 4 Account Receivables
  @Select(AccountReceivablesState.entities) receivablesAccountsLevel4$: Observable<any>;
  @Select(AccountReceivablesState.isFetchCompleted) receivablesAccountLevel4FetchCompleted$: Observable<any>;
  @Select(AccountReceivablesState.isLoading) receivablesAccountLevel4IsLoading$: Observable<any>;

  // Level 4 Account Other
  @Select(OtherAccountState.entities) otherAccountsLevel4$: Observable<any>;
  @Select(OtherAccountState.isFetchCompleted) otherAccountLevel4FetchCompleted$: Observable<any>;
  @Select(OtherAccountState.isLoading) otherAccountLevel4IsLoading$: Observable<any>;


  // Category
  @Select(CategoryState.entities) categories$: Observable<any>;
  @Select(CategoryState.isFetchCompleted) categoryFetchCompleted$: Observable<any>;
  @Select(CategoryState.isLoading) categoryIsLoading$: Observable<any>;


  // Department
  @Select(DepartmentState.entities) departments$: Observable<any>;
  @Select(DepartmentState.isFetchCompleted) departmentFetchCompleted$: Observable<any>;
  @Select(DepartmentState.isLoading) departmentIsLoading$: Observable<any>;


  // Location
  @Select(LocationState.entities) locations$: Observable<any>;
  @Select(LocationState.isFetchCompleted) locationFetchCompleted$: Observable<any>;
  @Select(LocationState.isLoading) locationIsLoading$: Observable<any>;

  // Organization
  @Select(OrganizationState.entities) organizations$: Observable<any>;
  @Select(OrganizationState.isFetchCompleted) organizationFetchCompleted$: Observable<any>;
  @Select(OrganizationState.isLoading) organizationIsLoading$: Observable<any>;

  // Product
  @Select(ProductState.entities) products$: Observable<any>;
  @Select(ProductState.isFetchCompleted) productFetchCompleted$: Observable<any>;
  @Select(ProductState.isLoading) productIsLoading$: Observable<any>;

  // Product
  @Select(WarehouseState.entities) warehouses$: Observable<any>;
  @Select(WarehouseState.isFetchCompleted) warehouseFetchCompleted$: Observable<any>;
  @Select(WarehouseState.isLoading) warehouseIsLoading$: Observable<any>;
  // selector region end

  // finance module selectors
  // Business Partner Country
  @Select(BankAccountState.entities) bankAccounts$: Observable<any>;
  @Select(BankAccountState.isFetchCompleted) bankAccountFetchCompleted$: Observable<any>;
  @Select(BankAccountState.isLoading) bankAccountIsLoading$: Observable<any>;


  //region State Management

  // Get Business Partner From Store if available else fetch from the server and cache.
  getBusinessPartnerFromState() {
    this.businessPartnerFetchCompleted$.subscribe((res) => {
      if (!res) {
        this.store.dispatch(new GetList(BusinessPartnerState, {
          serviceClass: this.businessPartnerService,
          methodName: 'getBusinessPartnersDropdown',
          context: this
        }));
      }
    });
  }

  // Get Country From Store if available else fetch from the server and cache.
  getCountryFromState() {
    this.countryFetchCompleted$.subscribe((res) => {
      if (!res) {
        this.store.dispatch(new GetList(CountryState, {
          serviceClass: this.cscService,
          methodName: 'getCountries',
          context: this
        }));
      }
    });
  }

  // Get Country state From Store if available else fetch from the server and cache.
  getStateFromState() {
    this.stateFetchCompleted$.subscribe((res) => {
      if (!res) {
        this.store.dispatch(new GetList(StateState, {
          serviceClass: this.cscService,
          methodName: 'getStates',
          context: this
        }));
      }
    });
  }

  // Get City State From Store if available else fetch from the server and cache.
  getCityFromState() {
    this.cityFetchCompleted$.subscribe((res) => {
      if (!res) {
        this.store.dispatch(new GetList(CityState, {
          serviceClass: this.cscService,
          methodName: 'getCities',
          context: this
        }));
      }
    });
  }

  // Get All Level 4 Accounts State From Store if available else fetch from the server and cache.
  getAccountLevel4FromState() {
    this.accountLevel4FetchCompleted$.subscribe((res) => {
      if (!res) {
        this.store.dispatch(new GetList(AccountLevel4State, {
          serviceClass: this.chartOfAccountService,
          methodName: 'getLevel4AccountsDropdown',
          context: this
        }));
      }
    });
  }

  getAccountLevel4PayablesFromState() {
    this.payableAccountLevel4FetchCompleted$.subscribe((res) => {
      if (!res) {
        this.store.dispatch(new GetList(PayableAccountState, {
          serviceClass: this.chartOfAccountService,
          methodName: 'getLevel4AccountsPayables',
          context: this
        }));
      }
    });
  }

  getAccountLevel4ReceivablesFromState() {
    this.receivablesAccountLevel4FetchCompleted$.subscribe((res) => {
      if (!res) {
        this.store.dispatch(new GetList(AccountReceivablesState, {
          serviceClass: this.chartOfAccountService,
          methodName: 'getLevel4AccountsReceivables',
          context: this
        }));
      }
    });
  }

  getAccountLevel4OthersFromState() {
    this.otherAccountLevel4FetchCompleted$.subscribe((res) => {
      if (!res) {
        this.store.dispatch(new GetList(OtherAccountState, {
          serviceClass: this.chartOfAccountService,
          methodName: 'getLevel4AccountsOtherAccounts',
          context: this
        }));
      }
    });
  }

  // Get Category From Store if available else fetch from the server and cache.
  getCategoryFromState() {
    this.categoryFetchCompleted$.subscribe((res) => {
      if (!res) {
        this.store.dispatch(new GetList(CategoryState, {
          serviceClass: this.categoryService,
          methodName: 'getCategoriesDropdown',
          context: this
        }));
      }
    });
  }

  // Get Department From Store if available else fetch from the server and cache.
  getDepatmentFromState() {
    this.departmentFetchCompleted$.subscribe((res) => {
      if (!res) {
        this.store.dispatch(new GetList(DepartmentState, {
          serviceClass: this.departmentService,
          methodName: 'getDepartmentsDropdown',
          context: this
        }));
      }
    });
  }

  // Get Location From Store if available else fetch from the server and cache.
  getLocationFromState() {
    this.locationFetchCompleted$.subscribe((res) => {
      if (!res) {
        this.store.dispatch(new GetList(LocationState, {
          serviceClass: this.locationService,
          methodName: 'getLocationsDropdown',
          context: this
        }));
      }
    });
  }

  // Get Organization From Store if available else fetch from the server and cache.
  getOrganizationFromState() {
    this.organizationFetchCompleted$.subscribe((res) => {
      if (!res) {
        this.store.dispatch(new GetList(OrganizationState, {
          serviceClass: this.organizationService,
          methodName: 'getOrganizationsDropdown',
          context: this
        }));
      }
    });
  }

  // Get Product From Store if available else fetch from the server and cache.
  getProductFromState() {
    this.productFetchCompleted$.subscribe((res) => {
      if (!res) {
        this.store.dispatch(new GetList(ProductState, {
          serviceClass: this.productService,
          methodName: 'getProductsDropdown',
          context: this
        }));
      }
    });
  }

  // Get Warehouse From Store if available else fetch from the server and cache.
  getWarehouseFromState() {
    this.warehouseFetchCompleted$.subscribe((res) => {
      if (!res) {
        this.store.dispatch(new GetList(WarehouseState, {
          serviceClass: this.warehouseService,
          methodName: 'getWarehousesDropdown',
          context: this
        }));
      }
    });
  }

  // finance module selector methods
  // Get Bank Account State From Store if available else fetch from the server and cache.
  getBankAccountFromState() {
    this.bankAccountFetchCompleted$.subscribe((res) => {
      if (!res) {
        this.store.dispatch(new GetList(BankAccountState, {
          serviceClass: this.bankAccountService,
          methodName: 'getBankAccountsDropdown',
          context: this
        }));
      }
    });
  }
  // end state region
}


