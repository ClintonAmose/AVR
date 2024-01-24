import { Routes, RouterModule } from '@angular/router'
import { StockComponent } from './stock.component';
import { AdminorderComponent } from './components/adminorder/adminorder.component';
import { StockTransferComponent } from './components/stocktransfer/stocktransfer.component';
import { AdminCustomerorderComponent } from './components/admincustomerorder/admincustomerorder.component';
import { CustomersBulkorderComponent } from './components/admincustomerorder/customerbulkorder/customerbulkorder.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: StockComponent,
        children: [
			{ path: 'adminorder', component: AdminorderComponent },
			{ path: 'stocktransfer', component: StockTransferComponent },
			{ path: 'admincustomerorder', component: AdminCustomerorderComponent },
			{ path: 'customerbulkorder', component: CustomersBulkorderComponent }
        ] 
    }
];
export const routing = RouterModule.forChild( routes );
