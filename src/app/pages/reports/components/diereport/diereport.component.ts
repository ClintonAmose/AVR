import { Component, OnInit } from '@angular/core';
import { DiereportService } from './diereport.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../excel.service';
import { Location } from '@angular/common';
import { CommonService } from '../../../common/common.service';
@Component( {
    selector: 'app-diereport',
    templateUrl: './diereport.component.html',
    styleUrls: ['./diereport.component.css', '../../../tables/components/dataTables/dataTables.scss']
} )
export class DiereportComponent implements OnInit {

    data;
    columns;
    filterQuery = '';
    rowsOnPage = 100;
    sortBy = 'id';
    sortOrder = 'desc';
	accessData;
	
    constructor( private location: Location, private router: Router, private service: DiereportService, private commonservice: CommonService,private excelService: ExcelService ) 
	{
		this.excelService = excelService;
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
    }

    ngOnInit() {
        this.getDesignDieReportlist();
    }
    getDesignDieReportlist() {
        this.service.getReqDieForDesignData().then(( data ) => {
            this.columns = data.dies;
            this.data = data.designdetails;
			console.log(this.columns);
			console.log(this.data);
        } );
    }
	
    exportToExcel()
   {
	   this.excelService.exportAsExcelFile(this.data,'Die Report');
   }
}
