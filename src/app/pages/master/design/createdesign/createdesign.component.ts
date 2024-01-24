import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DesignService } from '../design.service';
import { CategoryService } from '../../category/category.service';
import { SubcategoryService } from '../../subcategory/subcategory.service';
import { CollectionService } from '../../collection/collection.service';
import { StyleService } from '../../style/style.service';
import { ThemeService } from '../../theme/theme.service';
import { CommonService } from '../../../common/common.service';
import { IMyDpOptions } from 'mydatepicker';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { PurityService } from '../../purity/purity.service';

import { BranchService } from '../../branch/branch.service';
/*import { ItemService } from '../../item/item.service';
import { ItemcategoryService } from '../../itemcategory/itemcategory.service';*/
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

import { TreeModel, NodeEvent } from 'ng2-tree';

import { Location } from '@angular/common';

@Component( {
    selector: 'app-createdesign',
    templateUrl: './createdesign.component.html',
    styleUrls: ['./createdesign.component.css','../../../tables/components/dataTables/dataTables.scss']
} )
export class CreatedesignComponent implements OnInit {

  
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    }; 
 
// Expire Design Dates Formats

    expire_designdate: Date = new Date();
     settings = {
        bigBanner: true,
        timePicker: true,
        format: 'dd-MM-yyyy hh:mm:ss a',
        defaultOpen: false,
		closeOnSelect:true
    }
 
 
 
    categories = [];
    subcategories = [];
    collections = [];
    styles = [];
    themes = [];
    vendors = [];
    designdet = this.getEmptyDesign();
    bomdetails = [];
    purities = [];
    BOMLines = [];
    itemcategories = [];
    rawitems = [];	
	selectedpurity = [];
	disablesubmit = false;
    branches = [];
	stockdet =this.getStockData();

    constructor( private service: DesignService, private router: Router, private catservice: CategoryService, private subcatservice: SubcategoryService, private collservice: CollectionService, private styleservice: StyleService, private themeservice: ThemeService, private commonservice: CommonService, private purityservice: PurityService, private branchservice: BranchService,/* private itemservice: ItemService, private itecat: ItemcategoryService*/ ) {
    }
    ngOnInit() {
        this.getAllParentCategory();
       
    }
	// Basic Checked
	 
	
	//For purity select
	selPurity(id_purity:number,isChecked:boolean){
		if(isChecked){
			 this.selectedpurity.push(id_purity);
		}
		else{
			var index = this.selectedpurity.indexOf(id_purity);
			if(index !== -1){
				this.selectedpurity.splice(index, 1);
			}			
		}
	}
	
	
	
	onDateSelect($event)
	{
		let choosedate = $event;
	    this.designdet.design_expire = choosedate.getDate() +"-"+(choosedate.getMonth()+1) +"-"+choosedate.getFullYear() +" "+choosedate.getHours()+":"+choosedate.getMinutes()+":"+choosedate.getSeconds();
	}
	
	
    getAllSubCategory( catid ) {
        this.subcatservice.getSubCategoryByCatId( catid ).then(( data ) => {
            this.subcategories = data;
        } );
    }
    getAllParentCategory() {
        this.catservice.getCategoryData().then(( data ) => {
            this.categories = data
            this.getAllCollections();
            this.getAllStyles();
            this.getAllThemes();
            this.getAllVendors();
			this.getAllPurity();
			this.getAllBranches();
            /*this.bomdetails.push( this.getBOMEmptyData() );
            this.getAllBOMLinetypes();
            this.getAllItemCategory();            
            this.getAllRawITems();*/
        } );
    }
    getAllCollections() {
        this.collservice.getCollectionData().then(( data ) => {
            this.collections = data;
        } );
    }
    getAllStyles() {
        this.styleservice.getStyleData().then(( data ) => {
            this.styles = data;
        } );
    }
    getAllThemes() {
        this.themeservice.getThemeData().then(( data ) => {
            this.themes = data;
        } );
    }
   /*  getAllVendors() {
        this.service.getVendrordata().then(( data ) => {
            angular.forEach(data, function(value, key){
				this.vendors['']=
			});
            this.vendors = data;
        } );
    } */
	 getAllVendors() {
        this.service.getVendrordata().then(( data ) => {
            this.vendors = data;
        } );
    }
    getAllPurity() {
        this.purityservice.getActivePurityData().then(( data ) => {
            this.purities = data;
        } );
    }
	
	getAllBranches() {
        this.branchservice.getData().then(( data ) => {
            this.branches = data;
			console.log(this.branches);
        } );
    }

	
    /*getAllBOMLinetypes() {
        this.commonservice.getAllBOMLineType().then(( data ) => {
            this.BOMLines = data;
        } );
    }
    getAllRawITems() {
        this.itemservice.getItemData().then(( data ) => {
            this.rawitems = data;
        } );
    }
    getAllItemCategory() {
        this.itecat.getitemcategoryData().then(( data ) => {
            this.itemcategories = data;
        } );
    }*/
	
    getEmptyDesign() {
		 let date = new Date();
        return {
            id_design: '',
            name_design: '',
            code_design: '',
			is_chain:0,
			login_not_required:0,
			isnewarrival:0,
			is_quieckselect:0,
			s_hook_type:'',
			m_hook_type:'',
			expire: {
                date: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                }
            },
			expire_date:'',
            category_design: '',
            subcategory_design: '',
            collection_design: '',
            style_design: '',
            theme_design: '',
            netweight_design: '',
            minweight_design: '',
			default_purity:'1',
            size: '',
			pieces:'',
		    vendor_design: '',
		    vendor_designno:'',
			selectcustomer:'1',
            created_by: this.commonservice.getLoginId(),
			design_expire:'',
			is_stock:'0'	
        }
    }
	getStockData()  {
		 return {
            	 
		    order_for:'1',
			id_branch:'',
			id_karigar:'',
			ortertype:'4',
			deliverydate:'',
			qty:'',
			isurgent:'0',
			is_customeitem:'0',
			remarks:'',
		 }
	}
    getBOMEmptyData() {
        return { 'isChecked' : false, 'linetype_bom': "", 'rawitem_id': "", 'semifinishitem_id': "", 'finishitem_id': "", 'item_category': "", 'purity': "", 'netweight': 0, 'primaryitem': false, 'noofstone': 0 }
    }
	
		

	
  
  pieces_keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

		if (!pattern.test(inputChar)) {
		  // invalid character, prevent input
		  event.preventDefault();
		}
  }
	
	
    saveDesigndetails() {
	this.disablesubmit = true;
	 if( this.designdet.expire != null ) {
		   var day     = this.designdet.expire.date.day;
		   var month   = this.designdet.expire.date.month;
		   var year    = this.designdet.expire.date.year;
		   this.designdet.expire_date = day.toString()+ "-" +month.toString()+ "-" +year.toString();
        } 		
        this.service.saveadesign( JSON.stringify( {'designdet' : this.designdet, 'bomdet' : this.bomdetails, 'puritydet' : this.selectedpurity,'stockdet':this.stockdet} ) ).then( res => {
            if ( res ) {
                if ( res.success ) {
                    this.commonservice.showAlertMSG( 1, res.message );
					this.router.navigate( ['pages/master/design'] );
                } else {
                    this.commonservice.showAlertMSG( 2, res.message );
                }
              this.disablesubmit = false; 
            }
        }, error => {
			this.disablesubmit = false; 

        } );
    }
    btnCloseDesign() {
        this.router.navigate( ['pages/master/design'] );
    }
    btncreateNewRow(){
        this.bomdetails.push( this.getBOMEmptyData() );
    }
    btnRemoveRow() {
        this.bomdetails.forEach(( bom ) => { // foreach statement  
            if ( bom.isChecked == true ) {
                let index: number = this.bomdetails.indexOf( bom );
                if ( index !== -1 ) {
                    this.bomdetails.splice( index, 1 );
                }
            }
        } )
    }

}
