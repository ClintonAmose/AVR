import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { HttpModule } from '@angular/http';
import { MainPipeModule } from '../../main-pipe/main-pipe.module';
import { MyDatePickerModule } from 'mydatepicker';
import { routing } from './settings.routing';
import { SettingsComponent } from './settings.component';
import { CompanyComponent } from './company/company.component';

import { CompanyService } from './company/company.service';
import { CommonService } from '../common/common.service';
@NgModule( {
    imports: [
        CommonModule,
        AppTranslationModule,
        FormsModule,
        NgaModule,
        routing,
        HttpModule,
        MyDatePickerModule,
        MainPipeModule,
    ],
    declarations: [
        SettingsComponent,
		CompanyComponent
    ],
    providers: [
        CommonService,
		CompanyService,
		
    ]
} )
export class SettingsModule { }
