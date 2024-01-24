import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import { MainPipeModule } from '../../main-pipe/main-pipe.module';
import { MyDatePickerModule } from 'mydatepicker';
import { routing } from './reports.routing';
import { Ng2CompleterModule } from "ng2-completer";
import { PopupmodalModule } from '../common/popupmodal.module';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { ReportsComponent } from './reports.component';
import { CusorderstatusComponent } from './components/cusorderstatus/cusorderstatus.component';
import { VenorderstatusComponent } from './components/venorderstatus/venorderstatus.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { StockComponent } from './components/stockreports/stock.component';
import { DiereportComponent  } from './components/diereport/diereport.component';
import { CommonService } from '../common/common.service';
import { ExcelService } from './excel.service';
import { CusorderstatusService } from './components/cusorderstatus/cusorderstatus.service';
import { DeliveryService } from './components/delivery/delivery.service';
import { StockService } from './components/stockreports/stock.service';
import { VenorderstatusService } from './components/venorderstatus/venorderstatus.service';
import { DiereportService } from './components/diereport/diereport.service';


@NgModule( {
    imports: [
        CommonModule,
        AppTranslationModule,
        FormsModule,
        NgaModule,
        routing,
        DataTableModule,
        HttpModule,
        MyDatePickerModule,
        MainPipeModule,
        PopupmodalModule,
		Ng2CompleterModule,
		AngularDateTimePickerModule
    ],
    declarations: [
        ReportsComponent,
        CusorderstatusComponent,
        VenorderstatusComponent,
        DeliveryComponent,
		DiereportComponent,
		StockComponent
    ],
    providers: [
        CommonService,
        CusorderstatusService,
        DeliveryService,
		ExcelService,
        VenorderstatusService,
		DiereportService,
		StockService
    ]
} )
export class ReportsModule { }
