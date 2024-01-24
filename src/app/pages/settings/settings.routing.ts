import { Routes, RouterModule } from '@angular/router'
import { SettingsComponent } from './settings.component';
import { CompanyComponent } from './company/company.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
			{ path: 'company', component: CompanyComponent }
        ]
    }
];
export const routing = RouterModule.forChild( routes );
