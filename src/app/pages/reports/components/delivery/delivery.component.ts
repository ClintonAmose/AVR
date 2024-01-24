import { Component, OnInit } from '@angular/core';
import { DeliveryService} from './delivery.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../excel.service';
import { CommonService } from '../../../common/common.service';
import { Location } from '@angular/common';
import { IMyDpOptions } from 'mydatepicker';
import { ModalComponent } from '../../../common/modal/modal.component';
import { GlobalState } from '../../../../global.state';
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css', '../../../tables/components/dataTables/dataTables.scss']
})
export class DeliveryComponent implements OnInit {
    filter_records = this.getEmptyfilterDetail();
   public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    };
    data;
    filterQuery = '';
    rowsOnPage = 50;
    rowsOnPageSet = [50,100,150];
    sortBy = 'id_orderdetails';
    sortOrder = 'desc';
	accessData;
    records =[];  
	public defaultPicture = 'assets/img/theme/loading.gif';
	modal: ModalComponent;
	title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
	rejectdetails      = this.getRejectEmptyData();
	public isMenuCollapsed: boolean = false;
	
    constructor(private location: Location, private router: Router, private service: DeliveryService, private commonservice: CommonService,
	private excelService: ExcelService,private _state: GlobalState )
	{
		this.excelService = excelService;
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
		
		
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[2])[0];
		
		 this._state.subscribe( 'menu.isCollapsed', ( isCollapsed ) => {
            this.isMenuCollapsed = isCollapsed;
        } );
		 
        this.toggleMenu();
		
    }

    ngOnInit() {
        this.getCustomerOrderlist();
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
	
	// Get Empty Data

	getRejectEmptyData()
	{
		 return {
			id_orderdetails:'',
			id:'',
			reject_reason:''
		 }

	}
	
    public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
		console.log(this.isMenuCollapsed);
        this._state.notifyDataChanged( 'menu.isCollapsed', this.isMenuCollapsed );
        return false;
    }
	
	
	 // Form Open And Close
    open() {
        this.modal.open();
    } 
    close() {
        this.modal.close();
    }
	model_close() {
        this.modal.close();
    }
    bindModal( _modal ) {
        this.modal = _modal;
    }
	
	    // cretae the Adminorder Detalis
    reorderdetails(id_orderdetails,order) {
        this.title             = 'Reject Order Detalis';
	    this.rejectdetails    = this.getRejectEmptyData();
        this.isEditMode = false;
        this.isAddMode  = true;
        this.open();
        this.rejectdetails.id              = id_orderdetails;		
        this.rejectdetails.id_orderdetails = order.id_order;		
    }
	
    getCustomerOrderlist() {
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
        this.service.getDeliveryReadyStatusData({'from_date':this.filter_records.from_date,'to_date':this.filter_records.to_date}).then(( data ) => {
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
	   this.getCustomerOrderlist();
    } 
   exportToExcel()
   {
	   this.excelService.exportAsExcelFile(this.data,'Customer Delivery');
   }
   
   saverejectorder(isUpdate,canClose)
   {
	    this.service.reject_customerorder( { 'rejectdetails' : [this.rejectdetails]} ).then(( data ) => {
              if(data.success)
    			    {
						this.commonservice.showAlertMSG( 1, data.message );					
                    }
					else
					{
						this.commonservice.showAlertMSG( 2, data.message );
					}
					 if ( canClose ) {
					this.modal.close();
				  }
				   this.rejectdetails = this.getRejectEmptyData();
				    this.getCustomerOrderlist();
			});	
   }
   
   
}
