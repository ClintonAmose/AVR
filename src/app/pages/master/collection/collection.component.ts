import { Component, OnInit } from '@angular/core';
import { CollectionService } from './collection.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { CommonService } from '../../common/common.service';
import { Location } from '@angular/common';

@Component( {
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './collection.component.css']
} )
export class CollectionComponent implements OnInit {

    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 50;
	rowsOnPageSet = [50,100,150];
    sortBy = 'id_collection';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    collectiondet = this.getEmptyCollectionDetail();
	disablesubmit = false;
	accessData;
    public loadingPicture = 'assets/img/theme/loading.gif';
	records =[];
    constructor(private location: Location, private service: CollectionService, private commonservice: CommonService ) { 
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
	}

    ngOnInit() {
        this.getCollectionData();
    }
    getEmptyCollectionDetail() {
        return {
            id_collection: '',
            name_collection: '',
            code_collection: '',
            status_collection: "1"
        }
    }
    getCollectionData() {
        this.service.getCollectionData().then(( data ) => {
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
    saveCollection( isUpdate, canClose ) {
			this.disablesubmit = true;
        if ( isUpdate ) {
            if ( this.collectiondet.id_collection != '' ) {
                this.service.updateCollection( JSON.stringify( this.collectiondet ) ).then( res => {
                    if ( res ) {
                        this.collectiondet = this.getEmptyCollectionDetail();
                        this.getCollectionData();
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
            this.service.saveCollection( JSON.stringify( this.collectiondet ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
						this.getCollectionData();
						if ( canClose ) {
							this.modal.close();
						}
						this.collectiondet = this.getEmptyCollectionDetail();
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
    removeCollection( collid ) {
        if ( collid ) {
            this.service.deleteCollection( JSON.stringify( { 'id': collid } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getCollectionData();
                    this.deletemodal.close();
                    this.collectiondet = this.getEmptyCollectionDetail();
                }
            }, error => {

            } );
        }
    }
    createnewcollectiondetails() {
		this.collectiondet = this.getEmptyCollectionDetail();
        this.title = 'New Collection';
        this.isEditMode = false;
        this.isAddMode = true;
        this.open();
    }
    updatecollection( id ) {
		this.collectiondet = this.getEmptyCollectionDetail();
        this.getCollectionById( id );
        this.title = 'Update Collection';
        this.isEditMode = true;
        this.isAddMode = false;
        this.open();
    }
    deletecollection( colid ) {
        this.collectiondet.id_collection = colid;
        this.title = 'Delete Collection';
        this.deletemodal.open();
    }
    getCollectionById( colid ) {
        this.service.getCollectionById( colid ).then(( data ) => {
            if ( data.success ) {
                this.collectiondet.id_collection = data.responseData.id_collection;
                this.collectiondet.name_collection = data.responseData.name_collection;
                this.collectiondet.code_collection = data.responseData.code_collection;
                this.collectiondet.status_collection = data.responseData.status_collection;
            }
        } );
    }

}
