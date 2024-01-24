import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewContainerRef, EventEmitter, NgZone } from '@angular/core';
import { SubcategoryService } from './subcategory.service';
import { CategoryService } from '../category/category.service';
import { ItemtypeService } from '../itemtype/itemtype.service';
import { Router } from '@angular/router';
import { ModalComponent } from '../../common/modal/modal.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ToastsManager } from 'ng2-toastr';
import { NgUploaderOptions, UploadedFile, UPLOAD_DIRECTIVES } from 'ngx-uploader';
import { CommonService } from '../../common/common.service';
import { Location } from '@angular/common';

@Component( {
    selector: 'app-subcategory',
    templateUrl: './subcategory.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss','./subcategory.component.scss']
} )
export class SubcategoryComponent implements OnInit {

    uploadFile: any;
    uploadProgress: number;
    uploadResponse: Object;
    uploadInput: EventEmitter<UploadedFile>;
    zone: NgZone;

    modal: ModalComponent;
    imgmodal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 50;
	rowsOnPageSet = [50,100,150];
    sortBy = 'id_subcategory';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    categorydet = this.getEmptyCategory();
    itemtypedet = [];
    categoryimage = this.getEmptyCatImgData();
    categories = [];
	disablesubmit = false;
    private serverurl: string;
    public defaultPicture = 'assets/img/theme/no-photo.png';
    public profile: any = {
        picture: 'assets/img/app/profile/Nasta.png'
    };
    public uploaderOptions: NgUploaderOptions;
	accessData;
	records =[];
	public loadingPicture = 'assets/img/theme/loading.gif';
    constructor(private location: Location, private service: SubcategoryService, private router: Router, public toastr: ToastsManager, private catservice: CategoryService, private itemtypeservice: ItemtypeService ,private commonservice: CommonService ) {
        this.uploadProgress = 0;
        this.uploadResponse = {};
        this.zone = new NgZone( { enableLongStackTrace: false } );
        this.getCategoryData();
        this.serverurl = service.getServerurl();
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
    }
    toInt( num: string ) {
        return +num;
    }

