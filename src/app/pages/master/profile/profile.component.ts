import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { CommonService } from '../../common/common.service';
@Component( {
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './profile.component.css']
} )
export class ProfileComponent implements OnInit {
    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'profile_name';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    profiledet = this.getEmptyProfileDetail();
    constructor( private service: ProfileService, private commonservice: CommonService ) { }

    ngOnInit() {
        this.getProfileData();
    }
    getEmptyProfileDetail() {
        return {
            id_profile: '',
            profile_name: '',
            profile_status: 1
        }
    }
    getProfileData() {
        this.service.getProfileData().then(( data ) => {
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
    saveProfile( isUpdate, canClose ) {
        if ( isUpdate ) {
            if ( this.profiledet.id_profile != '' ) {
                this.service.updateProfile( JSON.stringify( this.profiledet ) ).then( res => {
                    if ( res ) {
                        this.profiledet = this.getEmptyProfileDetail();
                        this.getProfileData();
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
            this.service.saveProfile( JSON.stringify( this.profiledet ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getProfileData();
                    if ( canClose ) {
                        this.modal.close();
                    }
                    this.profiledet = this.getEmptyProfileDetail();
                }
            }, error => {

            } );
        }
    }
    removeProfile( deptid ) {
        if ( deptid ) {
            this.service.deleteProfile( JSON.stringify( { 'id': deptid } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getProfileData();
                    this.deletemodal.close();
                    this.profiledet = this.getEmptyProfileDetail();
                }
            }, error => {

            } );
        }
    }
    createnewprofiledetails() {
        this.title = 'New Profile';
        this.isEditMode = false;
        this.isAddMode = true;
        this.open();
    }
    updateprofile( id ) {
        this.getProfileById( id );
        this.title = 'Update Profile';
        this.isEditMode = true;
        this.isAddMode = false;
        this.open();
    }
    deleteprofile( depid ) {
        this.profiledet.id_profile = depid;
        this.title = 'Delete Profile';
        this.deletemodal.open();
    }
    getProfileById( depid ) {
        this.service.getProfileById( depid ).then(( data ) => {
            if ( data.success ) {
                this.profiledet.id_profile = data.responseData.id_profile;
                this.profiledet.profile_name = data.responseData.profile_name;
                this.profiledet.profile_status = data.responseData.profile_status;
            }
        } );
    }
}
