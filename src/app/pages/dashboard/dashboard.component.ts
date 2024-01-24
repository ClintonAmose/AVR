import { Component, OnInit } from '@angular/core';
@Component( {
    selector: 'dashboard',
    styleUrls: ['./dashboard.scss'],
    templateUrl: './dashboard.html'
} )
export class Dashboard implements OnInit {

    page = this.getEmptyPage();
    constructor() {

    }
    ngOnInit() {
        this.page = this.getEmptyPage();
    }
    getEmptyPage() {
        return {
            neworders: false,
            dashboard: true,
            deliveryready: false,
            workinprocess: false,
            pendingacceptence: false,
            venrejectorder: false,
            overdue: false,
            adminrejectorder: false,
            todaydelivery: false,
            todayorder: false
        };
    }
    updatebranch(){
        console.log("update branch");
    }

}
