import { Component, OnInit } from '@angular/core';
import { DeliveryremainderService } from './deliveryremainder.service';
import { Router } from '@angular/router';
import { CommonService } from '../../../common/common.service';
import { ModalComponent } from '../../../common/modal/modal.component';
import { Location } from '@angular/common';
import { GlobalState } from '../../../../global.state';
import { IMyDpOptions } from 'mydatepicker';
@Component({
  selector: 'app-deliveryremainder',
  templateUrl: './deliveryremainder.component.html',
  styleUrls: ['./deliveryremainder.component.css','../../../tables/components/dataTables/dataTables.scss']
})
export class DeliveryremainderComponent implements OnInit {
   
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    };
	filter_records;
    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 10;
    rowsOnPageSet = [50,100,150];
    sortBy = 'id_customerorder';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
	accessData;
    records =[];
	orderdetails;
	public loadingPicture = 'assets/img/theme/loading.gif';
	imgmodal: ModalComponent;
	orderdetailsmodal: ModalComponent;
	images;
	deliveryremainder;
	public isMenuCollapsed: boolean = false;
    constructor(private location: Location, private service: DeliveryremainderService, private commonservice: CommonService,private _state: GlobalState) { 
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[2])[0];
	    this.toggleMenu(); 
		
		 this.service.getDeliveryremainder().then(( data ) => {
              this.deliveryremainder = data[0].delivery_remainder;
			  this.filter_records = this.getEmptyfilterDetail();
			  this.getData();
			  
		 });
		
    }
	
	 public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
		console.log(this.isMenuCollapsed);
        this._state.notifyDataChanged( 'menu.isCollapsed', this.isMenuCollapsed );
        return false;
    }
    ngOnInit() {
    }
 	
    getEmptyfilterDetail()
	{
				var date     = new Date();
				var firstDay = new Date(date.getFullYear(), date.getMonth(),date.getDate() + this.deliveryremainder, 1);
				return {
					from_day: {
							date: {
								year: date.getFullYear(),
								month: date.getMonth()+1,
								day: date.getDate()
							}
						},
					from_date:'',
					last_day: {
							date: {
								year: firstDay.getFullYear(),
								month: firstDay.getMonth()+1,
								day: firstDay.getDate()
							}
						},
					to_date:'',
					employee:'',
				}
		
	}	
   
	//Get all the size values
	getData() {

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
          this.service.getData({'from_date':this.filter_records.from_date,'to_date':this.filter_records.to_date,'delivery_remainder':this.deliveryremainder}).then(( data ) => {
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
		 this.commonservice.showAlertMSG( 2, "No Records Founded" );
	}
	// Get Filter Data
	getfilter_data()
    {
	   this.getData();
    }
	
	orderImage( id_orderdetail ) {
          this.title          = 'Customorder Images';
		  this.images = [];
		  let orderdata       = this.data.filter(item => item.id_orderdetails == id_orderdetail);
		  if(orderdata[0].customimages !='')
		  {
		  this.images         = orderdata[0].customimages;
		  }
		  else
		  {
			  this.images.push(orderdata[0].image);
       	  }
		  this.imgmodal.open();
    }

	bindImageModal( _modal ) { 
        this.imgmodal = _modal;
    }	
	
	closeImageModal() {
        this.images = [];
        this.imgmodal;
    }
	
	bindOrderDetailModal( _modal ) {
        this.orderdetailsmodal = _modal;
    }
    closeorderdetailmodal() {
        this.orderdetails = [];
        this.orderdetailsmodal;
    }
	close() {
        this.orderdetails = [];
        this.orderdetailsmodal.close();
    }
    vieworderdetails( id_order,order) {
        this.title = 'View Order Details';
        this.isAddMode = false;
        this.isEditMode = false;
		this.orderdetails =[];
        this.orderdetails.push(order);
        this.orderdetailsmodal.open();
    }
	
	
	update_orderdetails(orders)
	{
		if(orders)
		{
			 this.service.updatevenfeedback( JSON.stringify( { ven_feedback: orders ,jobid :orders[0].id} ) ).then( res => {
                if ( res ) {
                    this.getData();
					 this.orderdetailsmodal.close();
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
					 
                }
            }, error => {

            } );
		}
	}
	
	
}
