import { Component, OnInit } from '@angular/core';
import { CategoryheadService } from './categoryhead.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { CommonService } from '../../common/common.service';
@Component( {
    selector: 'app-categoryhead',
    templateUrl: './categoryhead.component.html',
    styleUrls: ['./categoryhead.component.css', '../../tables/components/dataTables/dataTables.scss']
} )
export class CategoryheadComponent implements OnInit {

    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'namecategoryhead';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    categoryheaddet = this.getEmptycategoryheadDetail();

    constructor( private service: CategoryheadService, private commonservice: CommonService ) { }

    ngOnInit() {
        this.getcategoryheadData();
    }
    getEmptycategoryheadDetail() {
        return {
            idcategoryhead: '',
            namecategoryhead: '',
            statuscategoryhead: 1
        }
    }
    getcategoryheadData() {
        this.service.getcategoryheadData().then(( data ) => {
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
    savecategoryhead( isUpdate, canClose ) {
        if ( isUpdate ) {
            if ( this.categoryheaddet.idcategoryhead != '' ) {
                this.service.updatecategoryhead( JSON.stringify( this.categoryheaddet ) ).then( res => {
                    if ( res ) {
                        this.categoryheaddet = this.getEmptycategoryheadDetail();
                        this.getcategoryheadData();
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
            this.service.savecategoryhead( JSON.stringify( this.categoryheaddet ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getcategoryheadData();
                    if ( canClose ) {
                        this.modal.close();
                    }
                    this.categoryheaddet = this.getEmptycategoryheadDetail();
                }
            }, error => {

            } );
        }
    }
    removecategoryhead( stylid ) {
        if ( stylid ) {
            this.service.deletecategoryhead( JSON.stringify( { 'id': stylid } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getcategoryheadData();
                    this.deletemodal.close();
                    this.categoryheaddet = this.getEmptycategoryheadDetail();
                }
            }, error => {

            } );
        }
    }
    createnewcategoryheaddetails() {
        this.title = 'New categoryhead';
        this.isEditMode = false;
        this.isAddMode = true;
        this.open();
    }
    updatecategoryhead( id ) {
        this.getcategoryheadById( id );
        this.title = 'Update categoryhead';
        this.isEditMode = true;
        this.isAddMode = false;
        this.open();
    }
    deletecategoryhead( catheadid ) {
        this.categoryheaddet.idcategoryhead = catheadid;
        this.title = 'Delete categoryhead';
        this.deletemodal.open();
    }
    getcategoryheadById( catheadid ) {
        this.service.getcategoryheadById( catheadid ).then(( data ) => {
            if ( data.success ) {
                this.categoryheaddet.idcategoryhead = data.responseData.idcategoryhead;
                this.categoryheaddet.namecategoryhead = data.responseData.namecategoryhead;
                this.categoryheaddet.statuscategoryhead = data.responseData.statuscategoryhead;
            }
        } );
    }

}
