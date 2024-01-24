import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { Ng2CompleterModule } from "ng2-completer";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import { MainPipeModule } from '../../main-pipe/main-pipe.module';
import { MyDatePickerModule } from 'mydatepicker';
import { routing } from './customer.routing';
import { PopupmodalModule } from '../common/popupmodal.module';
import { HotTable, HotTableModule } from 'ng2-handsontable';

import { SocketIoModule, SocketIoConfig, Socket} from 'ng-socket-io';

/* import { CarouselModule } from 'angular4-carousel';
import { SlideshowModule } from 'ng-simple-slideshow';*/
import { CustomerComponent } from './customer.component';
import { CustomerorderComponent } from './components/customerorder/customerorder.component';
import { CustomerdeliveryComponent } from './components/customerdelivery/customerdelivery.component';
import { OrdercloseComponent } from './components/orderclose/orderclose.component';
import { CustomerdeliveryService } from './components/customerdelivery/customerdelivery.service';
import { CustomerorderService } from './components/customerorder/customerorder.service';
import { OrdercloseService } from './components/orderclose/orderclose.service';
import { CommonService } from '../common/common.service';
import { CustomerrequestService } from './components/customerrequest/customerrequest.service';
import { DeliveryreadyService } from './components/deliveryready/deliveryready.service';
import { WorkinProcessService } from './components/workinprocess/workinprocess.service';
import { AcceptencePendingService } from './components/acceptencepending/acceptencepending.service';
import { RejectedbyvendorService } from './components/rejectedbyvendor/rejectedbyvendor.service';
import { OverdueordersService } from './components/overdueorders/overdueorders.service';
import { TodaydeliveryService } from './components/todaydelivery/todaydelivery.service';
import { TodayorderService } from './components/todayorders/todayorders.service';
import { RejectedbyadminService } from './components/rejectedbyadmin/rejectedbyadmin.service';
import { CatalogStockService } from './components/catalogstock/catalogstock.service';
import { DeliveryremainderService } from './components/deliveryremainder/deliveryremainder.service';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { CustomerrequestComponent } from './components/customerrequest/customerrequest.component';
import { DeliveryreadyComponent } from './components/deliveryready/deliveryready.component';
import { WorkinprocessComponent } from './components/workinprocess/workinprocess.component';
import { AcceptencependingComponent } from './components/acceptencepending/acceptencepending.component';
import { RejectedbyvendorComponent } from './components/rejectedbyvendor/rejectedbyvendor.component';
import { OverdueordersComponent } from './components/overdueorders/overdueorders.component';
import { TodaydeliveryComponent } from './components/todaydelivery/todaydelivery.component';
import { TodayordersComponent } from './components/todayorders/todayorders.component';
import { RejectedbyadminComponent } from './components/rejectedbyadmin/rejectedbyadmin.component';
import { CatalogStockComponent } from './components/catalogstock/catalogstock.component';
import { ExcelService } from './excel.service';
import { DeliveryremainderComponent } from './components/deliveryremainder/deliveryremainder.component';
/* import { ZoomableDirective } from 'ng2-zoomable'; */
/* import {ImageZoomModule} from 'angular2-image-zoom';  */

const config: SocketIoConfig = { url: 'https://winbull.in:3002/', options: {} };

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
		HotTableModule,
		AngularDateTimePickerModule,
		SocketIoModule.forRoot(config)
    ],
    declarations: [
        CustomerComponent,
        CustomerorderComponent,
        CustomerdeliveryComponent,
        OrdercloseComponent,
        CustomerrequestComponent,
        DeliveryreadyComponent,
        WorkinprocessComponent,
	    AcceptencependingComponent,
        RejectedbyvendorComponent,
        OverdueordersComponent,
        TodaydeliveryComponent,
        TodayordersComponent,
		RejectedbyadminComponent,
		DeliveryremainderComponent,
		CatalogStockComponent
    ],
    providers: [
        CommonService,
        CustomerdeliveryService,
        CustomerorderService,
        OrdercloseService,
        CustomerrequestService,
		DeliveryreadyService,
		WorkinProcessService,
	    AcceptencePendingService,
		RejectedbyvendorService,
		OverdueordersService,
		TodaydeliveryService,
		TodayorderService,
		RejectedbyadminService,
		CatalogStockService,
		DeliveryremainderService,
		ExcelService
    ]
} )
export class CustomerModule { }
