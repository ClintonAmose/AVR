import { Component, OnInit } from '@angular/core';
import { MaterialService } from './material.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { CommonService } from '../../common/common.service';
@Component( {
    selector: 'app-material',
    templateUrl: './material.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './material.component.css']
} )
export class MaterialComponent implements OnInit {

    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'name_material';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    materialdet = this.getEmptyMaterialDetail();

    constructor( private service: MaterialService, private commonservice: CommonService ) { }

    ngOnInit() {
        this.getMaterialData();
    }
    getEmptyMaterialDetail() {
        return {
            id_material: '',
            name_material: '',
            status_material: 1
        }
    }
    getMaterialData() {
        this.service.getMaterialData().then(( data ) => {
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
    saveMaterial( isUpdate, canClose ) {
        if ( isUpdate ) {
            if ( this.materialdet.id_material != '' ) {
                this.service.updateMaterial( JSON.stringify( this.materialdet ) ).then( res => {
                    if ( res ) {
                        this.materialdet = this.getEmptyMaterialDetail();
                        this.getMaterialData();
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
            this.service.saveMaterial( JSON.stringify( this.materialdet ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getMaterialData();
                    if ( canClose ) {
                        this.modal.close();
                    }
                    this.materialdet = this.getEmptyMaterialDetail();
                }
            }, error => {

            } );
        }
    }
    removeMaterial( stylid ) {
        if ( stylid ) {
            this.service.deleteMaterial( JSON.stringify( { 'id': stylid } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getMaterialData();
                    this.deletemodal.close();
                    this.materialdet = this.getEmptyMaterialDetail();
                }
            }, error => {

            } );
        }
    }
    createnewmaterialdetails() {
        this.title = 'New Material';
        this.isEditMode = false;
        this.isAddMode = true;
        this.open();
    }
    updatematerial( id ) {
        this.getMaterialById( id );
        this.title = 'Update Material';
        this.isEditMode = true;
        this.isAddMode = false;
        this.open();
    }
    deletematerial( stylid ) {
        this.materialdet.id_material = stylid;
        this.title = 'Delete Material';
        this.deletemodal.open();
    }
    getMaterialById( stylid ) {
        this.service.getMaterialById( stylid ).then(( data ) => {
            if ( data.success ) {
                this.materialdet.id_material = data.responseData.id_material;
                this.materialdet.name_material = data.responseData.name_material;
                this.materialdet.status_material = data.responseData.status_material;
            }
        } );
    }

}
