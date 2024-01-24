import { Routes, RouterModule } from '@angular/router';

import { Dashboard } from './dashboard.component';
import { ModuleWithProviders } from '@angular/core';
import { CustomerRequestComponent } from './customer-request/customer-request.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
    {
        path: '',
        component: Dashboard,
        children: [
            { path: 'customerrequest', component: CustomerRequestComponent }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild( routes );
