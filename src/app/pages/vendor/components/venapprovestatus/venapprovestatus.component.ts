import 'hammerjs';
import { Component, OnInit , enableProdMode,ViewChild } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { VendorApprovestatusService } from './venapprovestatus.service';
import { Router } from '@angular/router';
import { ModalComponent } from '../../../common/modal/modal.component';
import { CommonService } from '../../../common/common.service';
import { VendorModule } from '../../../vendor/vendor.module';
import { Location } from '@angular/common';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { IMyDpOptions } from 'mydatepicker';
import { GlobalState } from '../../../../global.state';
/* import { SliderModule } from 'angular-image-slider'; */
/* import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';  */
import { environment } from '../../../../../environments/environment';
declare var jquery:any; 
declare var $ :any; 
import "../../../../../../node_modules/jquery/dist/jquery.js";
@Component( {
    selector: 'app-venapprovestatus',
    templateUrl: './venapprovestatus.component.html',
    styleUrls: ['./venapprovestatus.component.css', '../../../tables/components/dataTables/dataTables.scss']
} )
export class VendorApprovestatusComponent implements OnInit {
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
	title='';
	assignorder ="";
    vendors  = [];
	deliverydate ="";
	assign_deliverydate : Date = new Date();
     settings = {
		monthName:false,
        bigBanner: true,
        timePicker: true,
        format: 'dd-MM-yyyy hh:mm:ss a',
        defaultOpen: false,
		closeOnSelect:true
    }
   images;
   order_delivery = new Date();
	
	order_deliverydate = {
					date: {
						year: this.order_delivery.getFullYear(),
						month: this.order_delivery.getMonth() + 1,
						day: this.order_delivery.getDate()
					}
				};
	customer_due;
	customer_duedate;
	slideConfig;
	karigar_order_deliverydate =[];			
    public isMenuCollapsed: boolean = false;
	
	isEditMode: boolean = false;
    isAddMode: boolean = false;
	imgmodal: ModalComponent;
	orderdetailsmodal: ModalComponent;
	orderdetails = [];
	records =[];
	public loadingPicture = 'assets/img/theme/loading.gif';
    constructor( private location: Location,private router: Router, private service: VendorApprovestatusService, private commonservice: CommonService,private _state: GlobalState) 
	{ 
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
	   this._state.subscribe( 'menu.isCollapsed', ( isCollapsed ) => {
            this.isMenuCollapsed = isCollapsed;
        } );
		 
        this.toggleMenu(); 
    }
    
