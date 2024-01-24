import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewContainerRef, EventEmitter, NgZone } from '@angular/core';
import { CategoryService } from './category.service';
import { Router } from '@angular/router';
import { ModalComponent } from '../../common/modal/modal.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ToastsManager } from 'ng2-toastr';
import { NgUploaderOptions, UploadedFile, UPLOAD_DIRECTIVES } from 'ngx-uploader';
import 'rxjs/add/operator/filter';
import {Pipe, PipeTransform} from '@angular/core';
import { Location } from '@angular/common';
import { CommonService } from '../../common/common.service';

@Component( {
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './category.component.scss'],
    animations: [
        trigger( 'containerState', [
            state( 'hide', style( { transform: 'translateY(-102%)' } ) ),
            transition( 'hide => show', [
                animate( 500, style( { transform: 'translateY(0)' } ) )
            ] ),
            transition( 'show => hide', [
                animate( 500, style( { transform: 'translateY(-102%)' } ) )
            ] )
        ] )
    ]
} )
export class CategoryComponent implements OnInit {

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
    sortOrder = 'asc';
    title: string = '';
	records =[];
	public loadingPicture = 'assets/img/theme/loading.gif';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    categorydet = this.getEmptyCategory();
    categoryimage = this.getEmptyCatImgData();
	disablesubmit = false;
	accessData;
	
	
	
	
    private serverurl:string;
    public defaultPicture = 'assets/img/theme/no-photo.png';
    public profile: any = {
        picture: 'assets/img/app/profile/Nasta.png'
    };
    public uploaderOptions: NgUploaderOptions;
    constructor( private location: Location,private service: CategoryService, private router: Router, public toastr: ToastsManager,private commonservice: CommonService  ) {
        this.getCategoryData();
        this.serverurl = service.getServerurl();
        this.uploadProgress = 0;
        this.uploadResponse = {};
        this.zone = new NgZone( { enableLongStackTrace: false } );
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
    }
	

    newCategory( ctype, caid ) {
        if ( ctype == 1 ) {
            this.title = 'New Category';
            this.isEditMode = false;
            this.isAddMode = true;
            this.clearData();
        } else {
			this.categorydet = this.getEmptyCategory();
            this.getCategoryById( caid );
            this.title = 'Update Category';
            this.isEditMode = true;
            this.isAddMode = false;
        }
        this.open();
    }
    imageCategory( catid ) {
        this.categoryimage = this.getEmptyCatImgData();
        this.title = 'Update Category Images';
        for ( let data of this.data ) {
            if ( data.id_category == catid ) {
                if ( data.imgurl != null && data.imgurl != '' ) {
                    this.categoryimage = {
                        id_category: catid,
                        image: data.image,
                        imgurl: data.imgurl
                    }
                } else {
                    this.categoryimage = {
                        id_category: catid,
                        image: '',
                        imgurl: 'assets/img/theme/no-photo.png'
                    }
                }
                this.uploadFile = "";
                this.uploadProgress = 0;;
                this.uploadResponse = null;
                this.uploaderOptions = new NgUploaderOptions( {
                    // url: 'http://website.com/upload'
                    url: this.serverurl + 'master_api/categoryimageupload',
                    method: 'POST',
                    data: this.categoryimage,
                    authToken: this.service.getAuthtoken(),
                    authTokenPrefix: this.service.getauthTokenPrefix(),
                    previewUrl: true,
                    calculateSpeed: true,
                    fieldName: 'category'
                } );
				console.log(this.uploaderOptions);
				console.log(this.uploaderOptions.fieldName);
				
                this.imgmodal.open();
                //setTimeout(() => { this.imgmodal.open() }, 1000 );
            }
        }
        //setTimeout(() => { this.imgmodal.open() }, 1000 );
    }
    deleteCategory( catid ) {
        this.categorydet.id_category = catid;
        this.title = 'Delete Category';
        this.deletemodal.open();
    }
    getCategoryById( catid ) {
        this.service.getCategoryById( catid ).then(( data ) => {
            console.log( data.responseData );
            if ( data.success ) {
                this.categorydet = this.setCategoryentry( data.responseData );
            }
        } );
    }
    getCategoryData() {
        this.service.getCategoryData().then(( data ) => {
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
            id_category: catdetails.id_category,
            name: catdetails.name,
            description: catdetails.description,
            status: catdetails.status,
            createdby: 1,
            category_code: catdetails.category_code
        }
    }
    getEmptyCatImgData() {
        return {
            id_category: '',
            image: '',
            imgurl: ''
        }
    }
    getEmptyCategory() {
        return {
            id_category: '',
            name: '',
            description: '',
            status: "1",
            createdby: 1,
            category_code: ''
        }
    }
    saveCategory( isUpdate, canClose ) {
		this.disablesubmit = true;
        if ( isUpdate ) {
            if ( this.categorydet.id_category != '' ) {
                this.service.updatecategory( JSON.stringify( this.categorydet ) ).then( res => {
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
            this.service.saveacategory( JSON.stringify( this.categorydet ) ).then( res => {
                if ( res ) {
					if(res.success){
						this.toastr.success( res.message, 'Success!' );							
						this.getCategoryData();
						if ( canClose ) {
						    this.modal.close();
						}
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
        this.service.deletecategory( JSON.stringify( { 'id': catid } ) ).then( res => {
            if ( res ) {
                if(res.success){
					this.toastr.success( res.message, 'Success!' );		
				}else{
					this.toastr.warning( res.message, 'Warning!' );
				}
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
    /*public uploaderOptions: NgUploaderOptions = {
        // url: 'http://website.com/upload'
        url: 'http://localhost:97/sencogold/index.php/master_api/categoryimageupload',
        method: 'POST',
        data: this.categoryimage,
        authToken: btoa( 'lmxretail:lmx@2017' ),
        authTokenPrefix: 'Basic',
        fieldReset:true
    };*/

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



