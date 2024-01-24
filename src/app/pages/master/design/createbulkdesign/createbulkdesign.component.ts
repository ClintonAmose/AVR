import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DesignService } from '../design.service';
import { CategoryService } from '../../category/category.service';
import { SubcategoryService } from '../../subcategory/subcategory.service';
import { CollectionService } from '../../collection/collection.service';
import { StyleService } from '../../style/style.service';
import { ThemeService } from '../../theme/theme.service';
import { Observable } from 'rxjs/Rx';
import { CommonService } from '../../../common/common.service';
import { CompleterCmp, CompleterData, CompleterService, CompleterItem, RemoteData } from 'ng2-completer';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ModalComponent } from '../../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { Location,AsyncPipe } from '@angular/common';
import { ExcelService } from '../../../reports/excel.service';
import * as XLSX from 'xlsx';

@Component( {
    selector: 'app-createbulkdesign',
    templateUrl: './createbulkdesign.component.html', 
    styleUrls: ['./createbulkdesign.component.css','../../../tables/components/dataTables/dataTables.scss']
} )
export class CreatebulkdesignComponent implements OnInit {
    accessData;
	bomdetails;
	data;
	avaliable_designs;
	designdata =[];
	categories =[];
	subcategories =[];
	collections=[];
	styles=[];
	themes=[];
	categories_id =[];
	subcategories_id =[];
	collections_id =[];
	styles_id =[];
	themes_id =[];
	selectedpurity;
    designdet = this.getEmptyDesign();
	arrayBuffer:any;
    file:File;
	exceldata;
	disablesubmit = true;
    
