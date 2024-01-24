import { Component, OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminorderService } from './adminorder.service';
import { ModalComponent } from '../../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { CommonService,BaseAPIURL } from '../../../common/common.service';
import { CategoryService } from '../../../master/category/category.service';
import { DesignService } from '../../../master/design/design.service';
import { Location } from '@angular/common';
import { CompleterCmp, CompleterData, CompleterService, CompleterItem, RemoteData } from 'ng2-completer';
import { Http, Headers, RequestOptions } from '@angular/http';
import { IMyDpOptions } from 'mydatepicker';
@Component( {
    selector: 'app-adminorder',
    templateUrl: './adminorder.component.html',
    styleUrls: ['./adminorder.component.css','../../../tables/components/dataTables/dataTables.scss']
} )
export class AdminorderComponent implements OnInit {
    filter_records = this.getEmptyfilterDetail();
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    };
    modal: ModalComponent; 
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
	records =[];
    filterQuery = '';
    rowsOnPage = 50;
	rowsOnPageSet = [50,100,150];
    sortBy = 'id_customerorder';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
	  disablesubmit = false;
    adminorderdetails = this.getAdminorderEmptyData();
    admindetails      = this.getAdminEmptyData();
	  accessData;
    branches  = [];
    purities  = [];
    vendors   = [];
    designs_form   = [];
	public loadingPicture = 'assets/img/theme/loading.gif';
    public itemsRemote: RemoteData;
	private _header: Headers;
	
	@ViewChild( "remoteDataExample" ) private remoteDataExample: CompleterCmp;

    constructor( private location: Location,completerService: CompleterService,http: Http,private service: AdminorderService,private route: ActivatedRoute, private router: Router, private commonservice: CommonService) {
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
		this._header = new Headers();
        //this._header.append( 'Content-Type', 'application/json;charset=UTF-8' );


		this._header.append( 'Authorization', 'Basic ' + btoa( 'lmxretail' + ':' + 'lmx@2017' ) );
        this.itemsRemote = completerService.remote( BaseAPIURL + 'Master_api/autocompletedesigns?search=',"name","name" );
        this.itemsRemote.headers( this._header );
        this.itemsRemote.dataField( "responseData" );


	}

    ngOnInit() {
		this.getAdminorders();
		this.getBranches();
		this.getPurities();
		this.getVendors();
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
	getAdminorders()
	{
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
        this.service.getAdmin_orders({'from_date':this.filter_records.from_date,'to_date':this.filter_records.to_date}).then(( data ) => {
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
	   this.getAdminorders();
    }
	  // Get All Branches
	getBranches()
	{
	   this.service.getBranchData().then(( data ) => {
            this.branches = data;
        } );
	}

	// Get  All Purities
	getPurities()
	{
		this.service.getPurityData().then(( data ) => {
            this.purities = data;
        } );
	}
	// Get Vendors

	getVendors()
	{
		this.service.getVendorData().then(( data ) => {
            this.vendors = data;
			
        } );
	}

	// Get Empty Data

	getAdminEmptyData()
	{
		 return {
			order_for:1,
			order_to:'1',
			order_taken_by:'0'
		 }

	}

	getAdminorderEmptyData()
	{
		 return {
    			isurgent:0,
    			is_customeitem:0,
                id_product:'',
    			name:'',
    			branchid: '',
    			qty:'',
                id_purity: '',
                reqweight: '',
    			is_chain:0,
                hook_type:'',
    			id_karigar: '', 
    			remarks: '',
    			sizeorlen:'',
    			customimages:[],
    			prodefaultimg:'assets/img/theme/emptydesign.png',
    			productimgdetails:'',
    			s_hook_type:0,
    			m_hook_type:0,
    			ortertype:'4',
                order_taken_by:1,
      }
	}


	 // Form Open And Close
    open() {
        this.modal.open();
    }
    close() {
        this.modal.close();
    }
    bindModal( _modal ) {
        this.modal = _modal;
    }



     // cretae the Adminorder Detalis
    createadminorderdetails() {
        this.title             = 'Create Admin Order Detalis';
	    this.adminorderdetails = this.getAdminorderEmptyData();
        this.isEditMode = false;
        this.isAddMode  = true;
        this.open();
    }

	onRawdesignSelected( selected: CompleterItem ) {
        if ( selected ) {
           let select_purity = this.purities[0].id_purity;
           this.adminorderdetails.id_purity = select_purity;
           this.adminorderdetails.id_product = selected.originalObject.id;
    		   let designid = this.adminorderdetails.id_product;

    		    this.service.getDesignById( designid ).then(( data ) => {
                 if ( data.success ) {
    				 let a                                 = data.responseData;
					 this.adminorderdetails.prodefaultimg  = a.prodefaultimg;
					 if(a.size>0)
					 {
    				 this.adminorderdetails.sizeorlen      = a.size;
					 }
    				 this.adminorderdetails.is_chain       = a.is_chain;
    				 this.adminorderdetails.reqweight      = a.netweight_design;
             this.adminorderdetails.m_hook_type            = a.m_hook_type;
             this.adminorderdetails.s_hook_type            = a.s_hook_type;
            
    			   }
    			});

    			this.service.getDesignPuritiesById( designid ).then(( data ) => {
              if(data.success)
    			    {
               let purity      = data.responseData;
      			   this.purities   = [];
      				 this.purities   = purity;
              }
         });
      }
  }

	saveAdminorder(isUpdate,canClose)
	{
      this.admindetails.order_to =  this.adminorderdetails.branchid;
		  this.service.saveadminorder( JSON.stringify( { 'cusdetails' :  this.admindetails,'orders' : [this.adminorderdetails] } ) ).then( res => {
			if ( res ) {
			  if ( res.success ){
				this.commonservice.showAlertMSG( 1, res.message );
			  } else{
				this.commonservice.showAlertMSG( 2, res.message );
			  }
			  if ( canClose ) {
				this.modal.close();
			  }
			  this.adminorderdetails = this.getAdminorderEmptyData();
			  this.getAdminorders();
			}
		  }, error => {
        this.disablesubmit = false;

      } );
	}

	// Qty String Format
	qty_keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

	// Design wise get puritiy
	/*  designsfomat($event)
	 {
		  let designid = $event.target.value;

		    this.service.getDesignById( designid ).then(( data ) => {
             if ( data.success ) {
				let a = data.responseData;
				//console.log(a);
				 this.adminorderdetails.size =a.size;
			   }
			});

	 } */

}
