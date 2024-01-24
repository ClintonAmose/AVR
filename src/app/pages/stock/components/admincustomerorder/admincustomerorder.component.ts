import { Component,OnInit,ViewChild,NgZone,Output,ElementRef,EventEmitter,ChangeDetectorRef, ComponentRef,Injectable} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCustomerorderService } from './admincustomerorder.service';
import { ModalComponent } from '../../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { HotTablesComponent } from '../../../tables/components/hotTables/hotTables.component';
import { CommonService,BaseAPIURL,BaseURL } from '../../../common/common.service';
import { CategoryService } from '../../../master/category/category.service';
import { StockManageService } from '../../../master/stockmanage/stockmanage.service';
import { Location } from '@angular/common';
import { CompleterCmp, CompleterData, CompleterService, CompleterItem, RemoteData } from 'ng2-completer';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NgUploaderOptions, UploadedFile, UPLOAD_DIRECTIVES } from 'ngx-uploader';
import { IMyDpOptions } from 'mydatepicker';
import { ExcelService } from '../../../reports/excel.service';
import * as XLSX from 'xlsx';
import { MasterModule } from '../../../master/master.module';
import { GlobalState } from '../../../../global.state';
@Component( {
    selector: 'app-admincustomerorder',
    templateUrl: './admincustomerorder.component.html',
    styleUrls: ['./admincustomerorder.component.css','../../../tables/components/dataTables/dataTables.scss'],
	 providers: [StockManageService]
} )
export class AdminCustomerorderComponent implements OnInit {
   
