import { Component, OnInit } from '@angular/core';
import { OrderManageService } from './ordermanage.service';  
import { ModalComponent } from '../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { Location } from '@angular/common';
import { CommonService } from '../../common/common.service';
@Component( {
    selector: 'app-ordermanage',
    templateUrl: './ordermanage.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './ordermanage.component.css'] 
} )
export class OrderManageComponent implements OnInit {
   
    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'id_ordersettings';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    ordermanagedet = this.getEmptymanageDetail();
	disablesubmit = false;
    records =[];
	accessData;
	public loadingPicture = 'assets/img/theme/loading.gif';
    constructor( private service: OrderManageService, private commonservice: CommonService,private location: Location	) { 
	    let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
		console.log(this.accessData);
	}

    ngOnInit() {
        this.getOrderManageData();
    }
    getEmptymanageDetail() {
        return {
            id_ordersettings: '',
            customer_delivery: '',
            karigar_delivery: '',
			delivery_remainder:'',
            description: '',
            status: '1'
        }
    }
	
  open() {
        this.modal.open();
    }
    close() {
        this.modal.close();
    }
	 closedeletepopup(){
        this.deletemodal.close();
    }
    bindModal( _modal ) {
        this.modal = _modal;
    }
    binddeleteModal( _modal ) {
        this.deletemodal = _modal;
    }
	
	
	//Get all the size values
	getOrderManageData() {
        this.service.getStockManageData().then(( data ) => {
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
	
   // create Size type
  createnewsizedetails()
  {
	    this.ordermanagedet = this.getEmptymanageDetail();
	    this.title       = 'New Order Manage';
        this.isEditMode  = false;
        this.isAddMode   = true;
        this.open();
  }
  updatordermanage( id ) {
	    this.ordermanagedet = this.getEmptymanageDetail();
        this.getOrderById(id);
        this.title = 'Update Order Manage';
        this.isEditMode = true;
        this.isAddMode = false;
        this.open();
    }
  saveOrderManage( isUpdate, canClose ) {
	  //this.disablesubmit = true;
	   if ( isUpdate ) {
            if ( this.ordermanagedet.id_ordersettings != '' ) {
                this.service.updateorderalert( JSON.stringify( this.ordermanagedet ) ).then( res => {
                    if ( res ) {
                     this.ordermanagedet = this.getEmptymanageDetail();
                        this.getOrderManageData();
                        this.modal.close();
                        if ( res.success ) {
                            this.commonservice.showAlertMSG( 1, res.message );
                        } else {
                            this.commonservice.showAlertMSG( 2, res.message );
                        } 
						this.disablesubmit = false;
                    }
                }, error => {
					this.disablesubmit = false;

                } );
            }
        }
	  else
	  {
	    this.service.saveOrderManage( JSON.stringify( this.ordermanagedet)).then( res => {
                if ( res ) 
				{
				   if( res.success )
				    {
                       this.commonservice.showAlertMSG( 1, res.message );
                    } 
					else 
					{
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getOrderManageData();
                    if ( canClose ) {
                        this.modal.close();
                    }
                    this.ordermanagedet = this.getEmptymanageDetail();
					this.disablesubmit = false;
					
				}
		});
		
	  }
  }

  refresh(): void {
    window.location.reload();
}
  
  getOrderById( stylid ) {
	  this.service.getOrderById( stylid ).then(( data ) => {
            if ( data.success ) {
			     this.ordermanagedet = data.responseData;
            }
        } ); 
    }
	
   deletestock( stylid ) {
        this.ordermanagedet.id_ordersettings = stylid;
        this.title = 'Delete Order Manage';
        this.deletemodal.open();
    }
   
   removesms( stylid ) { 
        if (  this.ordermanagedet.id_ordersettings ) {
            this.service.delete_ordermanage( JSON.stringify( { 'id':  this.ordermanagedet.id_ordersettings } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getOrderManageData();
                    this.deletemodal.close();
                    this.ordermanagedet = this.getEmptymanageDetail();
                }
            }, error => {

            } );
        }
    }
	
}
