import { Component, OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockTransferService } from './stocktransfer.service';
import { ModalComponent } from '../../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { CommonService,BaseAPIURL } from '../../../common/common.service';
import { CategoryService } from '../../../master/category/category.service';
import { DesignService } from '../../../master/design/design.service';
import { Location } from '@angular/common';
import { CompleterCmp, CompleterData, CompleterService, CompleterItem, RemoteData } from 'ng2-completer';
import { Http, Headers, RequestOptions } from '@angular/http';
@Component( {
    selector: 'app-stocktransfer',
    templateUrl: './stocktransfer.component.html',
    styleUrls: ['./stocktransfer.component.css','../../../tables/components/dataTables/dataTables.scss']
} )
export class StockTransferComponent implements OnInit {

  modal: ModalComponent;
  deletemodal: ModalComponent;
  priorityLDtitle = '';
  data;
  filterQuery = '';
  rowsOnPage = 50;
  rowsOnPageSet = [50,100,150];
  sortBy = 'id_customerorder';
  sortOrder = 'asc';
  title: string = '';
  isEditMode: boolean = false;
  isAddMode: boolean = false;
  disablesubmit = false;
  stocktransferdetails = this.getAdminorderEmptyData();
  accessData;
  branches  = [];
  purities  = [];
  vendors   = [];
  designs_form   = [];
  avaliable_stock =[];
  avaliable_designs =[];
  sku_stock = [];
  records  =[];
  public loadingPicture = 'assets/img/theme/loading.gif';
    public itemsRemote: RemoteData;
	private _header: Headers;
	@ViewChild( "remoteDataExample" ) private remoteDataExample: CompleterCmp;

    constructor( private location: Location,completerService: CompleterService,http: Http,private service: StockTransferService,private route: ActivatedRoute, private router: Router, private commonservice: CommonService) {
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
		    this.getSkuorders();
            this.getBranches();
            this.chksku_stocks();
    }

