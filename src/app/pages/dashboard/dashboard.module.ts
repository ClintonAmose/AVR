import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing } from './dashboard.routing';

import { PopularApp } from './popularApp';
import { PieChart } from './pieChart';
import { TrafficChart } from './trafficChart';
import { UsersMap } from './usersMap';
import { LineChart } from './lineChart';
import { Feed } from './feed';
import { Todo } from './todo';
import { Calendar } from './calendar';
import { CalendarService } from './calendar/calendar.service';
import { FeedService } from './feed/feed.service';
import { LineChartService } from './lineChart/lineChart.service';
import { PieChartService } from './pieChart/pieChart.service';
import { CustomerrequestService } from './customer-request/customerrequest.service';
import { TodoService } from './todo/todo.service';
import { TrafficChartService } from './trafficChart/trafficChart.service';
import { UsersMapService } from './usersMap/usersMap.service';
import { CommonService } from '../common/common.service';
import { CustomerRequestComponent } from './customer-request/customer-request.component';

import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import { MainPipeModule } from '../../main-pipe/main-pipe.module';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        AppTranslationModule,
        NgaModule,
        routing,
        DataTableModule,
        MyDatePickerModule,
        MainPipeModule
    ],
    declarations: [
        PopularApp,
        PieChart,
        TrafficChart,
        UsersMap,
        LineChart,
        Feed,
        Todo,
        Calendar,
        Dashboard,
        CustomerRequestComponent
    ],
    providers: [
        CalendarService,
        FeedService,
        LineChartService,
        PieChartService,
        TodoService,
        TrafficChartService,
        UsersMapService,
        CustomerrequestService,
        CommonService
    ]
} )
export class DashboardModule { }
