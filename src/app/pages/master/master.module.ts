import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { Ng2CompleterModule } from "ng2-completer";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
//import { DataFilterPipe } from '../../data-filter.pipe';
import { MainPipeModule } from '../../main-pipe/main-pipe.module';
import { MyDatePickerModule } from 'mydatepicker';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { HotTable, HotTableModule } from 'ng2-handsontable';
import { SocketIoModule,SocketIoConfig,Socket } from 'ng-socket-io';

import { routing } from './master.routing';
import { MasterComponent } from './master.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';

import { AdminUsersService } from './admin-users/admin-users.service';
import { PermissionService } from './admin-users/permission/permission.service';
import { CommonService } from '../common/common.service';
import { CountryService } from './country/country.service';
import { StateService } from './state/state.service';
import { CityService } from './city/city.service';
import { DepartmentService } from './department/department.service';
import { DesignationService } from './designation/designation.service';
import { ProfileService } from './profile/profile.service';
import { CategoryService } from './category/category.service';
import { SubcategoryService } from './subcategory/subcategory.service';
import { ProductsService } from './products/products.service';
import { BranchService } from './branch/branch.service';
import { EmployeeService } from './employee/employee.service';
import { CollectionService } from './collection/collection.service';
import { DealerService } from './dealer/dealer.service';
import { CustomerService } from './customer/customer.service';
import { StyleService } from './style/style.service';
import { ThemeService } from './theme/theme.service';
import { MaterialService } from './material/material.service';
import { ClarityService } from './clarity/clarity.service';
import { PurityService } from './purity/purity.service';
import { ItemService } from './item/item.service';
import { ItemtypeService } from './itemtype/itemtype.service';
import { DesignService } from './design/design.service';
import { ItemcategoryService } from './itemcategory/itemcategory.service';
import { CategoryheadService } from './categoryhead/categoryhead.service';

import { BranchComponent } from './branch/branch.component';
import { CreateadminuserComponent } from './admin-users/createadminuser/createadminuser.component';
import { PermissionComponent  } from './admin-users/permission/permission.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { ProductsComponent } from './products/products.component';
import { SmsalertComponent } from './smsalert/smsalert.component';
//import { ModalComponent } from '../common/modal/modal.component';
import { PopupmodalModule } from '../common/popupmodal.module';  
import { RateService } from './rate/rate.service';
import { StoneRateService } from './stonerate/stonerate.service';
import { DealerComponent  } from './dealer/dealer.component';
import { CustomerComponent  } from './customer/customer.component';
import { EmployeeComponent } from './employee/employee.component';
import { StyleComponent } from './style/style.component';
import { ThemeComponent } from './theme/theme.component';
import { CollectionComponent } from './collection/collection.component';
import { ClarityComponent } from './clarity/clarity.component';
import { PurityComponent } from './purity/purity.component';
import { MaterialComponent } from './material/material.component';
import { ItemComponent } from './item/item.component';
import { CategoryheadComponent } from './categoryhead/categoryhead.component';
import { ItemtypeComponent } from './itemtype/itemtype.component';   
import { ItemcategoryComponent } from './itemcategory/itemcategory.component';
import { DesignComponent } from './design/design.component';
import { CreatedesignComponent } from './design/createdesign/createdesign.component';
import { CreatebulkdesignComponent } from './design/createbulkdesign/createbulkdesign.component';
import { SizeComponent } from './size/size.component';
import { SizeService } from './size/size.service';
import { SmsalertService } from './smsalert/smsalert.service';
import { StockManageService } from './stockmanage/stockmanage.service';
import { StockManageComponent } from './stockmanage/stockmanage.component';
import { OrderManageService } from './ordermanage/ordermanage.service';
import { OrderManageComponent } from './ordermanage/ordermanage.component';
import { BomdetailsComponent } from './design/bomdetails/bomdetails.component';
import { CustomerselectComponent } from './design/customerdetalis/customerselect.component';
import { RateComponent } from './rate/rate.component';
import { StoneRateComponent } from './stonerate/stonerate.component';
import { DieComponent } from './die/die.component';
import { DieService } from './die/die.service'; 
import { ExcelService } from '../reports/excel.service';

const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

@NgModule( {
    imports: [
        CommonModule,
        AppTranslationModule,
        FormsModule,
        Ng2CompleterModule,
        routing,
        DataTableModule,
        HttpModule,
        MyDatePickerModule,
        HotTableModule,
        MainPipeModule,
        PopupmodalModule,
		AngularDateTimePickerModule,
		NgaModule
    ],
    declarations: [
        AdminUsersComponent,
        MasterComponent,
        //DataFilterPipe,
        BranchComponent,
        CreateadminuserComponent,
		PermissionComponent,
        DepartmentComponent,
        DesignationComponent,
        CountryComponent,
        StateComponent,
        CityComponent,
        ProfileComponent,
        CategoryComponent,
        SubcategoryComponent,
		DealerComponent,
		CustomerComponent,
        ProductsComponent,
        //ModalComponent,
        EmployeeComponent,
        StyleComponent,
        ThemeComponent,
        CollectionComponent,
        ClarityComponent,
        PurityComponent,
        MaterialComponent,
        ItemComponent,
        CategoryheadComponent,
        ItemtypeComponent,
        ItemcategoryComponent,
        DesignComponent,
        CreatedesignComponent,
		CreatebulkdesignComponent,
        SizeComponent,
        BomdetailsComponent,
		CustomerselectComponent,
        RateComponent,
        StoneRateComponent,
        DieComponent,
		SmsalertComponent,
		StockManageComponent,
		OrderManageComponent
    ],
    providers: [
        AdminUsersService,
        CommonService,
        CountryService,
        StateService,
        CityService,
        DepartmentService,
        DesignationService,
        ProfileService,
        CategoryService,
        SubcategoryService,
        ProductsService,
        BranchService,
        EmployeeService,
        CollectionService,
		DealerService,
		CustomerService,
        StyleService,
        ThemeService,
        ClarityService,
        PurityService,
        MaterialService,
        ItemService,
        CategoryheadService,
        ItemtypeService,
        ItemcategoryService,
        DesignService,
        SizeService,
        RateService,
        StoneRateService,
        DieService,
		PermissionService,
		ExcelService,
		SmsalertService,
		StockManageService,
		OrderManageService
    ]
} )
export class MasterModule { }