    constructor( private service: DesignService,private catservice: CategoryService,private subcatservice: SubcategoryService,private collservice: CollectionService, private styleservice: StyleService, private themeservice: ThemeService, private router: Router, private commonservice: CommonService,private location: Location,completerService: CompleterService,http: Http,private excelService: ExcelService ) {
    }
    ngOnInit() {
        this.getDesignData();
		this.getAllParentCategory();
    }
	// Basic Checked
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
			design_expire:''
        }
    }
	
	incomingfile(event) 
    {
		
      this.file= event.target.files[0]; 
		  if(this.file)
		  {
			  this.disablesubmit=false;
		  }
    }
	
	 getAllParentCategory() {
		this.categories_id =[];
        this.catservice.getCategoryData().then(( data ) => {
            this.categories = data;
	
			  this.categories.forEach(categories=>
			   {
					this.categories_id.push(categories.id_category);
			   });
			this.getAllSubCategory();
			this.getAllCollections();
			this.getAllStyles();
			this.getAllThemes();
        });
    }
	
	getAllSubCategory() {
		this.subcategories_id =[];
        this.subcatservice.getSubCategoryData().then(( data ) => {
        this.subcategories = data;	
			this.subcategories.forEach(subcategories=>
			{
			   this.subcategories_id.push(subcategories.id_subcategory);
			});	
        });
    }
	
	getAllCollections() {
	    this.collections_id=[];
        this.collservice.getCollectionData().then(( data ) => {
            this.collections = data;
			this.collections.forEach(collections=>
			{
			   this.collections_id.push(collections.id_collection);
			});	
  		
        });
    }
    getAllStyles() {
		 this.styles_id =[];
         this.styleservice.getStyleData().then(( data ) => {
            this.styles = data;
			this.styles.forEach(styles=>
			{
			   this.styles_id.push(styles.id_style);
			});	
			
        } );
    }
    getAllThemes() {
		this.themes_id =[];
        this.themeservice.getThemeData().then(( data ) => {
        this.themes = data;
		this.themes.forEach(themes=>
			{
			   this.themes_id.push(themes.id_theme);
			});	
			
        } );
    }
	
	 Upload() { 
      let fileReader = new FileReader();
	 
	  
        fileReader.onload = (e) => {
			
            this.arrayBuffer = fileReader.result;
			
            var data = new Uint8Array(this.arrayBuffer);
			
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join(""); 
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
			this.exceldata =  XLSX.utils.sheet_to_json(worksheet,{raw:true});
		    this.saveDesigndetails(this.exceldata);
		 
        }
        fileReader.readAsArrayBuffer(this.file);
	
			
    }
	
	 getDesignData() {
        this.service.getDesignData().then(( data ) => {
            this.data = data;
        } );
    }
	

	saveDesigndetails(bulkdata)
	{
		 this.bomdetails = []; 
		  
		 this.accessData = bulkdata;
		
	     this.accessData.forEach(item => {
			 
			  if(!item.name_design || !item.code_design ||  !item.category_design ||  !item.subcategory_design ||!item.collection_design ||!item.style_design ||!item.theme_design ||!item.default_purity || !item.netweight_design || !item.minweight_design )
			   {
				  let serial_number ='Please Enter Excel Row of Serial Number'+' '+item.serial_number+' '+' Rows Properly';
				  this.commonservice.showAlertMSG(2,serial_number);
				   return;
			   }
			   else 
			   { 
		         this.designdata.push(item);
		         this.data.forEach(( design ) => {
					        if(design.code_design ==  item.code_design)
							  { 
						         let serial_number ='Already Have code_design Row of '+' '+item.serial_number+' '+' Give Unique Values';
								 this.commonservice.showAlertMSG(2,serial_number);
								 this.designdata = [];
								 return;
							 }
					 }); 
					 
					 if(this.categories_id) //check Catogory
					 {
					  var imageList = this.categories_id;
					  var index = imageList.indexOf(item.category_design); 
						  if(index<0)
						  {
							  let serial_number ='Catogory Design Code is Wrong Row of '+' '+item.serial_number+' '+' Give Correct Values';
							   this.designdata = [];
							  this.commonservice.showAlertMSG(2,serial_number);
							  return;
						  }
					 }
					 if(this.subcategories_id) //check SubCatogory
					 {
						 var subimageList = this.subcategories_id;
					     var index        = subimageList.indexOf(item.subcategory_design); 
						  if(index<0)
						  {
							  let serial_number ='SubCatogory Design Code is Wrong Row of '+' '+item.serial_number+' '+' Give Correct Values';
							   this.designdata = [];
							  this.commonservice.showAlertMSG(2,serial_number);
							  return;
						  }
					 }
					 if(this.collections_id) //check Collections
					 {
						 var collectionsList = this.collections_id;
						 console.log(collectionsList);
					     var index           = collectionsList.indexOf(item.collection_design); 
						  if(index<0)
						  {
							  let serial_number ='Collection Design Code is Wrong Row of '+' '+item.serial_number+' '+' Give Correct Values';
							  this.designdata = [];
							  this.commonservice.showAlertMSG(2,serial_number);
							  return;
						  }
					 }
					 
					  if(this.styles_id)  //check Styles
					 {
						 var styleList = this.styles_id;
					     var index     = styleList.indexOf(item.style_design); 
						  if(index<0)
						  {
							  let serial_number ='Style Design Code is Wrong Row of '+' '+item.serial_number+' '+' Give Correct Values';
							  this.designdata = [];
							  this.commonservice.showAlertMSG(2,serial_number);
							  return;
						  }
					 }
					 
				   if(this.themes_id)  //check Themes
					 {
						 var styleList = this.themes_id;
					     var index       = styleList.indexOf(item.theme_design); 
						  if(index<0)
						  {
							  let serial_number ='Theme Design Code is Wrong Row of '+' '+item.serial_number+' '+' Give Correct Values';
							  this.designdata = [];
							  this.commonservice.showAlertMSG(2,serial_number);
							  return;
						  }
					 }
					 
			   }   
					
            });
		 console.log(this.designdata);
		  
		 if(this.designdata.length>0)
		 {
			 this.service.saveabulkdesign( JSON.stringify( {'designdet' : this.designdata,'bomdet' : this.bomdetails,} ) ).then( res => {
				 console.log(res);
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
		 
	}
	
}




