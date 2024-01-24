import { Component, OnInit } from '@angular/core';
import { VenorderstatusService } from './venorderstatus.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../excel.service';
import { CommonService } from '../../../common/common.service';
import { Location } from '@angular/common';
import { IMyDpOptions } from 'mydatepicker';
@Component( {
    selector: 'app-venorderstatus',
    templateUrl: './venorderstatus.component.html',
    styleUrls: ['./venorderstatus.component.css', '../../../tables/components/dataTables/dataTables.scss']
} )
export class VenorderstatusComponent implements OnInit {
   filter_records = this.getEmptyfilterDetail();
   public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    }; 
    data;
    filterQuery = '';
    rowsOnPage = 50;
    rowsOnPageSet = [50,100,150];
    sortBy = 'id';
    sortOrder = 'desc';
	accessData;
	records =[];
	public defaultPicture = 'assets/img/theme/loading.gif';
    constructor( private location: Location,private router: Router, private service: VenorderstatusService, private commonservice: CommonService,private excelService: ExcelService ) 
	{
		this.excelService = excelService;
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
    }

    ngOnInit() {
        this.getVendorOrderlist();
    }
	getEmptyfilterDetail()
	{
		var date     = new Date();
		var firstDay = new Date(date.getFullYear(), date.getMonth(),date.getDate() - 7, 1);
		return {
			from_day: {
					date: {
						year: firstDay.getFullYear(),
						month: firstDay.getMonth()+1,
						day: firstDay.getDate()
					}
				},
			from_date:'',
			last_day: {
					date: {
						year: date.getFullYear(),
						month: date.getMonth()+1,
						day: date.getDate()
					}
				},
			to_date:'',
			employee:'',
        }
	}
    getVendorOrderlist() {
        if( this.filter_records.from_day != null ) {
		   var day     = this.filter_records.from_day.date.day;
		   var month   = this.filter_records.from_day.date.month;
		   var year    = this.filter_records.from_day.date.year;
		   this.filter_records.from_date = day.toString()+ "-" +month.toString()+ "-" +year.toString();
         }
        if( this.filter_records.last_day != null ) {
		   var day     = this.filter_records.last_day.date.day;
		   var month   = this.filter_records.last_day.date.month;
		   var year    = this.filter_records.last_day.date.year;
		   this.filter_records.to_date = day.toString()+ "-" +month.toString()+ "-" +year.toString();
         }
        this.service.getVendorOrderStatusData({'from_date':this.filter_records.from_date,'to_date':this.filter_records.to_date}).then(( data ) => {
            this.data = data;
			if(this.data.length <=0)
			  {
				  setTimeout(() => {
					this.battleInit(); 
					}, 2000);
			  }
			  else if(this.data.length>0)
			  {
				  this.records =this.data;
			  }
        } );
    }
	battleInit()
	{
		this.records.push('wholesale');
	}
	// Get Filter Data
	getfilter_data()
    {
	   this.getVendorOrderlist();
    }
    exportToExcel()
   {
	   this.excelService.exportAsExcelFile(this.data,'Vendor Status');
   }
}
