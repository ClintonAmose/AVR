import { Component, OnInit } from '@angular/core';
import { ClarityService } from './clarity.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { CommonService } from '../../common/common.service';
@Component( {
    selector: 'app-clarity',
    templateUrl: './clarity.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './clarity.component.css']
} )
export class ClarityComponent implements OnInit {

    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'id_clarity';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    claritydet = this.getEmptyClarityDetail();
	disablesubmit = false;

    constructor( private service: ClarityService, private commonservice: CommonService ) { }

    ngOnInit() {
        this.getClarityData();
    }
    getEmptyClarityDetail() {
        return {
            id_clarity: '',
            clarity: '',
            description: '',
            status: 1,
            id_employee:1
        }
    }
    getClarityData() {
        this.service.getClarityData().then(( data ) => {
            this.data = data;
        } );
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
    saveClarity( isUpdate, canClose ) {
		this.disablesubmit = true;
        if ( isUpdate ) {
            if ( this.claritydet.id_clarity != '' ) {
                this.service.updateClarity( JSON.stringify( this.claritydet ) ).then( res => {
                    if ( res ) {
                        this.claritydet = this.getEmptyClarityDetail();
                        this.getClarityData();
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
            this.service.saveClarity( JSON.stringify( this.claritydet ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getClarityData();
                    if ( canClose ) {
                        this.modal.close();
                    }
                    this.claritydet = this.getEmptyClarityDetail();
					this.disablesubmit = false;
                }
            }, error => {
				this.disablesubmit = false;

            } );
        }
    }
    removeClarity( stylid ) {
        if ( stylid ) {
            this.service.deleteClarity( JSON.stringify( { 'id': stylid } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getClarityData();
                    this.deletemodal.close();
                    this.claritydet = this.getEmptyClarityDetail();
                }
            }, error => {

            } );
        }
    }
    createnewclaritydetails() {
		this.claritydet = this.getEmptyClarityDetail();
        this.title = 'New Clarity';
        this.isEditMode = false;
        this.isAddMode = true;
        this.open();
    }
    updateclarity( id ) {
		this.claritydet = this.getEmptyClarityDetail();
        this.getClarityById( id );
        this.title = 'Update Clarity';
        this.isEditMode = true;
        this.isAddMode = false;
        this.open();
    }
    deleteclarity( stylid ) {
        this.claritydet.id_clarity = stylid;
        this.title = 'Delete Clarity';
        this.deletemodal.open();
    }
    getClarityById( stylid ) {
        this.service.getClarityById( stylid ).then(( data ) => {
            if ( data.success ) {
                this.claritydet.id_clarity = data.responseData.id_clarity;
                this.claritydet.clarity = data.responseData.clarity;
                this.claritydet.description = data.responseData.description;
                this.claritydet.status = data.responseData.status;
            }
        } );
    }

}
