import { Component, OnInit,ViewChild,NgZone,Output,ElementRef,EventEmitter,ChangeDetectorRef, ComponentRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkinProcessService } from './workinprocess.service';
import { ModalComponent } from '../../../common/modal/modal.component';
import { Location } from '@angular/common';
import { ExcelService } from '../../excel.service';
import { CommonService,BaseAPIURL,BaseURL } from '../../../common/common.service';
import { CompleterCmp, CompleterData, CompleterService, CompleterItem, RemoteData } from 'ng2-completer';
import { Http, Headers, RequestOptions } from '@angular/http';
import { IMyDpOptions } from 'mydatepicker';
@Component({
  selector: 'app-workinprocess',
  templateUrl: './workinprocess.component.html',
  styleUrls: ['./workinprocess.component.css','../../../tables/components/dataTables/dataTables.scss']
})
export class WorkinprocessComponent implements OnInit {
    filter_records = this.getEmptyfilterDetail();
   public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    };
    modal: ModalComponent;
    priorityLDtitle = '';
    data;
	cusorderlist;
	vendororderlist;
    filterQuery = '';
    rowsOnPage = 50;
    rowsOnPageSet = [50,100,150];
    sortBy = 'id_orderdetails';
    sortOrder = 'desc';
    title: string = '';
	assignvendor = "";
	firstname="";
	firstname1="";
	vendors =[];
    isEditMode: boolean = false;
    isAddMode: boolean = false;
	accessData;
    records =[];
    customer =[];
    vendor =[];
	orderweight =0;
	smallweight ='';
	smallqty;
	public loadingPicture = 'assets/img/theme/loading.gif';
	public itemsRemote: RemoteData;
	public customersRemote: RemoteData;
	private _header: Headers;
	@ViewChild( "remoteDataExample" ) private remoteDataExample: CompleterCmp;
	
    constructor(private location: Location,completerService: CompleterService,http: Http,private route: ActivatedRoute, private router: Router, private service: WorkinProcessService, private commonservice: CommonService,private excelService: ExcelService ) { 
		//Get User rights
		let currentURL  = this.location.path();
		let path        = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[2])[0];
	
		this._header = new Headers();
		this._header.append( 'Content-Type', 'application/json;charset=UTF-8' );
		this._header.append( 'Authorization', 'Basic ' + btoa( 'lmxretail' + ':' + 'lmx@2017' ) );
		
        this.itemsRemote = completerService.remote( BaseAPIURL + 'Master_api/autocompletecusotmers?search=',"firstname","firstname" );
        this.itemsRemote.headers( this._header );
        this.itemsRemote.dataField( "responseData" );
       
		this.customersRemote = completerService.remote( BaseAPIURL + 'Master_api/autocompletevendors?search=',"firstname1","firstname1" );
        this.customersRemote.headers( this._header );
        this.customersRemote.dataField( "responseData" );
		
		
	}

    ngOnInit() {
        this.getData();
		this.getVendorslist();
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
        this.service.getData({'from_date':this.filter_records.from_date,'to_date':this.filter_records.to_date}).then(( data ) => {
            this.data = data;
			this.cusorderlist =data;
			this.vendororderlist =data;
			this.getWeight();
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
	   this.getData();
    }
	getWeight()
	{
		this.orderweight =0;
		let order_qty  =0;
		this.smallweight='';
			this.data.forEach(( order ) => { // foreach statement
                 this.orderweight +=order.weight;
				 order_qty        +=parseFloat(order.totalitems);
             } ); 
		     var a              = this.orderweight;
			 this.smallweight   = a.toFixed(3);
			 this.smallqty      = order_qty.toFixed(2);
	}
	
	
	
	getVendorslist() {
        this.service.getVendorData().then(( data ) => {
            this.vendors = data;
        } );
    }
	
	onRawcustomerSelected(selected: CompleterItem)
	{
		let cusotmer ='';
		if(selected){
		   cusotmer = selected.originalObject.id;
		}
		
		
		if(cusotmer == ''){
			this.data = this.cusorderlist;
			this.getWeight();
		}else{
			
			let filteredOrders = this.cusorderlist.filter(o => o.id_customer == cusotmer);
			this.data = filteredOrders;
			this.getWeight();
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
			this.getWeight();
		}else{
			
			let filteredOrders = this.vendororderlist.filter(o => o.id_karigar == vendor);
			this.data = filteredOrders;
			this.getWeight();
		}
		
	}
	
	cusotmer_record($event)
	{
	}
	
	exportToExcel()
   {

	   this.excelService.exportAsExcelFile(this.data,'Overdue');
   }
	
}
