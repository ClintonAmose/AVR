import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2CompleterModule } from "ng2-completer";
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import { MainPipeModule } from '../../main-pipe/main-pipe.module';
import { MyDatePickerModule } from 'mydatepicker';
import { routing } from './vendor.routing';
import { PopupmodalModule } from '../common/popupmodal.module';
import { VendorComponent } from './vendor.component';
import { VendorsComponent } from './components/vendors/vendors.component';
import { JobordersComponent } from './components/joborders/joborders.component';
import { VendorApprovestatusComponent } from './components/venapprovestatus/venapprovestatus.component';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { CommonService } from '../common/common.service';
import { JobordersService } from './components/joborders/joborders.service';
import { VendorsService } from './components/vendors/vendors.service';
import { VendorApprovestatusService } from './components/venapprovestatus/venapprovestatus.service';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
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
		AngularDateTimePickerModule,
		Ng2CompleterModule
    ],
    declarations: [
        VendorComponent,
        VendorsComponent,
        JobordersComponent,
		VendorApprovestatusComponent,
    ],
    providers: [
        CommonService,
        JobordersService,
        VendorsService,
		VendorApprovestatusService
    ]
} )
export class VendorModule { }
