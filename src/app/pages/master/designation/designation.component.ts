import { Component, OnInit } from '@angular/core';
import { DesignationService } from './designation.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { CommonService } from '../../common/common.service';

@Component( {
    selector: 'app-designation',
    templateUrl: './designation.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './designation.component.css']
} )
export class DesignationComponent implements OnInit {

    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'name';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    designationdet = this.getEmptyDesignationDetail();

    constructor( private service: DesignationService, private commonservice: CommonService ) { }

    ngOnInit() {
        this.getDesignationData();
    }
    getEmptyDesignationDetail() {
        return {
            id_design: '',
            name: '',
            status: 1
        }
    }
    getDesignationData() {
        this.service.getDesignationData().then(( data ) => {
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
    saveDesignation( isUpdate, canClose ) {
        if ( isUpdate ) {
            if ( this.designationdet.id_design != '' ) {
                this.service.updateDesignation( JSON.stringify( this.designationdet ) ).then( res => {
                    if ( res ) {
                        this.designationdet = this.getEmptyDesignationDetail();
                        this.getDesignationData();
                        this.modal.close();
                        if ( res.success ) {
                            this.commonservice.showAlertMSG( 1, res.message );
                        } else {
                            this.commonservice.showAlertMSG( 2, res.message );
                        }
                    }
                }, error => {

                } );
            }
        } else {
            this.service.saveDesignation( JSON.stringify( this.designationdet ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getDesignationData();
                    if ( canClose ) {
                        this.modal.close();
                    }
                    this.designationdet = this.getEmptyDesignationDetail();
                }
            }, error => {

            } );
        }
    }
    removeDesignation( deptid ) {
        if ( deptid ) {
            this.service.deleteDesignation( JSON.stringify( { 'id': deptid } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getDesignationData();
                    this.deletemodal.close();
                    this.designationdet = this.getEmptyDesignationDetail();
                }
            }, error => {

            } );
        }
    }
    createnewdesignationdetails() {
        this.title = 'New Designation';
        this.isEditMode = false;
        this.isAddMode = true;
        this.open();
    }
    updatedesignation( id ) {
        this.getDesignationById( id );
        this.title = 'Update Designation';
        this.isEditMode = true;
        this.isAddMode = false;
        this.open();
    }
    deletedesignation( depid ) {
        this.designationdet.id_design = depid;
        this.title = 'Delete Designation';
        this.deletemodal.open();
    }
    getDesignationById( depid ) {
        this.service.getDesignationById( depid ).then(( data ) => {
            if ( data.success ) {
                this.designationdet.id_design = data.responseData.id_design;
                this.designationdet.name = data.responseData.name;
                this.designationdet.status = data.responseData.status;
            }
        } );
    }
}
