import { Routes, RouterModule } from '@angular/router';
import { VendorComponent } from './vendor.component';
import { JobordersComponent } from './components/joborders/joborders.component';
import { VendorsComponent } from './components/vendors/vendors.component';
import { VendorApprovestatusComponent } from './components/venapprovestatus/venapprovestatus.component';
//noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: VendorComponent,
        children: [
            { path: 'vendorlist', component: VendorsComponent },
            { path: 'joborder', component: JobordersComponent },
            { path: 'venapprovestatus', component: VendorApprovestatusComponent }
        ]
    } 
];
export const routing = RouterModule.forChild( routes );
  