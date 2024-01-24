import { Component, OnInit } from '@angular/core';
import { SizeService } from './size.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { CommonService } from '../../common/common.service';
@Component( {
    selector: 'app-size',
    templateUrl: './size.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './size.component.css']
} )
export class SizeComponent implements OnInit {
   
    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'id_size';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    puritydet = this.getEmptysizeDetail();
	disablesubmit = false;

    constructor( private service: SizeService, private commonservice: CommonService ) { }

    ngOnInit() {
        this.getSizeData();
    }
    getEmptysizeDetail() {
        return {
            id_size: '',
            name_size: '',
            status_size: '',
            type: '',
            status: 1
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
	getSizeData() {
        this.service.getSizeData().then(( data ) => {
            this.data = data;
			console.log(this.data);
        } );
    }
	
   // create Size type
  createnewsizedetails()
  {
	    this.puritydet = this.getEmptysizeDetail();
	    this.title       = 'New Size';
        this.isEditMode  = false;
        this.isAddMode   = true;
        this.open();
  }
  updatesize( id ) {
	    this.puritydet = this.getEmptysizeDetail();
        this.getSizeById(id);
        this.title = 'Update Size';
        this.isEditMode = true;
        this.isAddMode = false;
        this.open();
    }
  saveSize( isUpdate, canClose ) {
	  this.disablesubmit = true;
	   if ( isUpdate ) {
            if ( this.puritydet.id_size != '' ) {
                this.service.updateSize( JSON.stringify( this.puritydet ) ).then( res => {
                    if ( res ) {
                     this.puritydet = this.getEmptysizeDetail();
                        this.getSizeData();
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
	    this.service.saveSize( JSON.stringify( this.puritydet)).then( res => {
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
                    this.getSizeData();
                    if ( canClose ) {
                        this.modal.close();
                    }
                    this.puritydet = this.getEmptysizeDetail();
					this.disablesubmit = false;
				}
		});
		
	  }
  }

  
  getSizeById( stylid ) {
	  this.service.getSizeById( stylid ).then(( data ) => {
            if ( data.success ) {
			    this.puritydet.id_size = data.responseData.id_size;
			    this.puritydet.name_size = data.responseData.name_size;
			    this.puritydet.type = data.responseData.type;
			    this.puritydet.status = data.responseData.status;
            }
        } ); 
    }
	
   deletesize( stylid ) {
        this.puritydet.id_size = stylid;
        this.title = 'Delete Size';
        this.deletemodal.open();
    }
   
   removesize( stylid ) {
        if ( stylid ) {
            this.service.deletesize( JSON.stringify( { 'id': stylid } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getSizeData();
                    this.deletemodal.close();
                    this.puritydet = this.getEmptysizeDetail();
                }
            }, error => {

            } );
        }
    }
	
}
