import { Component, OnInit, NgZone, Output, ElementRef, EventEmitter, ChangeDetectorRef, ComponentRef } from '@angular/core';
import { ProductsService } from './products.service';
import { ItemService } from '../item/item.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { HotTablesComponent } from '../../tables/components/hotTables/hotTables.component';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { NgUploaderOptions, UploadedFile, UPLOAD_DIRECTIVES } from 'ngx-uploader';
@Component( {
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css', '../../tables/components/dataTables/dataTables.scss']
} )
export class ProductsComponent implements OnInit {

    uploadFile: any;
    uploadProgress: number;
    uploadResponse: Object;
    uploadInput: EventEmitter<UploadedFile>;
    zone: NgZone;


    modal: ModalComponent;
    deletemodal: ModalComponent;
    imgmodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'name';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    productdet = this.getEmptyProduct();
    items = [];
    productimage = this.getEmptyProductImage();
    private serverurl: string;
    public defaultPicture = 'assets/img/theme/no-photo.png';
    public profile: any = {
        picture: 'assets/img/app/profile/Nasta.png'
    };
    public uploaderOptions: NgUploaderOptions;
    productimagedata = [];

    imgData: Array<any>;
    colHeaders: Array<string>;
    options: any;

    constructor( private elRef: ElementRef, private cdRef: ChangeDetectorRef, private service: ProductsService, private commonservice: CommonService, private itemservice: ItemService ) {
        this.serverurl = BaseAPIURL;
        this.uploadProgress = 0;
        this.uploadResponse = {};
        this.zone = new NgZone( { enableLongStackTrace: false } );
    }
    toInt( num: string ) {
        return +num;
    }