     public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    };
	  filter_records = this.getEmptyfilterDetail();

    uploadFile: any;
	cusorderlist;
    uploadProgress: number;
    uploadResponse: Object;
    zone: NgZone;
    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
	firstname;
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
	accessDatas;
	accesspurity;
    branches  = [];
    purities  = [];
    vendors   = [];
	records    =[];
    designs_form   = [];
	productimagedata =[];
	resid='';
	order_images =[];
	arrayBuffer:any;
    file:File;
    stock_manages : any;
    public itemsRemote: RemoteData;
    public cusotmersRemote: RemoteData;
    public employeeRemote: RemoteData;
	private _header: Headers;
	
	
	
	
	// Images Upload Concepts
	public loadingPicture = 'assets/img/theme/loading.gif';
	private serverurl: string;
	private serverbaseurl: string;
    public defaultPicture = 'assets/img/theme/no-photo.png';
    public profile: any = {
        picture: 'assets/img/app/profile/Nasta.png'
    };
    public uploaderOptions: NgUploaderOptions;
	
	public isMenuCollapsed: boolean = false;
	
	@ViewChild( "remoteDataExample" ) private remoteDataExample: CompleterCmp;

    constructor( private location: Location,completerService: CompleterService,http: Http,private service: AdminCustomerorderService,private elRef: ElementRef, private cdRef: ChangeDetectorRef,private stockmanage : StockManageService,private route: ActivatedRoute, private router: Router, private commonservice: CommonService,
	private excelService: ExcelService,private _state: GlobalState, ) {
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
    
	    this.cusotmersRemote = completerService.remote( BaseAPIURL + 'Master_api/autocompletecusotmers?search=',"firstname","firstname" );
		this.cusotmersRemote.headers( this._header );
        this.cusotmersRemote.dataField( "responseData" ); 
		
		this.employeeRemote = completerService.remote( BaseAPIURL + 'Master_api/autocomplete_employs?search=',"firstname","firstname" );
		this.employeeRemote.headers( this._header );
        this.employeeRemote.dataField( "responseData" );
		
          // Image Upload Concepts
		this.serverurl = BaseAPIURL;
		this.serverbaseurl = BaseURL;
        this.uploadProgress = 0;
        this.uploadResponse = {};
        this.zone = new NgZone( { enableLongStackTrace: false } );
		this.getProductImageData();
		
		 this._state.subscribe( 'menu.isCollapsed', ( isCollapsed ) => {
            this.isMenuCollapsed = isCollapsed;
        } );
		 
        this.toggleMenu();
	
	}

    ngOnInit() {
		this.getAdminorders();
		this.getBranches();
		this.getPurities();
		this.getVendors();
		this.getStockManageData();
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
	incomingfile(event) 
    {
		console.log(event);
      this.file= event.target.files[0]; 
   }
	
   public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged( 'menu.isCollapsed', this.isMenuCollapsed );
        return false;
    }
	
	 Upload() {
      let fileReader = new FileReader();
	 
	  
        fileReader.onload = (e) => {
			
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
			
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
			
            var worksheet = workbook.Sheets[first_sheet_name];
            console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
        }
        fileReader.readAsArrayBuffer(this.file);
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
            this.cusorderlist  = data;
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
	
	// Get Stock Manage Datas

	 getStockManageData() {
        this.stockmanage.getStockManageData().then(( data ) => {
			this.stock_manages =data[0].status;
	
		});
    }
	
	// Get Empty Data

	getAdminEmptyData()
	{
		 return {
			id_customerorder:'',
			order_for:2,
			order_to:'',
			order_date:'',
			order_taken_by:''
		 }

	}

	getAdminorderEmptyData()
	{
	  let date = new Date();
		 return {
			    id_orderdetails:'',
    			isurgent:0,
				orderno:'',
    			is_customeitem:'0',
				customer_ref_no:'',
                id_product:'',
    			name:'',
    			customerid: '',
				id_employee:'',
				employee:'',
    			qty:'',
                id_purity: '1',
                reqweight: '',
    			is_chain:0,
                hook_type:'',
    			id_karigar: '',
    			remarks: '',
    			sizeorlen:'',
				overdue: {
					date: {
						year: date.getFullYear(),
						month: date.getMonth() + 1,
						day: date.getDate()
					}
				},
				orderdate: {
					date: {
						year: date.getFullYear(),
						month: date.getMonth() + 1,
						day: date.getDate()
					}
				},
				order_date:'',
				due_date:'',
				is_stock_avail:'0',
				itemname:'',
    			customimages:[],
    			prodefaultimg:'assets/img/theme/emptydesign.png',
    			productimgdetails:'',
    			s_hook_type:0,
    			m_hook_type:0,
    			ortertype:'2'
				
      }
	}
	
	  vieworderdetails( id_order,order ) {	
        this.title = 'Edit Order Details';
		this.adminorderdetails = this.getAdminorderEmptyData();
        this.isEditMode = true;
        this.isAddMode  = false;
		
		this.admindetails.order_to           =  order.id_customer;
	    this.admindetails.order_taken_by      =  order.id_customer;
	    this.admindetails.id_customerorder      =  order.id_customerorder;
		this.adminorderdetails.id_orderdetails = order.id_orderdetails;
		this.adminorderdetails.is_customeitem = order.is_customeitem;
		this.adminorderdetails.name           = order.productname;
		this.adminorderdetails.orderno        = order.orderno;
		this.adminorderdetails.id_product     = order.id_product;
		this.adminorderdetails.customer_ref_no     = order.customer_ref_no;
		if(this.adminorderdetails.is_customeitem == '0') {
		   this.adminorderdetails.prodefaultimg  = order.image;
		 }
	     else
		 {
			 this.order_images                = order.customimages;
			 this.adminorderdetails.customimages = order.custom_images;
		}
		 if ( order.order_date != null && order.order_date != '' ) {
                    let date = new Date(order.order_date);
                    this.adminorderdetails.orderdate = {
                        date: {
                            year: date.getFullYear(),
                            month: date.getMonth() + 1,
                            day: date.getDate()
                        }
                    }
          } 
		this.adminorderdetails.qty            = order.totalitems;
		this.adminorderdetails.sizeorlen      = order.size;
		this.adminorderdetails.reqweight      = order.weight;
		this.adminorderdetails.customerid     = order.order_to;
		this.adminorderdetails.id_employee    = order.id_employee;
		this.adminorderdetails.employee       = order.employee;
		this.adminorderdetails.is_stock_avail = order.is_stockdelivery;
		this.adminorderdetails.remarks        = order.description;
        this.open();
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


	ordertypeFilter(type:string){
		if(type == ''){
			this.data = this.cusorderlist;
			
		}
		else if(type =='1')
		{
			let filteredOrders = this.cusorderlist.filter(o => o.is_stockdelivery == type);
			this.data = filteredOrders;
		}
		else
		{
			let filteredOrders = this.cusorderlist.filter(o => o.is_customeitem == type);
			this.data = filteredOrders;
		}
	}
	
	

     // cretae the Adminorder Detalis
    createadminorderdetails() {
        this.title             = 'Create Order Detalis';
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
                     this.adminorderdetails.m_hook_type    = a.m_hook_type;
                     this.adminorderdetails.s_hook_type    = a.s_hook_type;
            
    			   }
    			});

    			this.service.getDesignPuritiesById( designid ).then(( data ) => {
              if(data.success)
    			    {
                     let purity          = data.responseData;
      			     this.purities       = [];
      				 this.purities       = purity;
              }
         });
		 
      }
  }

   
	 handleUpload( datas ): void {
        setTimeout(() => {		
		 
		this.adminorderdetails.productimgdetails = "";
	    this.uploadFile = datas;
        this.zone.run(() => {
            this.uploadProgress = datas.progress.percent;
        } );
		
		if (datas && datas.response) {
			   this.uploadFile = JSON.parse(datas.response);
				let resp = JSON.parse( JSON.stringify( datas ) );
				if(datas.id != this.resid){
				if (resp.progress.percent == 100 && this.uploadFile.responsedata.success ==true) {
					this.adminorderdetails.customimages.push(this.uploadFile.responsedata.imgpath);
					this.order_images.push({'order_images':this.serverbaseurl + 'assets/images/customorder/'+this.uploadFile.responsedata.imgpath});
					this.commonservice.showAlertMSG( 1, "Image Uploaded successfully" );
					this.resid=datas.id;
					this.adminorderdetails.productimgdetails =this.defaultPicture;
					this.uploadFile="";
					this.uploadProgress =0;
					}
					else if(resp.progress.percent == 100 && this.uploadFile.responsedata.success ==false)
					{
					this.commonservice.showAlertMSG( 2, "Error uploading image" );
					this.resid=datas.id;
					this.adminorderdetails.productimgdetails =this.defaultPicture;
					this.uploadFile="";
					}
				}
		 }
		 else if(!datas && !datas.response)
		 {
			        this.commonservice.showAlertMSG( 2, "Error uploading image" );
					this.resid=datas.id;
					this.adminorderdetails.productimgdetails =this.defaultPicture;
					this.uploadFile=""; 
		 }
		 
	   },8000);	
	   
    }
  
  
    getProductImageData() {
		            this.uploadFile = "";
                    this.uploadProgress = 0;;
                    this.uploadResponse = null;
                    this.uploaderOptions = new NgUploaderOptions( {
                        // url: 'http://website.com/upload'
                        url: this.serverurl + 'master_api/custom_orderimgupload',
                        method: 'POST',
                        data: this.adminorderdetails,
                        authToken: this.commonservice.getAuthtoken(),
                        authTokenPrefix: this.commonservice.getauthTokenPrefix(),
                        previewUrl: true,
                        calculateSpeed: true,
                        fieldName: 'cusproduct'
                    } );
                } 

  
  onRawcustomerSelected(selected: CompleterItem)
  {
	     this.adminorderdetails.customerid =  selected.originalObject.id;
		 this.admindetails.order_to        =  this.adminorderdetails.customerid;
	     this.admindetails.order_taken_by  =  this.adminorderdetails.customerid;
	  
  }
  
  onEmployeeSelected(selected: CompleterItem)
  {
	  if(selected)
	  {
		   this.adminorderdetails.id_employee =  selected.originalObject.id;
		   
		   console.log(this.adminorderdetails.id_employee);
	  }
  }
  
  remove_design(event,design_order)
  {
	  
	 if(design_order)
	 {
          let customdes_images = design_order.order_images.split('customorder/');
		  this.service.remove_orderimage( design_order ).then(( data ) => {
              if(data.success)
    			    {
						let design_obj = this.order_images.filter( s=> s.order_images ==  design_order.order_images);
							  if(design_obj.length > 0){
								let index: number = this.order_images.indexOf(design_obj[0]);
								if (index !== -1) {
									this.order_images.splice(index, 1);
									
								}
							}

						  let design = this.adminorderdetails.customimages.filter( s=> s ==  customdes_images[1]);
							  if(design.length > 0){
								let index: number = this.adminorderdetails.customimages.indexOf(design[0]);
								if (index !== -1) {
									this.adminorderdetails.customimages.splice(index, 1);
									 this.commonservice.showAlertMSG( 1, data.message );
								}
							}  						
                    }
					else
					{
						this.commonservice.showAlertMSG( 2, data.message );
					}
			});	 
	 }

  }
  
	saveAdminorder(isUpdate,canClose)
	{
		
		if(this.adminorderdetails.id_orderdetails=='') {
		
		if(this.adminorderdetails.id_product =="" && this.adminorderdetails.is_customeitem=='1')
		   {
			  var timestamp = Math.floor(Date.now() / 1000);	
			  this.adminorderdetails.id_product = timestamp.toString();
			  
		   }
		if(this.adminorderdetails.overdue != null ) {
			   var day     = this.adminorderdetails.overdue.date.day;
			   var month   = this.adminorderdetails.overdue.date.month;
			   var year    = this.adminorderdetails.overdue.date.year;
			   this.adminorderdetails.due_date = day.toString()+ "-" +month.toString()+ "-" +year.toString();
		  }
		 if(this.adminorderdetails.orderdate != null ) {
			   var day     = this.adminorderdetails.orderdate.date.day;
			   var month   = this.adminorderdetails.orderdate.date.month;
			   var year    = this.adminorderdetails.orderdate.date.year;
			   this.adminorderdetails.order_date = day.toString()+ "-" +month.toString()+ "-" +year.toString();
			   this.admindetails.order_date = day.toString()+ "-" +month.toString()+ "-" +year.toString();
		  }
		  
         if(this.adminorderdetails.id_product=="")	 {	
			 this.commonservice.showAlertMSG(2, "Please Choose Your Designs to Put Order");
		 }
		 else if(this.adminorderdetails.customerid=="") {
			  this.commonservice.showAlertMSG(2, "Please Select Customer Name Propelry");
		 }
		/*  else if(this.adminorderdetails.id_employee=="") {
			  this.commonservice.showAlertMSG(2, "Please Select Order Taken Employee Name Propelry");
		 } */
		 else
		 {
			  
			 this.service.saveadminorder( JSON.stringify( { 'cusdetails' :  this.admindetails,'orders' : [this.adminorderdetails] } ) ).then( res => {
				if ( res ) {
				  if ( res.success ){
					this.adminorderdetails.customimages = [];
					this.order_images =[];
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
		 
		}
		else
		{
			console.log(this.admindetails);
			console.log(this.adminorderdetails);
			
		    if(this.adminorderdetails.id_product =="" && this.adminorderdetails.is_customeitem=='1')
			   {
				  var timestamp = Math.floor(Date.now() / 1000);	
				  this.adminorderdetails.id_product = timestamp.toString();
				  
			   }
			if(this.adminorderdetails.overdue != null ) {
				   var day     = this.adminorderdetails.overdue.date.day;
				   var month   = this.adminorderdetails.overdue.date.month;
				   var year    = this.adminorderdetails.overdue.date.year;
				   this.adminorderdetails.due_date = day.toString()+ "-" +month.toString()+ "-" +year.toString();
			  }
			 if(this.adminorderdetails.orderdate != null ) {
			   var day     = this.adminorderdetails.orderdate.date.day;
			   var month   = this.adminorderdetails.orderdate.date.month;
			   var year    = this.adminorderdetails.orderdate.date.year;
			   this.adminorderdetails.order_date = day.toString()+ "-" +month.toString()+ "-" +year.toString();
			   this.admindetails.order_date = day.toString()+ "-" +month.toString()+ "-" +year.toString();
			 } 
			 if(this.adminorderdetails.id_product=="")	 {	
				 this.commonservice.showAlertMSG(2, "Please Choose Your Designs to Put Order");
			 }
			 else if(this.adminorderdetails.customerid=="") {
				  this.commonservice.showAlertMSG(2, "Please Select Customer Name Propelry");
			 }
			 else if(this.adminorderdetails.id_employee=="") {
				  this.commonservice.showAlertMSG(2, "Please Select Order Taken Employee Name Propelry");
			 }
			 else
			 {
				  
				 this.service.updateadminorder( JSON.stringify( { 'cusdetails' :  this.admindetails,'orders' : [this.adminorderdetails] } ) ).then( res => {
					if ( res ) {
					  if ( res.success ){
						this.adminorderdetails.customimages = [];
						this.order_images =[];
						this.commonservice.showAlertMSG( 1, res.message );
					  } else{
						this.commonservice.showAlertMSG( 2, res.message );
					  }
					  if ( canClose ) {
						this.modal.close();
						this.order_images =[];
					  }
					  this.adminorderdetails = this.getAdminorderEmptyData();
					  this.getAdminorders();
					}
				  }, error => {
				this.disablesubmit = false;

			  } );
		  
			 }
				
			
		}
	  
	}

	// Qty String Format
	qty_keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
