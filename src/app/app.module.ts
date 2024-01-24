import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { Select2Module } from 'ng2-select2';
//import { DataFilterPipe } from './data-filter.pipe';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';


/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';

import { LimitToDirective } from './pages/ui/limit-to';


// Application wide providers
const APP_PROVIDERS = [
    AppState,
    GlobalState
];

export type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule( {
    bootstrap: [App],
    declarations: [
        App,LimitToDirective
        //DataFilterPipe
    ],
    imports: [ // import Angular's modules
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgaModule.forRoot(),
        NgbModule.forRoot(),
        PagesModule,
        routing,
        ToastModule.forRoot(),
        Select2Module
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        APP_PROVIDERS,
    ]
} )

export class AppModule {

    constructor( public appState: AppState ) {
    }
}
