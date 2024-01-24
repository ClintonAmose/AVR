import { Component, OnInit } from '@angular/core';
import { DepartmentService } from './department.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { CommonService } from '../../common/common.service';
@Component( {
    selector: 'app-department',
    templateUrl: './department.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './department.component.css']
} )
export class DepartmentComponent implements OnInit {

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
    departmentdet = this.getEmptyDepartmentDetail();

    constructor( private service: DepartmentService, private commonservice: CommonService ) { }

    ngOnInit() {
        this.getDepartmentData();
    }
    getEmptyDepartmentDetail() {
        return {
            id_dept: '',
            name: '',
            status: 1
        }
    }
    getDepartmentData() {
        this.service.getDepartmentData().then(( data ) => {
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
    saveDepartment( isUpdate, canClose ) {
        if ( isUpdate ) {
            if ( this.departmentdet.id_dept != '' ) {
                this.service.updateDepartment( JSON.stringify( this.departmentdet ) ).then( res => {
                    if ( res ) {
                        this.departmentdet = this.getEmptyDepartmentDetail();
                        this.getDepartmentData();
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
            this.service.saveDepartment( JSON.stringify( this.departmentdet ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getDepartmentData();
                    if ( canClose ) {
                        this.modal.close();
                    }
                    this.departmentdet = this.getEmptyDepartmentDetail();
                }
            }, error => {

            } );
        }
    }
    removeDepartment( deptid ) {
        if ( deptid ) {
            this.service.deleteDepartment( JSON.stringify( { 'id': deptid } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getDepartmentData();
                    this.deletemodal.close();
                    this.departmentdet = this.getEmptyDepartmentDetail();
                }
            }, error => {

            } );
        }
    }
    createnewdepartmentdetails() {
        this.title = 'New Department';
        this.isEditMode = false;
        this.isAddMode = true;
        this.open();
    }
    updatedepartment( id ) {
        this.getDepartmentById( id );
        this.title = 'Update Department';
        this.isEditMode = true;
        this.isAddMode = false;
        this.open();
    }
    deletedepartment( depid ) {
        this.departmentdet.id_dept = depid;
        this.title = 'Delete Department';
        this.deletemodal.open();
    }
    getDepartmentById( depid ) {
        this.service.getDepartmentById( depid ).then(( data ) => {
            if ( data.success ) {
                this.departmentdet.id_dept = data.responseData.id_dept;
                this.departmentdet.name = data.responseData.name;
                this.departmentdet.status = data.responseData.status;
            }
        } );
    }
}