    sortByWordLength = ( a: any ) => {
        return a.city.length;
    }
    ngOnInit() {
        this.getAllParentCategory();
        this.getAllItemType();
    }
    getAllParentCategory() {
        this.catservice.getCategoryData().then(( data ) => {
            this.categories = data
        } );
    }
    getAllItemType() {
        this.itemtypeservice.getitemtypeData().then(( data ) => {
            this.itemtypedet = data;
        } );
    }
    getCategoryData() {
        this.service.getSubCategoryData().then(( data ) => {
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
    newCategory( ctype, caid ) {
        if ( ctype == 1 ) {
            this.title = 'New Sub Category';
            this.isEditMode = false;
            this.isAddMode = true;
            this.clearData();
        } else {
			this.categorydet = this.getEmptyCategory();
            this.getCategoryById( caid );
            this.title = 'Update Sub Category';
            this.isEditMode = true;
            this.isAddMode = false;
        }
        this.open();
    }
    imageCategory( catid ) {
        this.categoryimage = this.getEmptyCatImgData();
        this.title = 'Update Sub Category Image';
        for ( let data of this.data ) {
            if ( data.id_subcategory == catid ) {
                if ( data.imgurl != null && data.imgurl != '' ) {
                    this.categoryimage = {
                        id_subcategory: catid,
                        image: data.image,
                        imgurl: data.imgurl
                    }
                } else {
                    this.categoryimage = {
                        id_subcategory: catid,
                        image: '',
                        imgurl: 'assets/img/theme/no-photo.png'
                    }
                }
                this.uploadFile = "";
                this.uploadProgress = 0;;
                this.uploadResponse = null;
                this.uploaderOptions = new NgUploaderOptions( {
                    // url: 'http://website.com/upload'
                    url: this.serverurl + 'master_api/subcategoryimageupload',
                    method: 'POST',
                    data: this.categoryimage,
                    authToken: this.service.getAuthtoken(),
                    authTokenPrefix: this.service.getauthTokenPrefix(),
                    previewUrl: true,
                    calculateSpeed: true,
                    fieldName: 'subcategory'
                } );
                this.imgmodal.open();
                //setTimeout(() => { this.imgmodal.open() }, 1000 );
            }
        }
        //setTimeout(() => { this.imgmodal.open() }, 1000 );
    }
    deleteCategory( catid ) {
        this.categorydet.id_subcategory = catid;
        this.title = 'Delete Sub Category';
        this.deletemodal.open();
    }
    getCategoryById( catid ) {
        this.service.getsubCategoryById( catid ).then(( data ) => {
            console.log( data.responseData );
            if ( data.success ) {
                this.categorydet = this.setCategoryentry( data.responseData );
            }
        } );
    }
    open() {
        this.modal.open();
    }
    close() {
        this.modal.close();
    }
    closeimgpopup() {
        this.categoryimage = this.getEmptyCatImgData();
        this.imgmodal.close();
    }
    closedeletepopup() {
        this.deletemodal.close();
    }
    bindModal( _modal ) {
        this.modal = _modal;
    }
    bindImageModal( _modal ) {
        this.imgmodal = _modal;
    }
    binddeleteModal( _modal ) {
        this.deletemodal = _modal;
    }
    getCategoryImagedata() {
        return this.categoryimage;
    }
    setCategoryentry( catdetails ) {
        return {
            id_subcategory: catdetails.id_subcategory,
            id_category: catdetails.id_category,
            name: catdetails.name,
            description: catdetails.description,
            status: catdetails.status,
            tagprefix: catdetails.tagprefix,
            item_type: catdetails.item_type,
            createdby: 1,
            subcategory_code: catdetails.subcategory_code
        }
    }
    getEmptyCatImgData() {
        return {
            id_subcategory: '',
            image: '',
            imgurl: ''
        }
    }
    getEmptyCategory() {
        return {
            id_subcategory: '',
            id_category: '',
            name: '',
            description: '',
            tagprefix: '',
            item_type: '',
            status: "1",
            createdby: 1,
            subcategory_code: ''
        }
    }
    saveCategory( isUpdate, canClose ) {
		this.disablesubmit = true;
        if ( isUpdate ) {
            if ( this.categorydet.id_subcategory != '' ) {
                this.service.updatesubcategory( JSON.stringify( this.categorydet ) ).then( res => {
                    if ( res ) {
                        //this.router.navigate( ['pages/master/category'] );
                        this.clearData();
                        this.getCategoryData();					
							this.modal.close();
                        if(res.success){
							this.toastr.success( res.message, 'Success!' );		
						}else{
							this.toastr.warning( res.message, 'Warning!' );
						}
						 this.disablesubmit = false;
                    }
                }, error => {
					 this.disablesubmit = false;
                } );
            }
        } else {
            this.service.saveasubcategory( JSON.stringify( this.categorydet ) ).then( res => {
                if ( res ) {
                    if(res.success){
						this.toastr.success( res.message, 'Success!' );							
						if ( canClose ) {
							this.modal.close();
						}
						this.getCategoryData();
						this.clearData();
					}else{
						this.toastr.warning( res.message, 'Warning!' );
					}
                    //this.router.navigate( ['pages/master/category'] );
                     this.disablesubmit = false;
                }
            }, error => {
				 this.disablesubmit = false;
            } );
        }
    }
    removeCategory( catid ) {
        this.service.deletesubcategory( JSON.stringify( { 'id': catid } ) ).then( res => {
            if ( res ) {
                this.toastr.success( res.message, 'Success!' );
                //this.router.navigate( ['pages/master/category'] );
                this.getCategoryData();
                this.deletemodal.close();
                this.clearData();
            }
        }, error => {

        } );
    }
    private clearData() {
        this.categorydet = this.getEmptyCategory();
        this.categoryimage = this.getEmptyCatImgData();
    }
    showSuccess() {
        try {
            this.toastr.success( 'You are awesome!', 'Success!' );
        } catch ( e ) {
            console.log( e );
        }
    }
    public fileUploaderOptions: NgUploaderOptions = {
        // url: 'http://website.com/upload'
        url: '',
    };
    handleUpload( data ): void {
        this.uploadFile = data;
        this.zone.run(() => {
            this.uploadProgress = data.progress.percent;
        } );

        let resp = JSON.parse( JSON.stringify( data ) );
        if ( resp.progress.percent == 100 ) {
            //resp = JSON.parse( resp );
            //this.uploadResponse = resp;
            this.clearData();
            this.getCategoryData();
            this.imgmodal.close();
            this.toastr.success( "Image Uploaded successfully", 'Success!' );
        }

    }
}
