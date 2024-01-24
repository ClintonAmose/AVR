import { Component, OnInit } from '@angular/core';
import { PurityService } from './purity.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { CommonService } from '../../common/common.service';
import { Location } from '@angular/common';

@Component( {
    selector: 'app-purity',
    templateUrl: './purity.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './purity.component.css']
} )
export class PurityComponent implements OnInit {

    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 50;
	rowsOnPageSet = [50,100,150];
    sortBy = 'id_purity';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    puritydet = this.getEmptyPurityDetail();
	disablesubmit = false;
	accessData;
    records =[];
	public loadingPicture = 'assets/img/theme/loading.gif';
    constructor( private location: Location,private service: PurityService, private commonservice: CommonService ) { 
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
	}

    ngOnInit() {
        this.getPurityData();
    }
    getEmptyPurityDetail() {
        return {
            id_purity: '',
            purity: '',
            id_employee: 1,
            description: '',
            status: "1"
        }
    }
    getPurityData() {
        this.service.getPurityData().then(( data ) => {
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
    savePurity( isUpdate, canClose ) {
		this.disablesubmit = true;
        if ( isUpdate ) {
            if ( this.puritydet.id_purity != '' ) {
                this.service.updatePurity( JSON.stringify( this.puritydet ) ).then( res => {
                    if ( res ) {
                        this.puritydet = this.getEmptyPurityDetail();
                        this.getPurityData();
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
        } else {
            this.service.savePurity( JSON.stringify( this.puritydet ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
						this.getPurityData();
						if ( canClose ) {
							this.modal.close();
						}
						this.puritydet = this.getEmptyPurityDetail();
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
    removePurity( stylid ) {
        if ( stylid ) {
            this.service.deletePurity( JSON.stringify( { 'id': stylid } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getPurityData();
                    this.deletemodal.close();
                    this.puritydet = this.getEmptyPurityDetail();
                }
            }, error => {

            } );
        }
    }
    createnewpuritydetails() {
		this.puritydet = this.getEmptyPurityDetail();
        this.title = 'New Purity';
        this.isEditMode = false;
        this.isAddMode = true;
        this.open();
    }
    updatepurity( id ) {
		this.puritydet = this.getEmptyPurityDetail();
        this.getPurityById( id );
        this.title = 'Update Purity';
        this.isEditMode = true;
        this.isAddMode = false;
        this.open();
    }
    deletepurity( stylid ) {
        this.puritydet.id_purity = stylid;
        this.title = 'Delete Purity';
        this.deletemodal.open();
    }
    getPurityById( stylid ) {
        this.service.getPurityById( stylid ).then(( data ) => {
            if ( data.success ) {
                this.puritydet.id_purity = data.responseData.id_purity;
                this.puritydet.purity = data.responseData.purity;
                this.puritydet.description = data.responseData.description;
                this.puritydet.status = data.responseData.status;
            }
        } );
    }

}
