import { Component, OnInit, NgZone, Output, ElementRef, EventEmitter, ChangeDetectorRef, ComponentRef } from '@angular/core';
import { DesignService } from './design.service';
import { ItemService } from '../item/item.service';
import { CategoryService } from '../category/category.service';
import { SubcategoryService } from '../subcategory/subcategory.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { HotTablesComponent } from '../../tables/components/hotTables/hotTables.component';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { NgUploaderOptions, UploadedFile, UPLOAD_DIRECTIVES } from 'ngx-uploader';
import { CollectionService } from '../collection/collection.service';
import { StyleService } from '../style/style.service';
import { ThemeService } from '../theme/theme.service';
import { BranchService } from '../branch/branch.service';
import { Location } from '@angular/common';
import { GlobalState } from '../../../global.state';
import { StockManageService } from '../stockmanage/stockmanage.service';
@Component( {
    selector: 'app-design',
    templateUrl: './design.component.html',
    styleUrls: ['./design.component.css', '../../tables/components/dataTables/dataTables.scss']
} )
export class DesignComponent implements OnInit {

    uploadFile: any;
    uploadProgress: number;
    uploadResponse: Object;
    uploadInput: EventEmitter<UploadedFile>;
    zone: NgZone;

    
    designmodal: ModalComponent;
    bommodel: ModalComponent;
    deletemodal: ModalComponent;
    deletedesignmodal: ModalComponent;
    imgmodal: ModalComponent;
	designimgmodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 50;
	rowsOnPageSet = [50,100,150]; 
    sortBy = 'name';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    isBOMEditMode: boolean = false;
    isBOMAddMode: boolean = false;
    designdet = this.getEmptyDesign();
    items = [];
	stock_add =[];
    design_images;
	branch_id;
    productimage = this.getEmptyProductImage();
	stock_manages : any;
    private serverurl: string;
    public defaultPicture = 'assets/img/theme/loading.gif';
    public profile: any = {
        picture: 'assets/img/app/profile/Nasta.png'
    };
    public uploaderOptions: NgUploaderOptions;
    productimagedata = [];
	
	public isMenuCollapsed: boolean = false;
    
	expire_designdate: Date = new Date();
     settings = {
        bigBanner: true,
        timePicker: true,
        format: 'dd-MM-yyyy hh:mm:ss a',
        defaultOpen: false,
		closeOnSelect:true
    }
    imgData: Array<any>;
    colHeaders: Array<string>;
    options: any;
    categories = [];
    subcategories = [];
    collections = [];
    styles = [];
    themes = [];
    vendors = [];
    bomdetails = [];
    purities = [];
    BOMLines = [];
    itemcategories = [];
    rawitems = [];
    resid='';
	selpurities = [];
	purityAltered = false;
	accessData;
    expire_design ="";
	alluser;
    overalluser;
	disablesubmit = true;
	revertsubmit = true;
	user_active =[];
	user_inactive =[];
	records =[];
	branches =[];
    allusers =[];
    designaction=0;
	stock_items;
    adminusers="";
    designall;
    constructor( private location: Location,private elRef: ElementRef, private cdRef: ChangeDetectorRef, private service: DesignService, private commonservice: CommonService, private catservice: CategoryService, private subcatservice: SubcategoryService, private collservice: CollectionService, private styleservice: StyleService, private themeservice: ThemeService,private branchservice: BranchService,private _state: GlobalState,private stockmanage : StockManageService) {
        this.serverurl = BaseAPIURL;
        this.uploadProgress = 0;
        this.uploadResponse = {};
        this.zone = new NgZone( { enableLongStackTrace: false } );
        this.getAllParentCategory();

		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
		
		 this._state.subscribe( 'menu.isCollapsed', ( isCollapsed ) => {
            this.isMenuCollapsed = isCollapsed;
        } );
		 
        this.toggleMenu(); 
		
		
		
    }
	
