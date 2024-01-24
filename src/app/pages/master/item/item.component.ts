import { Component, OnInit } from '@angular/core';
import { ItemService } from './item.service';
import { Router } from '@angular/router';
import { ModalComponent } from '../../common/modal/modal.component';
import { CommonService } from '../../common/common.service';
import { CategoryService } from '../category/category.service';
import { SubcategoryService } from '../subcategory/subcategory.service';
import { ItemtypeService } from '../itemtype/itemtype.service';
import { ItemcategoryService } from '../itemcategory/itemcategory.service';
import { Select2OptionData } from 'ng2-select2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import { Location } from '@angular/common';

@Component( {
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './item.component.css']
} )
export class ItemComponent implements OnInit {
    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 50;
	rowsOnPageSet = [50,100,150];
    sortBy = 'id_item';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    itemdet = this.getEmptyItem();
    categories = [];
    public exampleData: Observable<Array<Select2OptionData>>;
    public startValue: Observable<string>;
    subcategories = [];
    itemtypes = [];
    producttypes = [];
    productiontype = [{ 'productionid': 0, 'productionname': 'NONE' }, { 'productionid': 1, 'productionname': 'BOM' }];
    itemcategories= [];
	disablesubmit = false;
	accessData;
	records =[];
	public loadingPicture = 'assets/img/theme/loading.gif';
    constructor( private location: Location, private service: ItemService, private router: Router, private commonservice: CommonService, private catservice: CategoryService, private subcatservice: SubcategoryService, private itemtype: ItemtypeService, private itemcategory: ItemcategoryService ) {
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
        this.getItemData();
        this.getAllParentCategory();
        this.startValue = Observable.create( obs => {
            obs.next( 'dyn3' );
            obs.complete();
        } ).delay( 6000 );
        this.itemtype.getitemtypeData().then(( data ) => {
            this.itemtypes = data;
        } );
        this.itemcategory.getitemcategoryData().then((data)=>{
            this.itemcategories = data;
        });
        
        this.producttypes = [{ 'id_producttype': 1, 'name_producttype': 'Item' }, { 'id_producttype': 2, 'name_producttype': 'Service' }];
    }
    getAllSubCategory( catid ) {
        this.subcatservice.getSubCategoryByCatId( catid ).then(( data ) => {
            this.subcategories = data;
        } );
    }
    getAllParentCategory() {
        this.catservice.getCategoryData().then(( data ) => {
            this.categories = data
            this.exampleData = data;
        } );
    }
    newItem( ctype, caid ) {
        if ( ctype == 1 ) {
            this.title = 'New Item';
            this.isEditMode = false;
            this.isAddMode = true;
            this.clearData();
        } else {
			this.itemdet = this.getEmptyItem();
            this.getItemById( caid );
            this.title = 'Update Item';
            this.isEditMode = true;
            this.isAddMode = false;
        }
        this.open();
    }
    deleteItem( itemid ) {
        this.itemdet.id_item = itemid;
        this.title = 'Delete Item';
        this.deletemodal.open();
    }
    getItemById( itemid ) {
        this.service.getItemById( itemid ).then(( data ) => {
            if ( data.success ) {
                this.itemdet = this.setItementry( data.responseData );
                this.getAllSubCategory( data.responseData.category_item );
            }
        } );
    }
    getItemData() {
        this.service.getItemData().then(( data ) => {
            this.data = data;
			this.records =data;
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

    setItementry( itemdetails ) {
        return {
            id_item: itemdetails.id_item,
            code_item: itemdetails.code_item,
            name_item: itemdetails.name_item,
            category_item: itemdetails.category_item,
            subcategory_item: itemdetails.subcategory_item,
            status: itemdetails.status,
            searchname_item: itemdetails.searchname_item,
            subtype_item: itemdetails.subtype_item,
            item_type: itemdetails.item_type,
            product_type: itemdetails.product_type,
            production_type: itemdetails.production_type,
            itemcol_category: itemdetails.itemcol_category
        }
    }
    getEmptyItem() {
        return {
            id_item: '',
            code_item: '',
            name_item: '',
            category_item: '',
            subcategory_item: '',
            status: '1',
            searchname_item: '',
            subtype_item: '0',
            item_type: '',
            product_type: '',
            production_type: '',
            itemcol_category: ''
        }
    }
    saveItem( isUpdate, canClose ) {
		 this.disablesubmit = true;
        if ( isUpdate ) {
            if ( this.itemdet.id_item != '' ) {
                this.service.updateitem( JSON.stringify( this.itemdet ) ).then( res => {
                    if ( res ) {
                        //this.router.navigate( ['pages/master/item'] );
                        this.clearData();
                        this.getItemData();					
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
            this.service.saveaitem( JSON.stringify( this.itemdet ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
						this.getItemData();
						if ( canClose ) {
							this.modal.close();
						}
						this.clearData();
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    //this.router.navigate( ['pages/master/item'] );
                     this.disablesubmit = false;
                }
            }, error => {
					this.disablesubmit = false;
            } );
        }
    }
    removeItem( itemid ) {
        this.service.deleteitem( JSON.stringify( { 'id': itemid } ) ).then( res => {
            if ( res ) {
                if ( res.success ) {
                    this.commonservice.showAlertMSG( 1, res.message );
                } else {
                    this.commonservice.showAlertMSG( 2, res.message );
                }
                //this.router.navigate( ['pages/master/item'] );
                this.getItemData();
                this.deletemodal.close();
                this.clearData();
            }
        }, error => {

        } );
    }
    private clearData() {
        this.itemdet = this.getEmptyItem();
    }

}
