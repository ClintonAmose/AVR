import { Component,OnInit,ViewChild,NgZone,Output,ElementRef,EventEmitter,ChangeDetectorRef, ComponentRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobordersService } from './joborders.service';
import { ModalComponent } from '../../../common/modal/modal.component';
import { Location } from '@angular/common';
import { GlobalState } from '../../../../global.state';
import { CommonService,BaseAPIURL,BaseURL } from '../../../common/common.service';
import { CompleterCmp, CompleterData, CompleterService, CompleterItem, RemoteData } from 'ng2-completer';
import { Http, Headers, RequestOptions }from '@angular/http';
import { IMyDpOptions } from 'mydatepicker';
@Component( {
    selector: 'app-joborders',
    templateUrl: './joborders.component.html',
    styleUrls: ['./joborders.component.css', '../../../tables/components/dataTables/dataTables.scss']
} )
export class JobordersComponent implements OnInit {
   filter_records = this.getEmptyfilterDetail();
   public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    };
    data;
	records =[];
    filterQuery = '';
	cusorderlist;
	vendororderlist;
    rowsOnPage = 50;
	rowsOnPageSet = [50,100,150];
    sortBy = 'orderno';
    sortOrder = 'desc';
	title='';
	accessData;
    public isMenuCollapsed: boolean = false;
	
	images;
	isEditMode: boolean = false;
    isAddMode: boolean = false;
	imgmodal: ModalComponent;
	orderdetailsmodal: ModalComponent;
	orderdetails = [];
	branches =[];
	assignbranch = "";
	firstname1="";
	loading = "";
	public customersRemote: RemoteData;
	private _header: Headers;
	public defaultPicture = 'assets/img/theme/loading.gif';
	public logoPicture = 'assets/img/logo.png';

	@ViewChild( "remoteDataExample" ) private remoteDataExample: CompleterCmp;
	
    constructor( private location: Location,completerService: CompleterService,http: Http,private route: ActivatedRoute, private router: Router,private service: JobordersService, private commonservice: CommonService,private _state: GlobalState) {		
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
		
	    this._state.subscribe( 'menu.isCollapsed', ( isCollapsed ) => {
            this.isMenuCollapsed = isCollapsed;
        } );
		 
        this.toggleMenu(); 
		
		this._header = new Headers();
		
		this._header.append( 'Authorization', 'Basic ' + btoa( 'lmxretail' + ':' + 'lmx@2017' ) );
		
		this.customersRemote = completerService.remote( BaseAPIURL + 'Master_api/autocompletevendors?search=',"firstname1","firstname1" );
        this.customersRemote.headers( this._header );
        this.customersRemote.dataField( "responseData" );
    }
    
	  public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged( 'menu.isCollapsed', this.isMenuCollapsed );
        return false;
    } 
	
    ngOnInit() {
        this.getVendorsJoblist();
		this.getBranches();
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
	
    getVendorsJoblist() {
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
	   this.getVendorsJoblist();
    }
	
	  getBranches()
    {
       this.service.getBranchData().then(( data ) => {
              this.branches = data;
          } );
    }
	
	getorder_number(order_number)
	{
		return order_number+'.';
		
	}
	
	getimage(cus_images)
	{
	     var cus_img ='';
			cus_images.forEach(( img,ind ) => { // foreach statement
                   cus_img+=img+' ';
             } );  
			 
		return cus_img; 
		//return cus_images[0]+','+' '+cus_images[1];
	}
	
	
/* public config: ICarouselConfig = {
			verifyBeforeLoad: true,
			log: false,
			animation: true,
			animationType: AnimationConfig.SLIDE,
			autoplay: true,
			autoplayDelay: 2000,
			stopAutoplayMinWidth: 768
    };  */
	 
	
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
		console.log(this.orderdetails);
        this.orderdetailsmodal.open();
    }
   
    ordertypeFilter(type:string){
		if(type == ''){
			this.data = this.cusorderlist;
			
		}else{
			
			let filteredOrders = this.cusorderlist.filter(o => o.cus_branch == type);
			this.data = filteredOrders;
			if(this.data.length==0)
			{
				  this.commonservice.showAlertMSG( 2, 'No Avaliable Orders Data');
			}
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
			
			let filteredOrders = this.vendororderlist.filter(o => o.id_vendor == vendor);
			this.data = filteredOrders;
			
		}
		
	}
   
   
	customerorder_print($event,item): void {
		
		let popupWin,printContents;
		printContents = item;
		console.log(item);
		let order_images = [];
		let orderdata       = this.data.filter(item => item.id == printContents.id);
		if(orderdata[0].customimages !='')
		 {
				order_images = orderdata[0].customimages;
		 }
		 else
		  {
			  order_images.push(orderdata[0].image);
       	  }
		// Print Content Operations
		
		popupWin = window.open('','_blank','top=0,left=0,height=100%,max-width=100%,padding=0;margin:0');
		//popupWin.document.open();
		for(var i=0;i<order_images.length;i++) {
			let imageurl = order_images[i];
		  popupWin.document.write(` 
		  <html>`);
		  if(i==0) {
		  popupWin.document.write(` 
		   <h3 style="marign-left:25px;"><center><img src="${this.logoPicture}" max-width='170px' height="150px"></center></h3>
		   <h3 style="marign-left:25px;"><center>Customer Order List</center></h3>`);
		  }
		  popupWin.document.write(`
		   <body onload="window.print();">
		   <center><img src="${imageurl}" max-width='660px' height="600px">
		   <br><br>`);
		}
		  popupWin.document.write(`
		    <table border="0" style="border:1px solid #000000;padding:5px;marign-left:25px;">
			<tbody>
					<tr>
					    <td width="230px" style="fontSize:17px;">Order Number</td>
						<td width="20px">:</td>
						<td><label>${printContents.orderno}</label></td>
						<td width="230px" style="fontSize:15px;">Custom Order</td>
						<td width="20px">:</td>
						<td>${printContents.is_customeitem}</td>
					</tr>
					<tr>
					    <td width="230px" style="fontSize:17px;fontWeight:bold">Item</td>
						<td width="20px">:</td>
						<td><label>${printContents.id_product}</label></td>
						<td width="230px" style="fontSize:15px;">Size</td>
						<td width="20px">:</td>
						<td><label>${printContents.size}</label></td>
					</tr>
					<tr>
					    <td width="230px" style="fontSize:17px;fontWeight:bold">Total Items</td>
						<td width="20px">:</td>
						<td><label>${printContents.order_qty}</label></td>
						<td width="230px" style="fontSize:15px;">Weight</td>
						<td width="20px">:</td>
						<td><label>${printContents.weight}</label></td>
					</tr>
					<tr>
					    <td width="230px" style="fontSize:17px;fontWeight:bold">Order Status</td>
						<td width="20px">:</td>
						<td><label>${printContents.orderstatus}</label></td>
						<td width="230px" style="fontSize:15px;">Order Type</td>
						<td width="20px">:</td>
						<td><label>${printContents.ortertype}</label></td>
					</tr>
					<tr>
					    <td width="230px" style="fontSize:15px;">Customer</td>
						<td width="20px">:</td>
						<td><label>${printContents.order_to}</label></td>
						<td width="230px" style="fontSize:15px;">Due Date</td>
						<td width="20px">:</td>
						<td><label>${printContents.due_date}</label></td>
					</tr>
					<tr>
					    <td width="230px" style="fontSize:17px;fontWeight:bold">Order Date</td>
						<td width="20px">:</td>
						<td><label>${printContents.order_date}</label></td>
						<td width="230px" style="fontSize:15px;">Delivery Date</td>
						<td width="20px">:</td>
						<td><label>${printContents.deliverydate}</label></td>
					</tr>
					<tr>
					    <td width="230px" style="fontSize:17px;fontWeight:bold">Description</td>
						<td width="20px">:</td>
						<td colspan="4"><label>${printContents.description}</label></td>
						
					</tr>
				</tbody>
			</table></center>
	</body>
</html>`
		);
		popupWin.document.close();
	}
	
	
	
}
