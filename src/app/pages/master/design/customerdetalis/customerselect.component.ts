import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignService } from '../design.service';
import { PurityService } from '../../purity/purity.service';
import { CustomerService } from '../../customer/customer.service';
import { DealerService } from '../../dealer/dealer.service';
import { CommonService, BaseAPIURL } from '../../../common/common.service';
import { CompleterCmp, CompleterData, CompleterService, CompleterItem, RemoteData } from 'ng2-completer';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ModalComponent } from '../../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { Location } from '@angular/common';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
@Component( {
    selector: 'app-customerdetalis',
    templateUrl: './customerselect.component.html',
    styleUrls: ['./customerselect.component.css', '../../../tables/components/dataTables/dataTables.scss']
} )
export class CustomerselectComponent implements OnInit {
    data;
    customerdetalis = [];
	rowsOnPage = 50;
	rowsOnPageSet = [50,100,150];
    sortBy = 'design_name';
    sortOrder = 'desc';
    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    customerdatadetails = this.getCustomerEmptyData();
	accessData;
    filterQuery = '';
    designid = "";
    current_customer_id = "";
  
	
	expire_date: Date = new Date();
     settings = {
        bigBanner: true,
        timePicker: true,
        format: 'dd-MM-yyyy hh:mm:ss a',
        defaultOpen: false,
		closeOnSelect:true
    }
	
	
	public itemsRemote: RemoteData;
	private _header: Headers;
	@ViewChild( "remoteDataExample" ) private remoteDataExample: CompleterCmp;

    constructor( private location: Location,completerService: CompleterService, http: Http, private service: DesignService, private commonservice: CommonService,private customerservice: CustomerService, private route: ActivatedRoute, private router: Router) {
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
		
		this._header = new Headers();
		this._header.append( 'Authorization', 'Basic ' + btoa( 'lmxretail' + ':' + 'lmx@2017' ) );
        this.itemsRemote = completerService.remote( BaseAPIURL + 'Master_api/autocompletedesigns_customer?search=',"name","name" );
        this.itemsRemote.headers( this._header );
        this.itemsRemote.dataField( "responseData" );

    }
    getCustomerEmptyData() {
        return { 
		id_selectedcustomer: "", 
		designid:"",
		design_name:"",
		customer_id: "",
		status:"1",
		expire_period:''
		}
    }

    // Form Open And Close 
    open() {
        this.modal.open();
    }
    close() {
        this.modal.close();
    }
    bindModal( _modal ) {
        this.modal = _modal;
    }
  
    closedeletepopup() {
        this.deletemodal.close();
    }
    binddeleteModal( _modal ) {
        this.deletemodal = _modal;
    }
  
    ngOnInit() {
            this.getDesignCustomerData();
            this.getAllCustomers();
     
    }
 
 
    onDateSelect($event)
	{
		let choosedate = $event;
	    this.customerdatadetails.expire_period = choosedate.getDate() +"-"+(choosedate.getMonth()+1) +"-"+choosedate.getFullYear() +" "+choosedate.getHours()+":"+choosedate.getMinutes()+":"+choosedate.getSeconds();
	}
 
 
    // Get All Customers 
	
     getAllCustomers() {
        this.customerservice.getData().then(( data ) => {
            this.customerdetalis = data;
        } );
    }
	
	
	getDesignCustomerData()
	{
		this.service.getselectcustomer().then(( data ) => {
            this.data = data;
        } );
	}
	
	


    // cretae the select Detalis
    createnewbomdetails( design_id ) {
        this.title = 'Create Select Customer Detalis';
		this.customerdatadetails= this.getCustomerEmptyData();
		this.expire_date =new Date();
        this.isEditMode = false;
        this.isAddMode = true;
        this.open();
    }
    
	// Select Designs 
	onRawdesignSelected( selected: CompleterItem ) {
        if ( selected ) {
			 this.designid = selected.originalObject.id;
		}
	}

	// Edit Select Cusotmers
	editcustomer( customer ) {
        this.customerdatadetails = customer;
		this.expire_date         = new Date(this.customerdatadetails.expire_period);
		this.designid = this.customerdatadetails.designid;	
        this.title  = 'Update Select Customer Detalis';
        this.isEditMode = true;
        this.isAddMode = false;
        this.open();
    }
	
	
    saveCustomerselt( isUpdate, canClose, id_design ) {
        if ( isUpdate ) {
            if ( id_design != '' ) {
                this.service.editCustomer( JSON.stringify( { 'design_id': this.designid, 'selectcustomerdetails': this.customerdatadetails } ) ).then( res => {
                    if ( res ) {
						this.getDesignCustomerData();
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

        }
        else {
			this.customerdatadetails.designid=this.designid;	
            this.service.saveCustomer( JSON.stringify( { 'design_id': this.designid, 'selectcustomerdetails': this.customerdatadetails } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    }
                    else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    if ( canClose ) {
						this.getDesignCustomerData();
                        this.modal.close();
                    }
                    this.customerdatadetails = this.getCustomerEmptyData();
                }
            } );
        }

    }

	 // Delete Customer Select Records
    deletecustomer( id_selectcustomer ) {
        this.current_customer_id = id_selectcustomer;
        this.title = 'Delete Select Customer Detalis';
        this.deletemodal.open();
    }
		
	// Delete Customer Select Records

    removecustomer( id_selectcustomer ) {
        this.service.deleteCustomer( JSON.stringify( { 'id_selectcustomer': id_selectcustomer } ) ).then( res => {
            if ( res ) {
                if ( res.success ) {
                    this.commonservice.showAlertMSG( 1, res.message );
                } else {
                    this.commonservice.showAlertMSG( 2, res.message );
                }
				this.getDesignCustomerData();
                this.deletemodal.close();
                this.customerdatadetails = this.getCustomerEmptyData();
            }
        }, error => {

        } );
    }
	
	
    getBOMByDesignId( designid ) {
        this.service.getCustomerselectById( designid ).then(( data ) => {
            if ( data.success ) {
				this.data = data.responseData;
            }
        } );
    }
}