	 public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
		console.log(this.isMenuCollapsed);
        this._state.notifyDataChanged( 'menu.isCollapsed', this.isMenuCollapsed );
        return false;
    }
	 
	
	
    ngOnInit() {
        this.getVendorOrderlist();
		  	//console.log(this.order_deliverydate);
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
		this.commonservice.showAlertMSG(2, "No Records Found in karigar Work Status Page");
	}
	// Get Filter Data
	getfilter_data()
    {
	   this.getVendorOrderlist();
    }
	
	ondeliveryDateSelect($event)
	{
		let choosedate = $event;
	    this.deliverydate = choosedate.getDate() +"-"+(choosedate.getMonth()+1) +"-"+choosedate.getFullYear() +" "+choosedate.getHours()+":"+choosedate.getMinutes()+":"+choosedate.getSeconds();
	}
	
	
	
	joborderstatus()
	{
		  let acceptorders    = [];
		  let rejectorders    = [];
		  let completeorders  = [];
		  let orders_date     = [];
		  this.vendors =[];
          this.data.forEach(( orders ) => { // foreach statement
            if ( orders.isChecked == true ) {
				  if(orders.joborderstatus == 0 && this.assignorder !='3')
				  {
                    acceptorders.push( orders );
					rejectorders.push(orders);
	                this.vendors.push(orders.id_vendor);
				  }
				  else if(orders.joborderstatus == 3 && this.assignorder !='3')
				  {
					if(orders.delivery_items != 0 && orders.delivery_items != '' ){
						   if(orders.delivery_items <= orders.qty1){  
							   
							   if ( orders.isChecked == true) {
										completeorders.push(orders);
										acceptorders = [];
										rejectorders = [];
								  }
						   }
						   else
						   {
							    let obj = completeorders.filter( s=> s.delivery_items >=  orders.qty1);
								  if(obj.length > 0){
									let index: number = completeorders.indexOf(obj[0]);
									if (index !== -1) {
										completeorders.splice(index, 1);
									}
								  }
							   this.commonservice.showAlertMSG(2, "Delivery Item is greater than to Customer Order Items");
						   }
			         }
				   else
				   {
					 this.commonservice.showAlertMSG(2, "Please Enter Delivery Items");
					 completeorders =[];
					
				   }
			    }
				else if((orders.joborderstatus == 0 || orders.joborderstatus == 3) && this.assignorder =='3')
				{
					 if ( orders.isChecked == true) {
						        
								    orders_date.push(orders);
						               /*  var day     = orders.deliverydate.date.day;
										var month   = orders.deliverydate.date.month;
									    var year    = orders.deliverydate.date.year;
						                orders.deliverydate = day.toString()+ "-" +month.toString()+ "-" +year.toString();
									if(orders.due_date !=null) {	
										var day1     = orders.due_date.date.day;
										var month1   = orders.due_date.date.month;
									    var year1    = orders.due_date.date.year;
						                orders.due_date = day1.toString()+ "-" +month1.toString()+ "-" +year1.toString();
									}  */
										
								  }
				}
            }
       } )
		if ( acceptorders.length > 0 && this.assignorder =='1' ) {
			rejectorders =[];
            this.service.acceptjoborder( JSON.stringify( { joborders: acceptorders,vendorid:this.vendors[0],deliverydate:this.deliverydate } ) ).then( res => {
                if ( res ) {
                    this.getVendorOrderlist();
					this.assignorder='';
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                }
            }, error => {
                this.commonservice.showAlertMSG( 2, "Please select any one order" );
            } );
        } 
		else if ( rejectorders.length > 0 && this.assignorder =='2' ) {
            this.service.rejectjoborder( JSON.stringify( { joborders: rejectorders,vendorid:this.vendors[0],reason:'Not Match' } ) ).then( res => {
                if ( res ) {
                    this.getVendorOrderlist();
					this.assignorder='';
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                }
            }, error => {
                this.commonservice.showAlertMSG( 2, "Please select any one order" );
            } );
        } 
		else if( completeorders.length > 0 && this.assignorder =='4' ) 
		{
			this.service.completetjoborder( JSON.stringify( { joborders: completeorders } ) ).then( res => {
                if ( res ) {
                    this.getVendorOrderlist();
					this.assignorder ='';
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                }
            }, error => {
                this.commonservice.showAlertMSG( 2, "Please select any one order" );
            } );
		}
		else if( orders_date.length > 0 && this.assignorder == '3') 
		{
			console.log(orders_date);
			this.service.change_orderdate( JSON.stringify( { orders: orders_date } ) ).then( res => {
                if ( res ) {
                    this.getVendorOrderlist();
					this.assignorder ='';
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                }
            }, error => {
                this.commonservice.showAlertMSG( 2, "Please select any one order" );
            } );
		}
		else
		{
			 if ( this.assignorder =='4' && acceptorders.length>0 ) {
				this.assignorder ='';
                this.commonservice.showAlertMSG( 2, "Please select Order Options Accept Status" );
                return;
            }
			if(this.assignorder =='1' && completeorders.length > 0)
			{
				 this.assignorder ='';
				 this.commonservice.showAlertMSG( 2, "Please select Order Options Complete Status" );
                 return;
			}
			
			if(this.assignorder =='3' && orders_date.length > 0) {
				 this.assignorder ='';
				 this.commonservice.showAlertMSG( 2, "Please select Order Options Update OrderDates Status" );
                 return;
			}
            this.commonservice.showAlertMSG( 2, "Please select any one order" );
		}
	   
	}
	
	
	//partial_delivery Options
	
	 partial_delivery($event,partial)
    {
     let partial_delivery = $event.target.value;
	 
	 console.log(partial);
	 
	   if(partial_delivery <= partial.qty1){
		     partial.delivery_items = partial_delivery;
	   }
	   else if(partial_delivery > partial.qty1){
         $event.target.value = 0;
		     this.commonservice.showAlertMSG(2, "Delivery Item is greater than to Customer Order Items");
	   }
   }
  
   orderImage( id_orderdetail ) {
          this.title          = 'Customorder Images';
		  this.images = [];
		  let orderdata       = this.data.filter(item => item.id== id_orderdetail);
		
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
   closeImageModal()
	 {
          this.imgmodal;		  
	 }
	  
	 bindOrderDetailModal( _modal ) {
        this.orderdetailsmodal = _modal;
    }
    closeorderdetailmodal() {
        this.orderdetails = [];
        this.orderdetailsmodal;
    }
    vieworderdetails( id_order,order ) {
        this.title = 'View Order Details';
        this.isAddMode = false;
        this.isEditMode = false;
	    this.orderdetails.push(order);
        this.orderdetailsmodal.open();
    }
   
	 
}