    sortByWordLength = ( a: any ) => {
        return a.city.length;
    }
    ngOnInit() {
        this.colHeaders = ['S.No', 'Image', 'Default', 'Option'];
        this.options = {
            height: 500,
            rowHeaders: false,
            stretchH: 'all',
            columnSorting: true,
            contextMenu: true,
            autoWrapRow: true,
            columns: [
                { data: 0, type: 'numeric', width: '10%' },
                { data: 1, renderer: 'html', width: '40%' },
                { data: 2, type: 'text', width: '30%' },
                { data: 3, renderer: 'html', width: '20%' }
            ],
            cells: function( row, col, prop ) {
                let cellProperties: any = {};
                cellProperties.className = 'htMiddle htCenter';
                return cellProperties;
            }
        };
        this.getProductData();
        this.getAllItems();
    }
    getProductData() {
        this.service.getProductData().then(( data ) => {
            this.data = data;
        } );
    }
    getAllItems() {
        this.itemservice.getItemData().then(( data ) => {
            this.items = data;
        } );
    }
    getEmptyProductImage() {
        return {
            id_image: '',
            id_product: '',
            image: '',
            imgurl: ''
        }
    }
    getEmptyProduct() {
        return {
            id_product: '',
            id_item: '',
            name: '',
            description: '',
            code: '',
            gold_value: '',
            tax: '',
            stone_charges: '',
            making_charges: '',
            id_metal: '',
            allowed_order_qty: '',
            status: '',
            weight: ''
        }
    }
    newProduct( ctype, caid ) {
        if ( ctype == 1 ) {
            this.title = 'New Product';
            this.isEditMode = false;
            this.isAddMode = true;
            this.clearData();
        } else {
            this.getProductById( caid );
            this.title = 'Update Product';
            this.isEditMode = true;
            this.isAddMode = false;
        }
        this.open();
    }
    deleteProduct( productid ) {
        this.productdet.id_product = productid;
        this.title = 'Delete Product';
        this.deletemodal.open();
    }
    getProductById( productid ) {
        this.service.getProductById( productid ).then(( data ) => {
            if ( data.success ) {
                this.productdet = this.setProductentry( data.responseData );
            }
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
    closeImageModal() {
        this.imgmodal.close();
    }
    bindModal( _modal ) {
        this.modal = _modal;
    }

    binddeleteModal( _modal ) {
        this.deletemodal = _modal;
    }

    setProductentry( productdetails ) {
        return {
            id_product: productdetails.id_product,
            id_item: productdetails.id_item,
            name: productdetails.name,
            description: productdetails.description,
            code: productdetails.code,
            gold_value: productdetails.gold_value,
            tax: productdetails.tax,
            stone_charges: productdetails.stone_charges,
            making_charges: productdetails.making_charges,
            id_metal: productdetails.id_metal,
            allowed_order_qty: productdetails.allowed_order_qty,
            status: productdetails.status,
            weight: productdetails.weight
        }
    }
    saveProduct( isUpdate, canClose ) {
        if ( isUpdate ) {
            if ( this.productdet.id_product != '' ) {
                this.service.updateproduct( JSON.stringify( this.productdet ) ).then( res => {
                    if ( res ) {
                        this.clearData();
                        this.getProductData();
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
            this.service.saveaproduct( JSON.stringify( this.productdet ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getProductData();
                    if ( canClose ) {
                        this.modal.close();
                    }
                    this.clearData();
                }
            }, error => {

            } );
        }
    }
    removeProduct( productid ) {
        this.service.deleteproduct( JSON.stringify( { 'id': productid } ) ).then( res => {
            if ( res ) {
                if ( res.success ) {
                    this.commonservice.showAlertMSG( 1, res.message );
                } else {
                    this.commonservice.showAlertMSG( 2, res.message );
                }
                this.getProductData();
                this.deletemodal.close();
                this.clearData();
            }
        }, error => {

        } );
    }
    private clearData() {
        this.productdet = this.getEmptyProduct();
    }
    imageProduct( proid ) {
        this.productimage = this.getEmptyProductImage();
        this.title = 'Upload Product Image';
        this.productimage.id_product = proid;
        this.getProductImageData( proid );
        this.imgmodal.open();
        this.productimage.imgurl = "";
    }
    bindImageModal( _modal ) {
        this.imgmodal = _modal;
    }
    handleUpload( data ): void {
        this.uploadFile = data;
        this.zone.run(() => {
            this.uploadProgress = data.progress.percent;
        } );

        let resp = JSON.parse( JSON.stringify( data ) );
        if ( resp.progress.percent == 100 ) {
            //resp = JSON.parse( resp );
            //this.uploadResponse = resp;
            this.getProductImageData( this.productimage.id_product );
            //this.imgmodal.close();
            this.commonservice.showAlertMSG( 1, "Image Uploaded successfully" );
        }

    }
    deleteProductImage( proimgid ) {
        this.service.deleteproductimage( JSON.stringify( { 'id': proimgid } ) ).then( res => {
            if ( res ) {
                if ( res.success ) {
                    this.commonservice.showAlertMSG( 1, res.message );
                } else {
                    this.commonservice.showAlertMSG( 2, res.message );
                }
                this.getProductImageData( this.productimage.id_product );
            }
        }, error => {

        } );
    }
    getProductImageData( proid ) {
        this.service.getProductImages( proid ).then( res => {
            if ( res ) {
                if ( res.success ) {
                    this.imgData = [];
                    this.productimagedata = res.responseData;
                    if ( res.responseData ) {
                        let i = 1;
                        for ( let imdata of res.responseData ) {
                            let imgURL = '<img style="max-width: 100%;" src="' + imdata.imgurl + '">';
                            let imgType = imdata.is_default = 1 ? 'Yes' : 'No';
                            let operation = '<button (click)="deleteProductImage(' + imdata.id_image + ')" class="btn btn-danger ion-trash-a" > </button>';
                            this.imgData.push( [i, imgURL, imgType, operation] );
                            i++;
                        }
                    }
                    this.uploadFile = "";
                    this.uploadProgress = 0;;
                    this.uploadResponse = null;
                    this.uploaderOptions = new NgUploaderOptions( {
                        // url: 'http://website.com/upload'
                        url: this.serverurl + 'master_api/productimageupload',
                        method: 'POST',
                        data: this.productimage,
                        authToken: this.service.getAuthtoken(),
                        authTokenPrefix: this.service.getauthTokenPrefix(),
                        previewUrl: true,
                        calculateSpeed: true,
                        fieldName: 'product'
                    } );
                } else {
                    this.commonservice.showAlertMSG( 2, res.message );
                }
            }
        }, error => {

        } );
    }
}
