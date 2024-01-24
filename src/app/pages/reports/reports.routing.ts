import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { CusorderstatusComponent } from './components/cusorderstatus/cusorderstatus.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { StockComponent } from './components/stockreports/stock.component';
import { VenorderstatusComponent } from './components/venorderstatus/venorderstatus.component';
import { DiereportComponent } from './components/diereport/diereport.component';
const routes: Routes = [
    {
        path: '',
        component: ReportsComponent,
        children: [
            { path: 'corderstatus', component: CusorderstatusComponent },
            { path: 'vorderstatus', component: VenorderstatusComponent },
            { path: 'deliveryreports', component: DeliveryComponent },
            { path: 'stockreports', component: StockComponent },
            { path: 'diereport', component: DiereportComponent }
        ]
    }
];
export const routing = RouterModule.forChild( routes );
