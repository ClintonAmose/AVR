import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustomerdeliveryComponent } from './components/customerdelivery/customerdelivery.component';
import { CustomerorderComponent } from './components/customerorder/customerorder.component';
import { OrdercloseComponent } from './components/orderclose/orderclose.component';
import { CustomerrequestComponent } from './components/customerrequest/customerrequest.component';
import { DeliveryreadyComponent } from './components/deliveryready/deliveryready.component';
import { WorkinprocessComponent } from './components/workinprocess/workinprocess.component';
import { AcceptencependingComponent } from './components/acceptencepending/acceptencepending.component';
import { RejectedbyvendorComponent } from './components/rejectedbyvendor/rejectedbyvendor.component';
import { OverdueordersComponent } from './components/overdueorders/overdueorders.component';
import { RejectedbyadminComponent } from './components/rejectedbyadmin/rejectedbyadmin.component'; 
import { TodaydeliveryComponent } from './components/todaydelivery/todaydelivery.component';
import { TodayordersComponent } from './components/todayorders/todayorders.component';
import { CatalogStockComponent } from './components/catalogstock/catalogstock.component';

import { DeliveryremainderComponent } from './components/deliveryremainder/deliveryremainder.component';

import { ExcelService } from './excel.service';
//noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: CustomerComponent, 
        children: [
            { path: 'customerdelivery', component: CustomerdeliveryComponent },
            { path: 'customerorder', component: CustomerorderComponent },
            { path: 'orderclose', component: OrdercloseComponent },
            { path: 'neworder', component: CustomerrequestComponent },
            { path: 'deliveryready', component: DeliveryreadyComponent },
            { path: 'workinprocess', component: WorkinprocessComponent },
            { path: 'acceptpending', component: AcceptencependingComponent },
            { path: 'vendorreject', component: RejectedbyvendorComponent },
			{ path: 'overdue', component: OverdueordersComponent },
            { path: 'todaydelivery', component: TodaydeliveryComponent },
            { path: 'todayorder', component: TodayordersComponent },
            { path: 'adminreject', component: RejectedbyadminComponent },
		    { path: 'catalog', component: CatalogStockComponent },
            { path: 'deliveryremainder', component: DeliveryremainderComponent },				
        ]
    }
];
export const routing = RouterModule.forChild( routes );
