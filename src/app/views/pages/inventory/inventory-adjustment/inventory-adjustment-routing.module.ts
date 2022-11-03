import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Permissions} from 'src/app/views/shared/AppEnum';
import {PermissionGuard} from 'src/app/core/auth/_guards/permission.guard';
import {InventoryAdjustmentDetailsComponent} from './inventory-adjustment-details/inventory-adjustment-details.component';
import {ListInventoryAdjustmentComponent} from './list-inventory-adjustment/list-inventory-adjustment.component';
import {CreateInventoryAdjustmentComponent} from './create-inventory-adjustment/create-inventory-adjustment.component';
import {FormConfirmationGuard} from 'src/app/views/shared/route-guards/form-confirmation.guard';
import {AccountResolverService} from 'src/app/views/shared/resolver/account/account-resolver.service';
import {ProductResolverService} from 'src/app/views/shared/resolver/product/product-resolver.service';
import {LocationResolverService} from 'src/app/views/shared/resolver/location/location-resolver.service';
import {WarehouseResolverService} from 'src/app/views/shared/resolver/warehouse/warehouse-resolver.service';
import {BusinessPartnerResolverService} from 'src/app/views/shared/resolver/businessPartner/business-partner-resolver.service';
import {CRUD_ROUTES} from 'src/app/views/shared/AppRoutes';

const route: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
      {
        path: CRUD_ROUTES.LIST,
        component: ListInventoryAdjustmentComponent,
        data: {
          array: [
            {permission: Permissions.INVENTORY_ADJUSTMENT_VIEW},
            {permission: Permissions.INVENTORY_ADJUSTMENT_CREATE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.CREATE,
        component: CreateInventoryAdjustmentComponent,
        canDeactivate: [FormConfirmationGuard],
        data: {
          array: [
            {permission: Permissions.INVENTORY_ADJUSTMENT_CREATE}
          ]
        },
        canActivate: [PermissionGuard],
        resolve: {
          accountList: AccountResolverService,
          productList: ProductResolverService,
          locationList: LocationResolverService,
          warehouseList: WarehouseResolverService,
          businessPartnerList: BusinessPartnerResolverService
        }
      },
      {
        path: CRUD_ROUTES.DETAILS,
        component: InventoryAdjustmentDetailsComponent,
        data: {
          array: [
            {permission: Permissions.INVENTORY_ADJUSTMENT_VIEW},
            {permission: Permissions.INVENTORY_ADJUSTMENT_CREATE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {path: '**', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class InventoryAdjustmentRoutingModule {
}
