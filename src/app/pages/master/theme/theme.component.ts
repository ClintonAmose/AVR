import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { CommonService } from '../../common/common.service';
import { Location } from '@angular/common';

@Component( {
    selector: 'app-theme',
    templateUrl: './theme.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './theme.component.css']
} )
export class ThemeComponent implements OnInit {

    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 50;
	rowsOnPageSet = [50,100,150];
    sortBy = 'id_theme';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    themedet = this.getEmptyThemeDetail();
	disablesubmit = false;
	accessData;
    records =[];
	public loadingPicture = 'assets/img/theme/loading.gif';
    constructor( private location: Location,private service: ThemeService, private commonservice: CommonService ) { 
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
	}

    ngOnInit() {
        this.getThemeData();
    }
    getEmptyThemeDetail() {
        return {
            id_theme: '',
            name_theme: '',
            code_theme: '',
            desc_theme: '',
            status_theme: "1"
        }
    }
    getThemeData() {
        this.service.getThemeData().then(( data ) => {
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
    saveTheme( isUpdate, canClose ) {
		this.disablesubmit = true;
        if ( isUpdate ) {
            if ( this.themedet.id_theme != '' ) {
                this.service.updateTheme( JSON.stringify( this.themedet ) ).then( res => {
                    if ( res ) {
                        this.themedet = this.getEmptyThemeDetail();
                        this.getThemeData();
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
            this.service.saveTheme( JSON.stringify( this.themedet ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
						this.getThemeData();
						if ( canClose ) {
							this.modal.close();
						}
						 this.themedet = this.getEmptyThemeDetail();
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
    removeTheme( theid ) {
        if ( theid ) {
            this.service.deleteTheme( JSON.stringify( { 'id': theid } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getThemeData();
                    this.deletemodal.close();
                    this.themedet = this.getEmptyThemeDetail();
                }
            }, error => {

            } );
        }
    }
    createnewthemedetails() {
		this.themedet = this.getEmptyThemeDetail();
        this.title = 'New Theme';
        this.isEditMode = false;
        this.isAddMode = true;
        this.open();
    }
    updatetheme( id ) {
		this.themedet = this.getEmptyThemeDetail();
        this.getThemeById( id );
        this.title = 'Update Theme';
        this.isEditMode = true;
        this.isAddMode = false;
        this.open();
    }
    deletetheme( theid ) {
        this.themedet.id_theme = theid;
        this.title = 'Delete Theme';
        this.deletemodal.open();
    }
    getThemeById( theid ) {
        this.service.getThemeById( theid ).then(( data ) => {
            if ( data.success ) {
                this.themedet.id_theme = data.responseData.id_theme;
                this.themedet.code_theme = data.responseData.code_theme;
                this.themedet.name_theme = data.responseData.name_theme;
                this.themedet.desc_theme = data.responseData.desc_theme;
                this.themedet.status_theme = data.responseData.status_theme;
            }
        } );
    }

}
