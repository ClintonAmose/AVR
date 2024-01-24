import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogStockService } from './catalogstock.service';
import { ToastsManager } from 'ng2-toastr';
import { CommonService,BaseAPIURL } from '../../../common/common.service';
import { ModalComponent } from '../../../common/modal/modal.component';
import { Location } from '@angular/common';
import { CompleterCmp, CompleterData, CompleterService, CompleterItem, RemoteData } from 'ng2-completer';
import { Http, Headers ,RequestOptions,ResponseContentType} from '@angular/http';
import { saveAs } from 'file-saver/FileSaver';
import { IMyDpOptions } from 'mydatepicker';
@Component({
  selector: 'app-catalogstock',
  templateUrl: './catalogstock.component.html',
  styleUrls: ['./catalogstock.component.css','../../../tables/components/dataTables/dataTables.scss']
})
export class CatalogStockComponent implements OnInit {

  modal: ModalComponent;
  priorityLDtitle = '';
  data;
  branches = [];
  vendors = [];
  orderdetails = [];
  assignbranch = "";
  assignvendor = "";
  filterQuery = '';
  instock_branch = '';
  rowsOnPage = 100;
  rowsOnPageSet = [100,200,300];
  sortBy = 'orderno';
  sortOrder = 'desc';
  title: string = '';
  isChecked: boolean = false;
  isEditMode: boolean = false;
  isAddMode: boolean = false;
  accessData;
  images;
  disablesubmit = false;
  imgmodal: ModalComponent;
  available_branch ='';
  branch_stock = 0 ;
  instock_orderweight =0;
  smallweight ='';
  isloading = false;
  records  =[];
  public loadingPicture = 'assets/img/theme/loading.gif';
  filter_records = this.getEmptyfilterDetail();
   public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    };
  public itemsRemote: RemoteData;
  private _header: Headers;

	@ViewChild( "remoteDataExample" ) private remoteDataExample: CompleterCmp;

    constructor(  private location: Location,completerService: CompleterService,private http: Http,private service: CatalogStockService,private route: ActivatedRoute, private router: Router, private commonservice: CommonService ) {

		//Get User rights
		let currentURL   = this.location.path();
		let path         = currentURL.split('/');
		this.accessData  = this.commonservice.getUserAccessByMenuPath(path[2])[0];

		this._header     = new Headers();
		this._header.append( 'Authorization', 'Basic ' + btoa( 'lmxretail' + ':' + 'lmx@2017' ) );
        this.itemsRemote = completerService.remote( BaseAPIURL + 'Customer_api/autocompletebranch?search=',"name","name", );
        this.itemsRemote.headers( this._header );
        this.itemsRemote.dataField( "responseData" );

	}

    ngOnInit() {
        this.getData();
    		this.getBranches();
    		this.getVendorslist();
    }

    open() {
        this.modal.open();
    }
    close() {
        this.modal.close();
		  
    }

	  bindModal( _modal ) {
        this.modal = _modal;
    }

	  // Get All Branches
    getBranches()
    {
       this.service.getBranchData().then(( data ) => {
              this.branches = data;
          } );
    }

	  // Get All Vendors

    getVendorslist() {
        this.service.getVendorData().then(( data ) => {
            this.vendors = data;
        } );
    }

	  // Assign Branch and Vendors if Out of Stock

    assignordertobranch() {
        let assignorders = [];
        this.data.forEach(( item ) => { // foreach statement
            if ( item.isChecked == true ) {
                //deliveryorders
				if(item.total_stock == 0 || item.total_stock < item.totalitems) {
                   assignorders.push( item );
				}
				else if(item.total_stock != 0 || item.total_stock > item.totalitems)
				{
					item.isChecked == false;
					this.commonservice.showAlertMSG( 2, "Please select outof Stock order" );
				}
            }
        } )

        if ( assignorders.length > 0 && this.assignvendor !='' ) {
            this.service.assignordertobranch( JSON.stringify( { assignorders: assignorders,branchid:this.assignbranch,vendorid:this.assignvendor } ) ).then( res => {
                if ( res ) {
                    this.getData();
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                }
            }, error => {
                this.commonservice.showAlertMSG( 2, "Please select any one order" );
            } );
        } else {
            if ( this.assignvendor == "" ) {
                this.commonservice.showAlertMSG( 2, "Please select any one Vendors" );
                return;
            }
            this.commonservice.showAlertMSG( 2, "Please select any one order" );
        }
    }

	// Rejected Order

	rejectcustomerorder() {
        let rejectorders = [];
        this.data.forEach(( orders ) => { // foreach statement
            if ( orders.isChecked == true ) {
                let rejorders = {
                    id_orderdetails: orders.id_orderdetails
                };
                rejectorders.push( rejorders );
            }
        } )
        if ( rejectorders.length > 0) {
            this.service.rejectcustomerorder( JSON.stringify( { rejectorders: rejectorders,branchid:this.assignbranch  } ) ).then( res => {
                if ( res ) {
                    this.getData();
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                }
            }, error => {

            } );
        } else {
            this.commonservice.showAlertMSG( 2, "Please select any one order" );
        }
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
 
	//Get all the catelog stock values
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
			this.getinStockWeight();
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
	getinStockWeight()
	{
		this.instock_orderweight =0;
		this.smallweight='';
			this.data.forEach(( instock ) => { // foreach statement
                 this.instock_orderweight +=parseFloat(instock.weight);
				 
             } ); 
		     var a              = this.instock_orderweight;
			 this.smallweight   = a.toFixed(3);
	}
	
	
   //In stock deliveryorders

	orderstock(id_orderdetails)
	{

		this.title = 'View Stock Order Details';
        this.isAddMode = false;
        this.isEditMode = false;
		this.getOrderDetailById(id_orderdetails);
        this.open();
	}

     // Instock Details

     getOrderDetailById( orderid ) {
       this.isloading = true;
       this.service.getOrderDetailsById( orderid ).then( res => {
         if ( res ) {
           this.orderdetails = res;
         }
         this.isloading = false;
       }, error => {
         console.log( error );
         this.isloading = false;
       } );
     }

	// Assign In stock Details
	assignbranchorder(processtype,isUpdate,canClose)
	{
    this.isloading      = true;
	this.instock_branch = this.available_branch;
	let order_stock     = this.orderdetails[0].totalitems;
	let branch_stk      = this.branch_stock;
    this.orderdetails[0].branch_stock = branch_stk;
    if((processtype == 1 && branch_stk >= order_stock) || (processtype == 2 && branch_stk == 0) ) // processtype-> allocate order , 2- insuggicient stk create job order
		 {
		 this.service.assignordertobranch( JSON.stringify( { assignorders: this.orderdetails,branchid:this.instock_branch } ) ).then( res => {
        if ( res ) {
            this.getData();
            if ( res.success ) {
                this.commonservice.showAlertMSG( 1, res.message );
            } else {
                this.commonservice.showAlertMSG( 2, res.message );
            }
  					if ( canClose ) {
  							this.modal.close();
  					}
            this.isloading = false;
        }}, error => {
            this.commonservice.showAlertMSG( 2, "Avaliable Stock Is Empty" );
            this.isloading = false;
        } );
		 }
		 else
		 {
			  this.commonservice.showAlertMSG( 2, "Insufficient stock !!");
          if ( canClose ) {
						this.modal.close();
					}
          this.isloading = false;
		 }

	}

  change_branch_stock(branch:any){
    let branch_stk = branch.filter(b =>b.id_branch == this.available_branch) ;
    this.branch_stock = ( branch_stk.length == 0?0:branch_stk[0].branch_stock);
  }
  
  branch_wise(branch:any,stock)
  {
	    let branch_stk     = stock.available_branch.filter(b =>b.id_branch==branch);
		
		stock.branch_stock = ( branch_stk.length == 0?0:branch_stk[0].branch_stock);
  }
  
   stock_addprocess(qty,design_datas)
	 {
		 let stock_qty = qty.target.value;
		 
		 console.log(design_datas);
		 console.log(design_datas.branch_stock);
         
		 if(stock_qty>0){
				 if(stock_qty<=design_datas.branch_stock) {
						  design_datas.add_stock = stock_qty;
				 }
				 else
				 {
					  qty.target.value = '';
					  this.commonservice.showAlertMSG(2, "Stock Qty Values is higher than branch stock");
				 }
	    }
	    else
		{
            qty.target.value = '';
		     this.commonservice.showAlertMSG(2, "Please Enter Stock Qty Value Properly");
	    }
	 
	 
	 }

  downloadImgFile(imageurl : string) {
		 let options = new RequestOptions( { headers: this._header, responseType: ResponseContentType.Blob} );
		 console.log(imageurl);
		 console.log(options);
	    this.http.get(imageurl,options).subscribe(
		  (response) => {
			    console.log(response.blob());
				var mediaType = 'application/Image';
				var blob = new Blob([response.blob()], {type: mediaType});
				var d = new Date(),
				n = d.getTime(),
				filename = n + ".jpg";
				saveAs(blob, filename);

		  }, error => {
			 console.log(error);
            } );
	}
  
      orderImage( id_orderdetail ) {
	
          this.title          = 'Catalogorder Images';
		  this.images = [];
		  let orderdata       = this.data.filter(item => item.id_orderdetails == id_orderdetail);
		  this.images.push(orderdata[0].image);
		  this.imgmodal.open();
    }

	bindImageModal( _modal ) {
        this.imgmodal = _modal;
    }
	
     closeimage()
	  {
          this.imgmodal;		  
	  }
    
  
}
