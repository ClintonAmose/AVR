import { Component, OnInit } from '@angular/core';
import { StockManageService } from './stockmanage.service';  
import { ModalComponent } from '../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { CommonService } from '../../common/common.service';
@Component( {
    selector: 'app-stockmanage',
    templateUrl: './stockmanage.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './stockmanage.component.css'] 
} )
export class StockManageComponent implements OnInit {
   
    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'id_stock';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    stockmanagedet = this.getEmptystockDetail();
	disablesubmit = false;
    records =[];
	public loadingPicture = 'assets/img/theme/loading.gif';
    constructor( private service: StockManageService, private commonservice: CommonService ) { }

    ngOnInit() {
        this.getStockManageData();
    }
    getEmptystockDetail() {
        return {
            id_stock: '',
            stock: '',
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
	getStockManageData() {
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
	    this.stockmanagedet = this.getEmptystockDetail();
	    this.title       = 'New Stock Manage';
        this.isEditMode  = false;
        this.isAddMode   = true;
        this.open();
  }
  updatestockmanage( id ) {
	    this.stockmanagedet = this.getEmptystockDetail();
        this.getStockById(id);
        this.title = 'Update Stock Manage';
        this.isEditMode = true;
        this.isAddMode = false;
        this.open();
    }
  saveStockManage( isUpdate, canClose ) {
	  this.disablesubmit = true;
	   if ( isUpdate ) {
            if ( this.stockmanagedet.id_stock != '' ) {
                this.service.updateSmsalert( JSON.stringify( this.stockmanagedet ) ).then( res => {
                    if ( res ) {
                     this.stockmanagedet = this.getEmptystockDetail();
                        this.getStockManageData();
                        this.modal.close();
                        if ( res.success ) {
                            this.commonservice.showAlertMSG( 1, res.message );
                        } else {
                            this.commonservice.showAlertMSG( 2, res.message );
                        } 
						this.disablesubmit = false;
						this.refresh();
                    }
                }, error => {
					this.disablesubmit = false;

                } );
            }
        }
	  else
	  {
	    this.service.saveStockManage( JSON.stringify( this.stockmanagedet)).then( res => {
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
                    this.getStockManageData();
                    if ( canClose ) {
                        this.modal.close();
                    }
                    this.stockmanagedet = this.getEmptystockDetail();
					this.disablesubmit = false;
					
				}
		});
		
	  }
  }

  refresh(): void {
    window.location.reload();
}
  
  getStockById( stylid ) {
	  this.service.getStockById( stylid ).then(( data ) => {
            if ( data.success ) {
			     this.stockmanagedet = data.responseData;
            }
        } ); 
    }
	
   deletestock( stylid ) {
        this.stockmanagedet.id_stock = stylid;
        this.title = 'Delete Stock Manage';
        this.deletemodal.open();
    }
   
   removesms( stylid ) {
        if (  this.stockmanagedet.id_stock ) {
            this.service.delete_stockmanage( JSON.stringify( { 'id':  this.stockmanagedet.id_stock } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getStockManageData();
                    this.deletemodal.close();
                    this.stockmanagedet = this.getEmptystockDetail();
                }
            }, error => {

            } );
        }
    }
	
}