	 public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
		console.log(this.isMenuCollapsed);
        this._state.notifyDataChanged( 'menu.isCollapsed', this.isMenuCollapsed );
        return false;
    }
	
	
	
    toInt( num: string ) {
        return +num;
    }
    ngOnInit() {
        this.getDesignData();
		this.designexpire();
		this.getStockManageData();
        this.getallusers();
    }
    getDesignData() {
        this.service.getDesignData().then(( data ) => {
            this.data = data;
            this.designall = data;
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
	
	designexpire()
	{
		  this.service.getExpiredesign().then(( data ) => {
            this.expire_design = data;
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

	//For purity select
	selPurity(id_purity:number,isChecked:boolean){
		this.purityAltered = true;
		if(isChecked){
			 this.selpurities.push(id_purity);
		}
		else{
			var index = this.selpurities.indexOf(id_purity);
			if(index !== -1){
				this.selpurities.splice(index, 1);
			}
		}

	}
	
   // Get Stock Manage Datas

	 getStockManageData() {
        this.stockmanage.getStockManageData().then(( data ) => {
			this.stock_manages =data[0].status;
			console.log(this.stock_manages);
		});
    }
	
	

	selPurity1(id_purity:number,isChecked:boolean){
		this.purityAltered = true;
		if(isChecked){
			 this.selpurities.push(id_purity);
		}
		else{
			var index = this.selpurities.indexOf(id_purity);
			if(index !== -1){
				this.selpurities.splice(index, 1);
			}			
		}
	}
     
	 branch_wise(branch_id,design) 
	 {
		 design.available_branch =branch_id;
           if(branch_id)
		   {
			    let obj = design.avaliablestock_design.indivual_branchstock.filter( designs=> designs.branch_id ==  branch_id);
				
			    if(obj.length>0)
				{
					design.avaliablestock_design.branch_stock =obj[0];
					return design.avaliablestock_design.total_stock =obj[0].available_stock;
				}
				else
				{
					this.commonservice.showAlertMSG( 2, 'Avaliable Stock is Empty');
					return design.avaliablestock_design.total_stock =0;
				}
			 
		   }
		   else
		   {
			   let obj =0;
			     design.avaliablestock_design.indivual_branchstock.forEach(( design_stock ) => {
	                 
					  obj = obj+parseInt(design_stock.available_stock);
                  
		        });
				
				design.avaliablestock_design.total_stock =obj;
		   } 
     }
	 
	 stock_addprocess(qty,design_datas)
	 {
		 let stock_qty = qty.target.value;
         
		 if(stock_qty>0){
		     design_datas.add_stock = stock_qty;
	    }
	    else
		{
            qty.target.value = '';
		     this.commonservice.showAlertMSG(2, "Please Enter Stock Qty Value Properly");
	    }
	 
	 
	 }
	 
	 add_stockstatus()
	 {
		         if (this.stock_add.length>0) {
					this.service.add_stockprocess( JSON.stringify( { 'stock_items':this.stock_add } ) ).then( res => {
						if ( res ) {
							this.getDesignData();
							this.stock_add=[];
							if ( res.success ) {
								this.commonservice.showAlertMSG( 1, res.message );
							} else {
								this.commonservice.showAlertMSG( 2, res.message );
							}
						}
					}, error => {
						this.commonservice.showAlertMSG( 2, "Please select any one Design" );
					} );
              }
			  else
			  {
				  this.commonservice.showAlertMSG( 2, "Please select any one Design" );
			  }
	 }
	 

	//End of purity select
    getEmptyDesign() {
		 let date = new Date();
        return {
            id_design: '',
            name_design: '',
            code_design: '',
            vendor_designno: '',
            category_design: '',
            subcategory_design: '',
            collection_design: '',
            style_design: '',
            theme_design: '',
            vendor_design: '',
            netweight_design: '',
            minweight_design: '',
            size: '',
            pieces: '',
            default_purity: '',
			expire: {
                date: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                }
            },
			expire_date:'',
			design_expire:'',
            created_by: this.commonservice.getLoginId(),
            updated_by: '',
			is_chain:0,
			s_hook_type:0,
			m_hook_type:0,
			login_not_required:0,
			isnewarrival:0,
			is_quickorder:0,
			status:1,
			selectcustomer:1,
			is_stock:0
			}
    }
    editDesign( designid ) {
		this.designdet = this.getEmptyDesign();
        this.getDesignById( designid );
        this.getDesignPuritiesById( designid );
        this.title = 'Update Design';
        this.isEditMode = true;
        this.isAddMode = false;
        this.open();
    }
    editBOM( designid ) {
        this.getBOMByDesignId( designid );
        this.designdet.id_design = designid;
        this.title = 'Update BOM';
        this.isBOMEditMode = true;
        this.isBOMAddMode = false;
        this.openBOM();
    }
    getDesignById( designid ) {
        this.service.getDesignById( designid ).then(( data ) => {
            if ( data.success ) {
				let design_dats = data.responseData;
				console.log(design_dats);
                this.designdet = this.setDesignentry(data.responseData);

				let date = new Date(this.designdet.expire_date);
				this.designdet.expire = {
                        date: {
                            year: date.getFullYear(),
                            month: date.getMonth() + 1,
                            day: date.getDate()
                        }
                    }
				if(this.designdet.design_expire !='')
				{
					this.expire_designdate =new Date(this.designdet.design_expire);
				}
				else
				{
					this.expire_designdate = new Date();
				}
            }
        } );
    }
	
	onDateSelect($event)
	{
		let choosedate = $event;
	    this.designdet.design_expire = choosedate.getDate() +"-"+(choosedate.getMonth()+1) +"-"+choosedate.getFullYear() +" "+choosedate.getHours()+":"+choosedate.getMinutes()+":"+choosedate.getSeconds();
	}
	
	getDesignPuritiesById( designid ) {
        this.service.getDesignPuritiesById( designid ).then(( data ) => {
            if ( data.success ) {
                this.purities = data.responseData;
				this.selpurities = [];
				data.responseData.forEach(v => v.isChecked ? this.selpurities.push(v.id_purity) : v);
            }
        } );
    }
    getBOMByDesignId( designid ) {
        this.service.getBOMByDesignId( designid ).then(( data ) => {
            if ( data.success ) {
                this.bomdetails = data.responseData;
            }
        } );
    }
    getAllParentCategory() {
        this.catservice.getCategoryData().then(( data ) => {
            this.categories = data;
            this.getAllVendors();
            this.getAllCollections();
            this.getAllStyles();
            this.getAllThemes();
            this.commonservice.getSelectItemData();
			this.getAllBranches();
            /* this.getAllBOMLinetypes();
            this.getAllItemCategory();
			this.getAllPurity();
            this.getAllRawITems();*/
        } );
    }
    getAllSubCategory( catid ) {
        this.subcatservice.getSubCategoryByCatId( catid ).then(( data ) => {
            this.subcategories = data;
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
    getAllVendors() {
        this.service.getVendrordata().then(( data ) => {
            this.vendors = data;
        } );
    }
	getAllBranches() {
        this.branchservice.getData().then(( data ) => {
            this.branches = data;
			console.log(this.branches);
        } );
    }
    getallusers() {
        this.service.getallusers().then(( data ) => {
             this.allusers = data;
			console.log(this.allusers);
        } );
    }
    /* getAllPurity() {
         this.purityservice.getPurityData().then(( data ) => {
             this.purities = data;
         } );
     }
     getAllBOMLinetypes() {
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
    open() {
        this.designmodal.open();
    }
    close() {
        this.designmodal.close();
    }
    openBOM() {
        this.bommodel.open();
    }
    closeBOM() {
        this.bommodel.close();
    }

    closedeletepopup() {
        this.deletemodal.close();
    }
    closeImageModal() {
        this.imgmodal.close();
    } 
	closedesignImageModal() {
        this.designimgmodal;
    }
    bindModal( _modal ) {
        this.designmodal = _modal;
    }
    bindBOMModal( _modal ) {
        this.bommodel = _modal;
    }

    binddeleteModal( _modal ) {
        this.deletemodal = _modal;
    }
	binddesignModal( _modal ) {
        this.designimgmodal = _modal;
    }
    setDesignentry( designdetails ) {
        this.getAllSubCategory( designdetails.category_design );
        return {
            id_design: designdetails.id_design,
            name_design: designdetails.name_design,
            code_design: designdetails.code_design,
            vendor_designno: designdetails.vendor_designno,
            category_design: designdetails.category_design,
            subcategory_design: designdetails.subcategory_design,
            collection_design: designdetails.collection_design,
            style_design: designdetails.style_design,
            theme_design: designdetails.theme_design,
            vendor_design: designdetails.vendor_design,
            netweight_design: designdetails.netweight_design,
            minweight_design: designdetails.minweight_design,
            is_quickorder: designdetails.is_quickorder,
            size: designdetails.size,
            pieces: designdetails.pieces,
            default_purity: designdetails.default_purity,
			expire_date:designdetails.expire_date,
			expire:designdetails.expire_date,
            created_by: this.commonservice.getLoginId(),
            updated_by: this.commonservice.getLoginId(),
			is_chain:designdetails.is_chain,
			s_hook_type:designdetails.s_hook_type,
			m_hook_type:designdetails.m_hook_type,
			login_not_required:designdetails.login_not_required,
			isnewarrival:designdetails.isnewarrival,
			status:designdetails.status,
			selectcustomer:designdetails.selectcustomer,
			design_expire:designdetails.design_expire,
			is_stock:designdetails.is_stock
			}
    }
    updateDesign( id_design ) {
        if ( this.designdet.id_design != '' ) {
			let purity = (this.purityAltered ? this.selpurities:[]);
            var day     = this.designdet.expire.date.day;
		    var month   = this.designdet.expire.date.month;
		    var year    = this.designdet.expire.date.year;
		    this.designdet.expire_date = day.toString()+ "-" +month.toString()+ "-" +year.toString();
			this.service.updatedesign( JSON.stringify({ 'designdet':this.designdet,'puritydet':purity} ) ).then( res => {
                if ( res ) {
                    console.log(res);
                    
					this.purityAltered = false;
                    this.clearData();
					this.designexpire();
                    this.getDesignData();
                    this.close();
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                }
            }, error => {

            } );
        }
    }
    updateBOM( id_design ) {
        if ( this.designdet.id_design != '' ) {
            this.service.updatedesignbom( JSON.stringify( { 'design_id': this.designdet.id_design, 'bomdetails': this.bomdetails } ) ).then( res => {
                if ( res ) {
                    this.bomdetails = [];
                    this.bommodel.close();

                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                }
            }, error => {

            } );
        }
    }
    saveProduct( isUpdate, canClose ) {
		console.log(this.designdet);
        if ( isUpdate ) {
            if ( this.designdet.id_design != '' ) {
                this.service.updatedesign( JSON.stringify( this.designdet ) ).then( res => {
                    if ( res ) {
                        this.clearData();
						this.designexpire();
                        this.getDesignData();
                        this.designmodal.close();
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
            this.service.saveadesign( JSON.stringify( this.designdet ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getDesignData();
                    if ( canClose ) {
                        this.designmodal.close();
                    }
                    this.clearData();
                }
            }, error => {

            } );
        }
    }

    private clearData() {
        this.designdet = this.getEmptyDesign();
    }
    imageProduct( proid ) {
        this.productimage = this.getEmptyProductImage();
        this.title = 'Product Image';
        this.productimage.id_product = proid;
        this.getProductImageData( proid );
        this.imgmodal.open();
        this.productimage.imgurl = "";
    }
    bindImageModal( _modal ) {
        this.imgmodal = _modal;
    }
	
    handleUpload( datas ): void {
		this.productimage.imgurl = "";
	    this.uploadFile = datas;
		console.log(this.uploadFile);
        this.zone.run(() => {
            this.uploadProgress = datas.progress.percent;
        } );
        let resp = JSON.parse( JSON.stringify( datas ) );
		if(datas.id != this.resid){
        if (resp.progress.percent == 100) {
            this.getProductImageData( this.productimage.id_product );
            this.commonservice.showAlertMSG( 1, "Image Uploaded successfully" );
			this.productimage.imgurl='assets/img/theme/no-photo.png';
			this.resid=datas.id;
			}
        }
		this.productimage.imgurl = null;
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
                            let imgType = imdata.is_default == 1 ? true : false;
                            let operation = '<button (click)="deleteProductImage(' + imdata.id_image + ')" class="btn btn-danger ion-trash-a" > </button>';
                            this.imgData.push( [i, imgURL, imgType, operation] );
                            i++;
                        }
                    }
                    this.uploadFile = "";
                    this.uploadProgress = 0;;
                    this.uploadResponse = null;
					console.log(this.productimage);
                    this.uploaderOptions = new NgUploaderOptions( {
                        // url: 'http://website.com/upload'
                        url: this.serverurl + 'master_api/productimageupload',
                        method: 'POST',
                        data: this.productimage,
                        authToken: this.commonservice.getAuthtoken(),
                        authTokenPrefix: this.commonservice.getauthTokenPrefix(),
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
    getBOMEmptyData() {
        return { 'isChecked': false, 'linetype_bom': "", 'rawitem_id': "", 'semifinishitem_id': "", 'finishitem_id': "", 'item_category': "", 'purity': "", 'netweight': 0, 'primaryitem': false, 'noofstone': 0 }
    }
    btncreateNewRow() {
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
    changedefaultimg( checked, id_image ) {
        if ( checked ) {
            this.service.updatedefaultimg( JSON.stringify( { 'id': id_image } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.getProductImageData( this.productimage.id_product );
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getProductImageData( this.productimage.id_product );
                }
            }, error => {

            } );
        }
    }

	islogreq(checkval:boolean){
		this.designdet.login_not_required = (checkval == true ? 1:0);
	}
	isnewarr(checkval:boolean){
		this.designdet.isnewarrival = (checkval == true ? 1:0);
	}
	ischain(checkval:boolean){
		this.designdet.is_chain = (checkval == true ? 1:0);
	}
	mhook(checkval:boolean){
		this.designdet.m_hook_type = (checkval == true ? 1:0);
	}
	shook
	(checkval:boolean){
		this.designdet.s_hook_type = (checkval == true ? 1:0);
	}
	isquieckselect(checkval:boolean){
		this.designdet.is_quickorder = (checkval == true ? 1:0);
	}
	closedelete() {
        this.deletedesignmodal.close();
    }
	binddeletedesignModal( _modal ) {
        this.deletedesignmodal = _modal;
    }
	deleteDesign( cusid ) {
        this.data.id_design = cusid;
        this.title = 'Delete Customer';
        this.deletedesignmodal.open();
    }
	removeDesign( id ) {
        this.service.deletedesign( JSON.stringify( { 'id': id } ) ).then( res => {
            if ( res ) {
                if ( res.success ) {
					this.commonservice.showAlertMSG( 1, res.message );
				} else {
					this.commonservice.showAlertMSG( 2, res.message );
				}
                this.deletedesignmodal.close();
				this.getDesignData();
            }
        }, error => {

        } );
    }
    
	orderImage( design ) {
          this.title          = 'Product Images List';
		  let orderdata       = this.data.filter(item => item.id_design== design);
		  this.design_images = orderdata[0].design_images;
       	  this.designimgmodal.open();
    }
	
	overall_kycdetalis(checked)
  {
	  if(checked == true)
	  {
		  this.alluser = checked;
		  this.overalluser = checked;
		  this.data.forEach(design_detalis =>
		  {
			   if(design_detalis.status=='1')
			  {
				 let revert_design = {'id_design':design_detalis.id_design,'status':'0'};; 
			     this.user_inactive.push(revert_design);
				 this.revertsubmit=false;
			  }
			  else
			  {
				  let design        = {'id_design':design_detalis.id_design,'status':'1'};
				  this.user_active.push(design);
				  this.disablesubmit=false;
			  }
		  });
	  }
	  else
	  {
		  this.alluser = checked;
		  this.overalluser = checked;
		  this.user_inactive =[];
		  this.user_active =[];
		  this.revertsubmit  = true;
		  this.disablesubmit = true;
	  }
  }
  
  
  multiapprove_kycdetalis(checked,design_detalis)
  {
	  if(checked == true)
		  {
			  if(design_detalis.status=='1')
			  {
				 let revert_design = {'id_design':design_detalis.id_design,'status':'0'};  
			     this.user_inactive.push(revert_design);
				 this.revertsubmit=false;
			  }
			  else
			  {
				  let design        = {'id_design':design_detalis.id_design,'status':'1'}; 
				  this.user_active.push(design);
				  this.disablesubmit=false;
			  }
		  }
	   else 
		  {
			  
			  // delete if already choos customer exist in array showing on customers on Approve detalis
			  
			   this.user_active.forEach(( design_record ) => {
				   if(design_record.id_design == design_detalis.id_design)
				   {
					   let obj = [design_record];
						  if(obj.length > 0){
							let index: number = this.user_active.indexOf(obj[0]);
							if (index !== -1) {
								this.user_active.splice(index, 1);
						    }
						} 
				   }
	          
		      });
			   // delete if already choos customer exist in array showing on customers on Revert detalis
                  let design_obj = this.user_inactive.filter( s=> s.id_design ==  design_detalis.id_design);
                  if(design_obj.length > 0){
                    let index: number = this.user_inactive.indexOf(design_obj[0]);
                    if (index !== -1) {
                        this.user_inactive.splice(index, 1);

                    }
                  } 
				  
				  // ends
				
		  }	
		if(this.user_inactive.length <=0 || this.user_active.length <=0)
		{
			 if(this.user_inactive.length==0)
			 {
			 this.revertsubmit=true;
			 }
			 else if(this.user_active.length==0)
			 {
				  this.disablesubmit=true;
			 }
		}

  }
  
  multiadd_stockdetalis(checked,design_detalis)
  {	  
     console.log(checked);
	  if(checked)
	  {
		  if(design_detalis.available_branch && design_detalis.add_stock)
		  {
			  this.stock_add.push(design_detalis);
		  }
		  else
		  {
			  design_detalis.isChecked =false;
			
			  this.commonservice.showAlertMSG( 2, "Please Select Any Branch and Stock Values");
			  
			   return checked =false;
		  }
	  }
	  else
	  {
		  console.log('palanivel');
		  console.log(design_detalis);
		  this.stock_add.forEach(( design_record ) => {
			         
			      if(design_record.id_design == design_detalis.id_design)
				   {
					   let obj = [design_record];
						  if(obj.length > 0){
							let index: number = this.stock_add.indexOf(obj[0]);
							if (index !== -1) {
								this.stock_add.splice(index, 1);
						    }
						} 
				   }
		      });
	  }
	  
	  console.log(this.stock_add);
	  
  }
  
  
  kycdetails()
  {
	 
	   if(this.user_active.length>0)
		  {
			 
		  this.service.getmultidesignById(JSON.stringify({design_detalis:this.user_active})).then(( res ) => {
				  if ( res ){
							  this.getDesignData();
							  this.commonservice.showAlertMSG( 1, res.message );
							  this.disablesubmit = true;
							  this.alluser =false;
							  this.overalluser =false;
							  this.user_active =[];    
						   } 
						   else  
						   {
							this.commonservice.showAlertMSG( 2, res.message );
						   }
				 }, error => {
					this.commonservice.showAlertMSG( 2, "Design Detalis status Couldn't Update Properly" );
				} );  
		 }
         else
         {
			 this.commonservice.showAlertMSG( 2, "Please Select Any One Design Properly");
		 }			 
  }
  
  rervert_details()
  {
	  if(this.user_inactive.length>0)
		  { 
			  this.service.getmultidesignById(JSON.stringify({design_detalis:this.user_inactive})).then(( res ) => {
				  if ( res ){
							  this.getDesignData();
							  this.commonservice.showAlertMSG( 1, res.message );
							  this.revertsubmit = true;
							  this.alluser       = false;
							  this.overalluser   = false;
							  this.user_inactive =[];    
						   } 
						   else 
						   {
							this.commonservice.showAlertMSG( 2, res.message );
						   }
				 }, error => {
					this.commonservice.showAlertMSG( 2, "Design Detalis status Couldn't Update Properly" );
				} ); 
		 }
         else
         {
			 this.commonservice.showAlertMSG( 2, "Please Select Any One Design Properly");
		 }
  }

  filter_user(event)
  {
    if(this.designaction == 0)
    {   
        if(event.target.value=="")
        {
            this.data = this.designall;
        }
        else{
            let filteruser = this.designall.filter(o => o.createdby == event.target.value);
            this.data=filteruser;
        }
    }
    else if(this.designaction==1)
    {
        if(event.target.value=="")
        {
            this.data = this.designall;
        }
        else{
            let filteruser = this.designall.filter(o => o.updatedby == event.target.value);
            this.data=filteruser;
        }
    }
}

filter_action(event)
{
    if(event.target.value == 0)
    {
        if(this.adminusers!="")
        {
            let filteruser = this.designall.filter(o => o.createdby == this.adminusers);
            this.data=filteruser;
        }
    }
    else if(event.target.value ==1)
    {
        if(this.adminusers!="")
        {
            let filteruser = this.designall.filter(o => o.updatedby == this.adminusers);
            this.data=filteruser;
        }
    }
}
	
	
}
