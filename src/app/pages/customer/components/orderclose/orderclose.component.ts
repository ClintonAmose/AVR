import { Component, OnInit,ViewChild,NgZone,Output,ElementRef,EventEmitter,ChangeDetectorRef, ComponentRef } from '@angular/core';
import { OrdercloseService } from './orderclose.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ModalComponent } from '../../../common/modal/modal.component';
import { ExcelService } from '../../excel.service';
import { CommonService,BaseAPIURL,BaseURL } from '../../../common/common.service';
import { CompleterCmp, CompleterData, CompleterService, CompleterItem, RemoteData } from 'ng2-completer';
import { Http, Headers, RequestOptions } from '@angular/http';
import { IMyDpOptions } from 'mydatepicker';
@Component( {
    selector: 'app-orderclose',
    templateUrl: './orderclose.component.html',
    styleUrls: ['./orderclose.component.css', '../../../tables/components/dataTables/dataTables.scss']
} )
export class OrdercloseComponent implements OnInit {
    filter_records = this.getEmptyfilterDetail();
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    };
    data;
	cusorderlist;
	vendororderlist;
    filterQuery = '';
	rowsOnPage = 50;
    rowsOnPageSet = [50,100,150];
    sortBy = 'id_orderdetails';
    sortOrder = 'desc';
    overalluser;
    alluser;
    orderdetailsmodal: ModalComponent;
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    orderdetails = [];
	accessData;
    firstname="";
	firstname1="";
	records =[];
	public loadingPicture = 'assets/img/theme/loading.gif';
	public itemsRemote: RemoteData; 
	public customersRemote: RemoteData;
	private _header: Headers;
	@ViewChild( "remoteDataExample" ) private remoteDataExample: CompleterCmp;
	
    constructor(private location: Location,completerService: CompleterService,http: Http,private route: ActivatedRoute, private router: Router, private service: OrdercloseService, private commonservice: CommonService,private excelService: ExcelService) {
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
		
		this._header = new Headers();
		
		this._header.append( 'Authorization', 'Basic ' + btoa( 'lmxretail' + ':' + 'lmx@2017' ) );
		
        this.itemsRemote = completerService.remote( BaseAPIURL + 'Master_api/autocompletecusotmers?search=',"firstname","firstname" );
        this.itemsRemote.headers( this._header );
        this.itemsRemote.dataField( "responseData" );
		
		this.customersRemote = completerService.remote( BaseAPIURL + 'Master_api/autocompletevendors?search=',"firstname1","firstname1" );
        this.customersRemote.headers( this._header );
        this.customersRemote.dataField( "responseData" );
		
		
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
        this.service.getData({'from_date':this.filter_records.from_date,'to_date':this.filter_records.to_date}).then(( data ) => {
            this.data = data;
			this.cusorderlist =data;
			this.vendororderlist =data;
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
    bindOrderDetailModal( _modal ) {
        this.orderdetailsmodal = _modal;
    }
    closeorderdetailmodal() {
        this.orderdetails = [];
        this.orderdetailsmodal.close();
    }
    vieworderdetails( id_order ) {
        this.title = 'View Order Details';
        this.isAddMode = false;
        this.isEditMode = false;
        this.getOrderDetailById( id_order );
        this.orderdetailsmodal.open();
    }
    getOrderDetailById( orderid ) {
        this.service.getOrderDetailsById( orderid ).then( res => {
            if ( res ) {
                this.orderdetails = res;
            }
        }, error => {
            console.log( error );
        } );
    }
	
 overall_kycdetalis(checked)
  {
	 
		  this.alluser = checked;
		  this.overalluser = checked;
		  this.data.forEach(orders =>
		  { 
		        if(checked == true)
	            {     
			    orders.isChecked=true;
				}
			    else if(checked == false)
				{
					orders.isChecked=false;  
				}
		  });
  }
	
   closeorder() {
        let deliveryorders = [];
        this.data.forEach(( orders ) => { // foreach statement  
            if ( orders.isChecked == true ) {
                //deliveryorders
                let delivery = {
                    id_orderdetails: orders.id_orderdetails
                };
                deliveryorders.push( delivery );
            }
        } )
        if ( deliveryorders.length>0 ) {
            this.service.updateorderclose( JSON.stringify( { readydelivery: deliveryorders } ) ).then( res => {
                if ( res ) {
                    this.getCustomerOrderlist();
                    if ( res.success ) {
						this.overalluser =false;
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                }
            }, error => {

            } );
        }
		else
		{
			this.commonservice.showAlertMSG( 2, "Please Select AnyOne Order ProPerly");
		}
    }
	
	onRawcustomerSelected(selected: CompleterItem)
	{
		let cusotmer ='';
		if(selected){
		   cusotmer = selected.originalObject.id;
		}
		
		
		if(cusotmer == ''){
			this.data = this.cusorderlist;
			
		}else{
			
			let filteredOrders = this.cusorderlist.filter(o => o.id_customer == cusotmer);
			this.data = filteredOrders;
			
		}
		
	}
	
	
	onRawvendorSelected(selected: CompleterItem)
	{
		let vendor ='';
		if(selected){
		   vendor = selected.originalObject.id;
		}
		if(vendor == ''){
			this.data = this.vendororderlist;
			
		}else{
			
			let filteredOrders = this.vendororderlist.filter(o => o.id_karigar == vendor);
			this.data = filteredOrders;
			
		}
		
	}
	
	exportToExcel()
   {

	   this.excelService.exportAsExcelFile(this.data,'WorkingProcess');
   }
	
	

}
