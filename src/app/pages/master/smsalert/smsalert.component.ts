import { Component, OnInit } from '@angular/core';
import { SmsalertService } from './smsalert.service';  
import { ModalComponent } from '../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { CommonService } from '../../common/common.service';
@Component( {
    selector: 'app-smsalert',
    templateUrl: './smsalert.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './smsalert.component.css'] 
} )
export class SmsalertComponent implements OnInit {
   
    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'id_service';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    puritydet = this.getEmptysmsDetail();
	disablesubmit = false;
    records =[];
	public loadingPicture = 'assets/img/theme/loading.gif';
    constructor( private service: SmsalertService, private commonservice: CommonService ) { }

    ngOnInit() {
        this.getSmsData();
    }
    getEmptysmsDetail() {
        return {
            id_service: '',
            serv_name: '',
            serv_email: '0',
            serv_sms: '1',
			sms_footer:'',
			sms_msg:''
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
	getSmsData() {
        this.service.getSmsData().then(( data ) => {
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
	    this.puritydet = this.getEmptysmsDetail();
	    this.title       = 'New Sms Service';
        this.isEditMode  = false;
        this.isAddMode   = true;
        this.open();
  }
  updatesmsalert( id ) {
	    this.puritydet = this.getEmptysmsDetail();
        this.getSmsById(id);
        this.title = 'Update Sms Service';
        this.isEditMode = true;
        this.isAddMode = false;
        this.open();
    }
  saveSms( isUpdate, canClose ) {
	  this.disablesubmit = true;
	   if ( isUpdate ) {
            if ( this.puritydet.id_service != '' ) {
                this.service.updateSmsalert( JSON.stringify( this.puritydet ) ).then( res => {
                    if ( res ) {
                     this.puritydet = this.getEmptysmsDetail();
                        this.getSmsData();
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
	    this.service.saveSmsalert( JSON.stringify( this.puritydet)).then( res => {
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
                    this.getSmsData();
                    if ( canClose ) {
                        this.modal.close();
                    }
                    this.puritydet = this.getEmptysmsDetail();
					this.disablesubmit = false;
				}
		});
		
	  }
  }

  
  getSmsById( stylid ) {
	  this.service.getSmsById( stylid ).then(( data ) => {
            if ( data.success ) {
			     this.puritydet = data.responseData;
            }
        } ); 
    }
	
   deletesmsalert( stylid ) {
        this.puritydet.id_service = stylid;
        this.title = 'Delete Smsalet';
        this.deletemodal.open();
    }
   
   removesms( stylid ) {
        if (  this.puritydet.id_service ) {
            this.service.deletesmsalert( JSON.stringify( { 'id':  this.puritydet.id_service } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getSmsData();
                    this.deletemodal.close();
                    this.puritydet = this.getEmptysmsDetail();
                }
            }, error => {

            } );
        }
    }
	
}
