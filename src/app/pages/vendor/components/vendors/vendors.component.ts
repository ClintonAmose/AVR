import { Component, OnInit } from '@angular/core';
import { VendorsService } from './vendors.service';
import { ModalComponent } from '../../../common/modal/modal.component';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { Location } from '@angular/common';
import { CommonService } from '../../../common/common.service';

@Component( {
    selector: 'app-vendors',
    templateUrl: './vendors.component.html',
    styleUrls: ['../../../tables/components/dataTables/dataTables.scss','./vendors.component.css',]
} )

export class VendorsComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 50;
	rowsOnPageSet = [50,100,150];
    sortBy = 'id_karigar';
    sortOrder = 'asc';
    credmodal: ModalComponent;
    deletemodal: ModalComponent;

	title: string = '';
	isEditMode: boolean = false;
    isAddMode: boolean = false;
    vendors = this.getEmptyDetails();
	countries = [];
    states = [];
    cities = [];
    profiles = [];
    departments = [];
    designations = [];
	accessData;
    records =[];
	alluser;
    overalluser;
	user_active =[];
	user_inactive =[];
	disablesubmit = true;
	disablesubmit1 = false;
	revertsubmit = true;
	public loadingPicture = 'assets/img/theme/loading.gif';
	public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    };
	
    constructor(private location: Location, private router: Router, private service: VendorsService, private commonservice: CommonService ) {
        this.getVendorslist();
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[2])[0];
    }
    ngOnInit() {
		this.getAllCountry();
	}
	
	getEmptyDetails() {
        return {
            id_karigar: '',
            lastname: '',
			urname: '',
			psword:'',
            firstname: '',
            address1: '',
            address2: '',
            address3: '',
            email: '',
			id_state: '',
            id_city: '',
            contactno1: '',
            contactno2: '',
			code_karigar:'',
			id_country: '101',
            status_karigar: "1",
			company:''
        }
    }

	//Get Country
	getAllCountry() {
        this.commonservice.getCountryData().then( res => {
            if ( res ) {
                this.countries = res;
            }
        }, error => {

        } );
    }
	//get the State
	getStateforCountry( country_id ) {
        this.commonservice.getStatebyCountryData( country_id ).then( res => {
            if ( res ) {
                this.states = res;
            }
        }, error => {

        } );
    }
	
	//get the city
    getCityforState( state_id ) {
        this.commonservice.getCitybyStateData( state_id ).then( res => {
            if ( res ) {
                this.cities = res;
            }
        }, error => {

        } );
    }

	
	// Get The Datas
    getVendorslist() {
        this.service.getData().then(( data ) => {
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
	
	// Create the vendors List
    createnewvendors()
	{
		 this.title      = 'Create New Vendor';
         this.isAddMode  = true;
         this.isEditMode = false;
         this.vendors    = this.getEmptyDetails();
         this.credmodal.open();
	}
	
	// Update the Vendors List
    updatevendor( id_karigar ) {
        this.title = 'Update Vendor List';
        this.isAddMode = false;
        this.isEditMode = true;
        this.getvendorPersonaldetbyId( id_karigar );
        this.credmodal.open();
    }
	// bind the form model name
	bindcreateDetailModal(_model)
	{
		this.credmodal =_model;
	}
 
    // close the form fields
	closeall()
	{
		this.credmodal.close();
	}
	
	//Get vendor Detalis
    getvendorPersonaldetbyId( userid ) {
        this.service.getvendordetails( userid ).then( res => {
            if ( res ) {
                this.vendors.id_karigar     = res.id_karigar;
                this.vendors.code_karigar   = res.code_karigar;
                this.vendors.status_karigar = res.status_karigar;
                this.vendors.firstname      = res.firstname;
                this.vendors.lastname       = res.lastname;
                this.vendors.address1       = res.address1;
                this.vendors.address2       = res.address2;
                this.vendors.address3       = res.address3;
                this.vendors.email          = res.email;
                this.vendors.contactno1     = res.contactno1;
                this.vendors.contactno2     = res.contactno2;
                this.vendors.id_country     = res.id_country;
                this.vendors.id_state       = res.id_state;
                this.vendors.id_city        = res.id_city;
                this.vendors.urname         = res.urname;
                this.vendors.psword         = res.psword;
                this.vendors.company        = res.company;
              //  this.vendors.active         = res.active;
				this.getStateforCountry( res.id_country );
                this.getCityforState( res.id_state );
            }
        }, error => {
            console.log( error );
        } );
    }
	
	//save vendor Detalis
	savevendordetails(isUpdate, canClose)
	{
		this.disablesubmit = true;
		
		this.vendors.urname =  this.vendors.contactno1;
		
		if ( this.vendors.id_karigar == '' ) {
		   this.service.savevendor( JSON.stringify( this.vendors ) ).then( res => {
                if ( res ) {
                    if ( res.success) 
					{
                        this.commonservice.showAlertMSG( 1, res.message );
                    } 
					else 
					{
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getVendorslist();
                    if ( canClose ) {
                        this.credmodal.close();
                    }
                    this.vendors = this.getEmptyDetails();
                    this.disablesubmit = false;
                }
            }, error => {
				this.disablesubmit = false;

            } );
		 }
	   else
		{
			  this.service.updatevendor(JSON.stringify( this.vendors ) ).then( res => {
                    if ( res ) {
                        this.getVendorslist();
                        this.credmodal.close();
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
	}
	// clear After Submiting the datas
	clearData() {
        this.vendors = this.getEmptyDetails();
    } 	
    updateAddress( userid ) {
    } 
	closedelete() {
        this.deletemodal.close();
    }
	binddeleteModal( _modal ) {
        this.deletemodal = _modal;
    }
	deleteKarigar( karigarid ) {
        this.data.id_karigar = karigarid;
        this.title = 'Delete Karigar';
        this.deletemodal.open();
    }
	removeKarigar( id ) {
        this.service.deletekarigar( JSON.stringify( { 'id': id } ) ).then( res => {
            if ( res ) {
                if ( res.success ) {
					this.commonservice.showAlertMSG( 1, res.message );
				} else {
					this.commonservice.showAlertMSG( 2, res.message );
				}
                this.deletemodal.close();
				this.getVendorslist();
            }
        }, error => {

        } );
    }
	
    
   		overall_kycdetalis(checked)
  {
	  if(checked == true)
	  {
		  this.alluser = checked;
		  this.overalluser = checked;
		  this.data.forEach(user_detalis =>
		  {
			   if(user_detalis.status=='1')
			  {
				 let revert_user = {'id_karigar':user_detalis.id_karigar,'firstname':user_detalis.firstname,'status_karigar':'0'}; 
			     this.user_inactive.push(revert_user);
				 this.revertsubmit=false;
			  }
			  else
			  {
				  let user        = {'id_customer':user_detalis.id_customer,'firstname':user_detalis.firstname,'status_karigar':'1'}; 
				  this.user_active.push(user);
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
  
  
  multiapprove_kycdetalis(checked,user_detalis)
  {
	  
	  if(checked == true)
		  {
			  if(user_detalis.status=='1')
			  {
				 let revert_user = {'id_karigar':user_detalis.id_karigar,'firstname':user_detalis.firstname,'status_karigar':'0'};;  
			     this.user_inactive.push(revert_user);
				 this.revertsubmit=false;
			  }
			  else
			  {
				  let user        = {'id_karigar':user_detalis.id_karigar,'firstname':user_detalis.firstname,'status_karigar':'1'}; 
				  this.user_active.push(user);
				  this.disablesubmit=false;
			  }
		  }
	   else 
		  {
			  
			  // delete if already choos customer exist in array showing on customers on Approve detalis
			  
			   this.user_active.forEach(( user_record ) => {
				   if(user_record.id_customer == user_detalis.id_customer)
				   {
					   let obj = [user_record];
						  if(obj.length > 0){
							let index: number = this.user_active.indexOf(obj[0]);
							if (index !== -1) {
								this.user_active.splice(index, 1);
						    }
						} 
				   }
	          
		      });
			   // delete if already choos customer exist in array showing on customers on Revert detalis
                  let customer_obj = this.user_inactive.filter( s=> s.id_customer ==  user_detalis.id_customer);
                  if(customer_obj.length > 0){
                    let index: number = this.user_inactive.indexOf(customer_obj[0]);
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
  
  kycdetails()
  {
	   if(this.user_active.length>0)
		  {
			 
			  this.service.getmultiuserById(JSON.stringify({user_detalis:this.user_active})).then(( res ) => {
				  if ( res ){
							  this.getVendorslist();
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
					this.commonservice.showAlertMSG( 2, "Dealer Detalis Couldn't Update Properly" );
				} ); 
		 }
         else
         {
			 this.commonservice.showAlertMSG( 2, "Please Select Any One Dealer Properly");
		 }			 
  }
  
  rervert_details()
  {
	  if(this.user_inactive.length>0)
		  {
			  let id_prof = this.commonservice.getUserDetails().user_id;
			  
			  this.service.getmultiuserById(JSON.stringify({user_detalis:this.user_inactive})).then(( res ) => {
				  if ( res ){
							  this.getVendorslist();
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
					this.commonservice.showAlertMSG( 2, "Dealer Detalis Couldn't Update Properly" );
				} ); 
		 }
         else
         {
			 this.commonservice.showAlertMSG( 2, "Please Select Any One Dealer Properly");
		 }
  }	
	
	
}
