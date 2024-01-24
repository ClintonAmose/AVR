import { Component } from '@angular/core';
import { PieChartService } from './pieChart.service';
import { Router } from '@angular/router';
import { CommonService } from '../../common/common.service';
import 'easy-pie-chart/dist/jquery.easypiechart.js';
import { Location } from '@angular/common';

@Component( {
    selector: 'pie-chart',
    templateUrl: './pieChart.html',
    styleUrls: ['./pieChart.scss']
} )
// TODO: move easypiechart to component
export class PieChart {

    dashboarddata = { 'neworders': 0, 'deliveryready': 0, 'workinprocess': 0, 'pendingacceptence': 0, 'venrejectorder': 0, 'overdue': 0, 'adminrejectorder': 0, 'todaydelivery': 0, 'todayorder': 0,'deliveryremainder':0 };
    private _init = false;
	accessData;
	records =[];
	public loadingPicture = 'assets/img/theme/loading.gif';
    constructor( private location: Location,private router: Router, private service: PieChartService, private commonservice: CommonService ) {
        this.service.getDashboardOrderStatusData().then(( data ) => {
            this.dashboarddata = data;
			this.records       =[];
			this.records.push(data);
			console.log(this.records);
        } );
		
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[2])[0];

    }

    ngAfterViewInit() {
        if ( !this._init ) {
            this._init = true;
        }

    }

}