	getSkuorders()
	{
		  this.service.getsku_tranferstock().then(( data ) => {
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
	getAdminorderEmptyData()
	{
	   let date = new Date();
		 return {
    		    id_product:'',
    			name:'',
    			from_branchid: '',
    			to_branchid: '',
				stocks:'',
    			transfer: {
                date: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                }
            }
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

    createadminorderdetails() {
        this.title                = 'Transfer stock';
	    this.stocktransferdetails = this.getAdminorderEmptyData();
        this.isEditMode = false;
        this.isAddMode  = true;
        this.open();
    }

    onRawdesignSelected( selected: CompleterItem ) {
      if ( selected )
      {
		 
        this.stocktransferdetails.id_product = selected.originalObject.id;
        let designid = this.stocktransferdetails.id_product;
        let from_branchid = this.stocktransferdetails.from_branchid;
        if(from_branchid !='')
        {
          this.service.getSkudesignById(JSON.stringify( { designid, from_branchid } )).then(( data ) => {
            if ( data.success ) {
              this.avaliable_stock = data.responseData;
			  console.log(this.avaliable_stock);
              let stck_count       =   this.avaliable_stock.length;
              this.stocktransferdetails.stocks = stck_count.toString();
            }
          }, error => {
            this.avaliable_stock =[];
            this.commonservice.showAlertMSG( 2, "Avaliable Sku Stock is Empty" );
          } );
        }
      }
    }

	// Add another Designs
	add_design()
	{
		  this.stocktransferdetails.id_product ='';
		  this.stocktransferdetails.name='';
		  this.avaliable_stock =[];
		  this.commonservice.showAlertMSG( 2, "Select Another Designs" );
	}

  // remove design Options 	
   remove_design($event,design)
   {
	   this.avaliable_designs.forEach(( design_stock ) => {
	    let obj = this.sku_stock.filter( design=> design.id_sku ==  design_stock.id_sku);
                  if(obj.length > 0){
                    let index: number = this.sku_stock.indexOf(obj[0]);
                    if (index !== -1) {
                        this.avaliable_designs.splice(index, 1);
                    }
                  }
		});
   }
   
   chksku_stocks()
   {
      this.disablesubmit = true;
      this.sku_stock     = [];
      this.avaliable_stock.forEach(( stock ) => { // foreach statement
          if ( stock.isChecked == true) {
			  
    				if(stock.transfer_stocks != 0 && stock.transfer_stocks != '' ){
               if(stock.transfer_stocks <= stock.stock_available){
                 // delete if sku already exist in array
                  let obj = this.sku_stock.filter( s=> s.id_sku ==  stock.id_sku);
                  if(obj.length > 0){
                    let index: number = this.sku_stock.indexOf(obj[0]);
                    if (index !== -1) {
                        this.sku_stock.splice(index, 1);
                    }
                  } // ends
				  
				    
					// delete if sku already exist in array showing on designs avaliable
                  let desing_obj = this.avaliable_designs.filter( s=> s.id_sku ==  stock.id_sku);
                  if(desing_obj.length > 0){
                    let index: number = this.avaliable_designs.indexOf(desing_obj[0]);
                    if (index !== -1) {
                        this.avaliable_designs.splice(index, 1);
                    }
                  } // ends
				  
					  
					  if ( stock.isChecked == true) {
						 this.sku_stock.push( stock );
						 let design = this.avaliable_designs.push(stock);
					  }
          	   }
				   else{
					   this.sku_stock = [];
					   this.commonservice.showAlertMSG(2, "Transfer Stock is greater than avaliable stock");
				   }
			  }
			  else
			  {
				 this.commonservice.showAlertMSG(2, "Please Enter Transfer Stock");
			     this.sku_stock = [];
				
			  }
          }
		  else
		  {
			 
			   let desing_obj = this.avaliable_designs.filter( s=> s.id_sku ==  stock.id_sku);
                  if(desing_obj.length > 0){
                    let index: number = this.avaliable_designs.indexOf(desing_obj[0]);
                    if (index !== -1) {
                        this.avaliable_designs.splice(index, 1);
                    }
               }
            this.commonservice.showAlertMSG(2, "Select atleast one stock to transfer");
          }
      });
     console.log("SKU_Stock"+JSON.stringify(this.sku_stock));
     //console.log("avaliable_designs"+JSON.stringify(this.avaliable_designs));
      /*  if(this.avaliable_designs.length>0){
        this.saveSkuorder(isUpdate,canClose);
      }else{
        this.disablesubmit = false;
      }  */
   }
   
   
   transfer_stocks($event,stock)
   {
	  console.log(stock); 
     let transfer = $event.target.value;
	   if(transfer <= stock.stock_available){
		     stock.transfer_stocks = transfer;
			 console.log(stock.transfer_stocks);
	   }
	   else{
         $event.target.value = 0;
		     this.commonservice.showAlertMSG(2, "Transfer Stock is greater than avaliable stock");
	   }
   }


   saveSkuorder(isUpdate,canClose)
   {
	 this.chksku_stocks();
     let frombranch = this.stocktransferdetails.from_branchid;
     let tobranch   = this.stocktransferdetails.to_branchid;
     if((this.sku_stock.length > 0) && (frombranch != tobranch))
     {
       this.service.saveskustock( JSON.stringify( {stocktransferdetails:this.stocktransferdetails,
         sku_stock:this.avaliable_designs } ) ).then( res => {
           if ( res ) {
             if ( res.success ) {
               this.commonservice.showAlertMSG( 1, res.message );
             } else {
               this.commonservice.showAlertMSG( 2, res.message );
             }
             this.getSkuorders();
             this.avaliable_stock =[];
			  this.avaliable_designs = [];
             if ( canClose ) {
               this.modal.close();
             }

           }
           this.disablesubmit = false;
         }, error => {
           this.disablesubmit = false;
         } );
       }
       else
       {
         if(frombranch == tobranch){
           this.commonservice.showAlertMSG( 2, "Both from and to branch are same" );
         }else{
           this.commonservice.showAlertMSG( 2, "Please select design to transfer" );
         }
         this.disablesubmit = false;
       }

     }

     updateStatus()
     {
       this.disablesubmit = true;
       let transferids     = [];

	     this.data.forEach(( orders ) => { // foreach statement
            if ( orders.isChecked == true ) {
                //deliveryorders
                transferids.push( orders );
            }
        } )
		console.log(transferids);
		console.log(transferids.length);

	   if(transferids.length >0 )
	   {
       this.service.updateBranchDelivery( JSON.stringify( {transferids : transferids} ) ).then(( data ) => {
         if ( data.success ) {
           this.getSkuorders();
           this.commonservice.showAlertMSG( 1, data.message );
         }
         else
         {
           this.commonservice.showAlertMSG( 2, data.message );
         }
         this.disablesubmit = false;
       });

      }
	}
}
