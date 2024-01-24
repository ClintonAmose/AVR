import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { Ng2CompleterModule } from "ng2-completer";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';
import { MainPipeModule } from '../../main-pipe/main-pipe.module';
import { MyDatePickerModule } from 'mydatepicker';
import { HotTable, HotTableModule } from 'ng2-handsontable';

import { routing } from './stock.routing';
import { PopupmodalModule } from '../common/popupmodal.module';
import { StockComponent } from './stock.component';
import { AdminorderComponent } from './components/adminorder/adminorder.component';
import { StockTransferComponent } from './components/stocktransfer/stocktransfer.component';
import { AdminCustomerorderComponent } from './components/admincustomerorder/admincustomerorder.component';
import { CustomersBulkorderComponent } from './components/admincustomerorder/customerbulkorder/customerbulkorder.component';
import { CommonService } from '../common/common.service';
import { AdminorderService } from './components/adminorder/adminorder.service';
import { StockTransferService } from './components/stocktransfer/stocktransfer.service';
import { AdminCustomerorderService } from './components/admincustomerorder/admincustomerorder.service';
import { ExcelService } from '../reports/excel.service';
@NgModule( {
    imports: [
        CommonModule,
        AppTranslationModule,
        FormsModule,
        NgaModule,
		DataTableModule,
        routing,
        HttpModule, 
        MyDatePickerModule,
        MainPipeModule,
		PopupmodalModule,
		Ng2CompleterModule,
		HotTableModule
    ],
    declarations: [
        StockComponent,
		AdminorderComponent,
		StockTransferComponent,
		AdminCustomerorderComponent,
		CustomersBulkorderComponent
    ],
    providers: [
        CommonService,
		AdminorderService,
		StockTransferService,
		AdminCustomerorderService,
		ExcelService
    ]
} )
export class StockModule { }
