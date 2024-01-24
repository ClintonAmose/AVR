import { Component, OnInit } from '@angular/core';
import { StyleService } from './style.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { CommonService } from '../../common/common.service';
import { Location } from '@angular/common';

@Component( {
    selector: 'app-style',
    templateUrl: './style.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './style.component.css']
} )
export class StyleComponent implements OnInit {

    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 50;
	rowsOnPageSet = [50,100,150];
    sortBy = 'id_style';
    sortOrder = 'asc';
    title: string = '';
	records =[];
	public defaultPicture = 'assets/img/theme/loading.gif';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    styledet = this.getEmptyStyleDetail();
	disablesubmit = false;
	accessData;

    constructor(private location: Location, private service: StyleService, private commonservice: CommonService ) { 
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
	}

    ngOnInit() {
        this.getStyleData();
    }
    getEmptyStyleDetail() {
        return {
            id_style: '',
            name_style: '',
            code_style: '',
            desc_style: '',
            status_style: "1"
        }
    }
    getStyleData() {
        this.service.getStyleData().then(( data ) => {
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
    saveStyle( isUpdate, canClose ) {
		this.disablesubmit = true;
        if ( isUpdate ) {
            if ( this.styledet.id_style != '' ) {
                this.service.updateStyle( JSON.stringify( this.styledet ) ).then( res => {
                    if ( res ) {
                        this.styledet = this.getEmptyStyleDetail();
                        this.getStyleData();
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
            this.service.saveStyle( JSON.stringify( this.styledet ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
						this.getStyleData();
						if ( canClose ) {
							this.modal.close();
						}
						this.styledet = this.getEmptyStyleDetail();
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
    removeStyle( stylid ) {
        if ( stylid ) {
            this.service.deleteStyle( JSON.stringify( { 'id': stylid } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getStyleData();
                    this.deletemodal.close();
                    this.styledet = this.getEmptyStyleDetail();
                }
            }, error => {

            } );
        }
    }
    createnewstyledetails() {
		this.styledet = this.getEmptyStyleDetail();
        this.title = 'New Style';
        this.isEditMode = false;
        this.isAddMode = true;
        this.open();
    }
    updatestyle( id ) {
		this.styledet = this.getEmptyStyleDetail();
        this.getStyleById( id );
        this.title = 'Update Style';
        this.isEditMode = true;
        this.isAddMode = false;
        this.open();
    }
    deletestyle( stylid ) {
        this.styledet.id_style = stylid;
        this.title = 'Delete Style';
        this.deletemodal.open();
    }
    getStyleById( stylid ) {
        this.service.getStyleById( stylid ).then(( data ) => {
            if ( data.success ) {
                this.styledet.id_style = data.responseData.id_style;
                this.styledet.name_style = data.responseData.name_style;
                this.styledet.code_style = data.responseData.code_style;
                this.styledet.desc_style = data.responseData.desc_style;
                this.styledet.status_style = data.responseData.status_style;
            }
        } );
    }

}
