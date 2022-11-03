import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoryService} from '../../../pages/profiling/category/service/category.service';
import {WarehouseService} from '../../../pages/profiling/warehouse/services/warehouse.service';
import {LocationService} from '../../../pages/profiling/location/service/location.service';
import {AccountResolverService} from '../../resolver/account/account-resolver.service';
import {BusinessPartnerResolverService} from '../../resolver/businessPartner/business-partner-resolver.service';
import {WarehouseResolverService} from '../../resolver/warehouse/warehouse-resolver.service';
import {LocationResolverService} from '../../resolver/location/location-resolver.service';
import {ProductResolverService} from '../../resolver/product/product-resolver.service';
import {ProductService} from '../../../pages/profiling/product/service/product.service';
import {BankAccountService} from '../../../pages/finance/bank-account/service/bankAccount.service';
import {BankAccountResolverService} from '../../resolver/bankAccount/bank-account-resolver.service';
import {DepartmentService} from '../../../pages/profiling/department/service/department.service';
import {DepartmentResolverService} from '../../resolver/department/department-resolver.service';
import {DecodeTokenService} from '../../decode-token.service';
import {CashAccountService} from '../../../pages/finance/cash-account/service/cashAccount.service';
import {BusinessPartnerService} from '../../../pages/profiling/business-partner/service/businessPartner.service';


@NgModule({
  providers: [
    CategoryService,
    WarehouseService,
    LocationService,
    AccountResolverService,
    BusinessPartnerResolverService,
    WarehouseResolverService,
    LocationResolverService,
    ProductResolverService,
    ProductService,
    BankAccountService,
    BankAccountResolverService,
    DepartmentService,
    DepartmentResolverService,
    DecodeTokenService,
    CashAccountService,
    BusinessPartnerService
  ]
})
export class ServiceProxyModule {
}
