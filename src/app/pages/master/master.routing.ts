import { Routes, RouterModule } from '@angular/router';

import { MasterComponent } from './master.component';
import { ModuleWithProviders } from '@angular/core';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { BranchComponent } from './branch/branch.component';
import { CreateadminuserComponent } from './admin-users/createadminuser/createadminuser.component';
import { CreatedesignComponent } from './design/createdesign/createdesign.component';
import { CreatebulkdesignComponent } from './design/createbulkdesign/createbulkdesign.component';
import { BomdetailsComponent } from './design/bomdetails/bomdetails.component';
import { CustomerselectComponent } from './design/customerdetalis/customerselect.component';
import { PermissionComponent } from './admin-users/permission/permission.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { ProductsComponent } from './products/products.component';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { ProfileComponent } from './profile/profile.component';
import { StyleComponent } from './style/style.component';
import { ThemeComponent } from './theme/theme.component';
import { CollectionComponent } from './collection/collection.component';
import { ClarityComponent } from './clarity/clarity.component';
import { PurityComponent } from './purity/purity.component';
import { MaterialComponent } from './material/material.component';
import { ItemComponent } from './item/item.component';
import { CategoryheadComponent } from './categoryhead/categoryhead.component';
import { DesignComponent } from './design/design.component';
import { SizeComponent } from './size/size.component';
import { SmsalertComponent } from './smsalert/smsalert.component';

import { StockManageComponent } from './stockmanage/stockmanage.component';

import { OrderManageComponent } from './ordermanage/ordermanage.component';

import { RateComponent } from './rate/rate.component';
import { StoneRateComponent } from './stonerate/stonerate.component';
import { DieComponent } from './die/die.component';
import { DealerComponent } from './dealer/dealer.component';
import { CustomerComponent } from './customer/customer.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
    {
        path: '',
        component: MasterComponent,
        children: [
            { path: 'adminuser', component: AdminUsersComponent },
            { path: 'createadminuser', component: CreateadminuserComponent },
            { path: 'branch', component: BranchComponent }, 
            { path: 'customer', component: CustomerComponent }, 
            { path: 'category', component: CategoryComponent },
            { path: 'subcategory', component: SubcategoryComponent },
            { path: 'product', component: ProductsComponent },
            { path: 'employee', component: EmployeeComponent },
            { path: 'department', component: DepartmentComponent },
            { path: 'designation', component: DesignationComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'catalogstyle', component: StyleComponent },
            { path: 'theme', component: ThemeComponent },
            { path: 'collection', component: CollectionComponent },
            { path: 'material', component: MaterialComponent },
            { path: 'clarity', component: ClarityComponent },
            { path: 'purity', component: PurityComponent },
            { path: 'item', component: ItemComponent },
            { path: 'categoryhead', component: CategoryheadComponent },
            { path: 'design', component: DesignComponent },
            { path: 'createdesign', component: CreatedesignComponent },
            { path: 'createbulkdesign', component: CreatebulkdesignComponent },
            { path: 'design/updatebom/:id', component: BomdetailsComponent },
            { path: 'design/selectcustomer/:id/:name_design', component: CustomerselectComponent },
            { path: 'selectcustomer', component: CustomerselectComponent },
            { path: 'updatepermission/:id', component: PermissionComponent },
            { path: 'size', component: SizeComponent },
            { path: 'rate', component: RateComponent },
            { path: 'stonerate', component: StoneRateComponent },
            { path: 'die', component: DieComponent },
            { path: 'dealer', component: DealerComponent },
            { path: 'smsalert', component: SmsalertComponent },
            { path: 'stockmanage', component: StockManageComponent },
            { path: 'ordermanage', component: OrderManageComponent }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild( routes );