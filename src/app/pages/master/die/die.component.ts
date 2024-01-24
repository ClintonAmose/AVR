import { Component, OnInit } from '@angular/core';
import { DieService } from './die.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { CommonService } from '../../common/common.service';
import { Location } from '@angular/common';

@Component( {
    selector: 'app-die',
    templateUrl: './die.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './die.component.css']
} )
export class DieComponent implements OnInit {

    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 50;
	rowsOnPageSet = [50,100,150];
    sortBy = 'iddie';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    diedet = this.getEmptyDieDetail();
	disablesubmit = false;
	accessData;
	
    constructor( private location: Location,private service: DieService, private commonservice: CommonService ) { 
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
	}

    ngOnInit() {
        this.getDieData();
    }
    getEmptyDieDetail() {
        return {
            iddie: '',
            dierefno: '',
            presure: '',
            waxwt : '',
            metalwt : '',
            diestatus: "1"
        }
    }
    getDieData() {
        this.service.getDieData().then(( data ) => {
            this.data = data;
        } );
    }
    open() {
        this.modal.open();
    }
    close() {
        this.modal.close();
    }
    closedeletepopup() {
        this.deletemodal.close();
    }
    bindModal( _modal ) {
        this.modal = _modal;
    }
    binddeleteModal( _modal ) {
        this.deletemodal = _modal;
    }
    saveDie( isUpdate, canClose ) {
		this.disablesubmit = true;
        if ( isUpdate ) {
            if ( this.diedet.iddie != '' ) {
                this.service.updateDie( JSON.stringify( this.diedet ) ).then( res => {
                    if ( res ) {
                        this.diedet = this.getEmptyDieDetail();
                        this.getDieData();						
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
            this.service.saveDie( JSON.stringify( this.diedet ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
						this.getDieData();
						if ( canClose ) {
							this.modal.close();
						}
						this.diedet = this.getEmptyDieDetail();
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
    removeDie( dieid ) {
        if ( dieid ) {
            this.service.deleteDie( JSON.stringify( { 'id': dieid } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getDieData();
                    this.deletemodal.close();
                    this.diedet = this.getEmptyDieDetail();
                }
            }, error => {

            } );
        }
    }
    createnewdiedetails() {
		this.diedet = this.getEmptyDieDetail();
        this.title = 'New Die';
        this.isEditMode = false;
        this.isAddMode = true;
        this.open();
    }
    updatedie( id ) {
		this.diedet = this.getEmptyDieDetail();
        this.getDieById( id );
        this.title = 'Update Die';
        this.isEditMode = true;
        this.isAddMode = false;
        this.open();
    }
    deletedie( dieid ) {
        this.diedet.iddie = dieid;
        this.title = 'Delete Die Details';
        this.deletemodal.open();
    }
    getDieById( depid ) {
        this.service.getDieById( depid ).then(( data ) => {
            if ( data.success ) {
                this.diedet.iddie = data.responseData.iddie;
                this.diedet.dierefno = data.responseData.dierefno;
                this.diedet.presure = data.responseData.presure;
                this.diedet.waxwt = data.responseData.waxwt;
                this.diedet.metalwt = data.responseData.metalwt;
                this.diedet.diestatus = data.responseData.diestatus;
            }
        } );
    }

}
