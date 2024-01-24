import { Component, OnInit } from '@angular/core';
import { DealerService } from './dealer.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { CommonService } from '../../common/common.service';
import { Location } from '@angular/common';

@Component( {
    selector: 'app-dealer',
    templateUrl: './dealer.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './dealer.component.css']
} )
export class DealerComponent implements OnInit {

    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 50;
	rowsOnPageSet = [50,100,150];
    sortBy = 'id_dealers';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
	disablesubmit = false;
    dealerdetail = this.getEmptyDealerDetail();
	accessData;

    constructor( private location: Location,private service: DealerService, private commonservice: CommonService ) { 
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
	}

    ngOnInit() {
        this.getDealerData();
    }
    getEmptyDealerDetail() {
        return {
            id_dealers: '',
            name_dealers: '',
            company_dealers: '',
            contactno_dealers: '',
            address_dealers: '',
			status_dealers:"1"
        }
    }
    getDealerData() {
        this.service.getDealerData().then(( data ) => {
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
    saveDealer( isUpdate, canClose ) {
		this.disablesubmit = true;
        if ( isUpdate ) {
            if ( this.dealerdetail.id_dealers != '' ) {
                this.service.updateDealer( JSON.stringify( this.dealerdetail ) ).then( res => {
                    if ( res ) {
                        this.dealerdetail = this.getEmptyDealerDetail();
                        this.getDealerData();
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
            this.service.saveDealer( JSON.stringify( this.dealerdetail ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getDealerData();
                    if ( canClose ) {
                        this.modal.close();
                    }
                    this.dealerdetail = this.getEmptyDealerDetail();
					this.disablesubmit = false;
                }
            }, error => {
					this.disablesubmit = false;
            } );
        }
    }
    removeDealer( dealerid ) {
        if ( dealerid ) {
            this.service.deleteDealer( JSON.stringify( { 'id': dealerid } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getDealerData();
                    this.deletemodal.close();
                    this.dealerdetail = this.getEmptyDealerDetail();
                }
            }, error => {

            } );
        }
    }
    createnewdealerdetails() {
		this.dealerdetail = this.getEmptyDealerDetail();
        this.title = 'New Dealer';
        this.isEditMode = false;
        this.isAddMode = true;
        this.open();
    }
    updateDealer( id ) {
        this.getDealerById( id );
        this.title = 'Update Dealer';
        this.isEditMode = true;
        this.isAddMode = false;
        this.open();
    }
    deletedealer( dealerid ) {
        this.dealerdetail.id_dealers = dealerid;
        this.title = 'Delete Dealer';
        this.deletemodal.open();
    }
    getDealerById( dealerid ) {
        this.service.getDealerById( dealerid ).then(( data ) => {
            if ( data.success ) {
                this.dealerdetail.id_dealers = data.responseData.id_dealers;
                this.dealerdetail.company_dealers = data.responseData.company_dealers;
                this.dealerdetail.name_dealers = data.responseData.name_dealers;
                this.dealerdetail.contactno_dealers = data.responseData.contactno_dealers;
                this.dealerdetail.address_dealers = data.responseData.address_dealers;
                this.dealerdetail.status_dealers = data.responseData.status_dealers;
				
            }
        } );
    }

}
