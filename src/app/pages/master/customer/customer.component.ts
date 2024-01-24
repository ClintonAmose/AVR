import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { Router } from '@angular/router';
import { CommonService } from '../../common/common.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { Location } from '@angular/common';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { StockManageService } from '../../master/stockmanage/stockmanage.service';
@Component( {
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss', '../../tables/components/dataTables/dataTables.scss'],
	 providers: [StockManageService]
} )
export class CustomerComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 50;
    rowsOnPageSet = [50,100,150];
    sortBy = 'id_customer';
    sortOrder = 'asc';
	alluser;
    overalluser;
    branmodal: ModalComponent;
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    customerdetail = this.getEmptyCustomer();
    countries = [];
    dealers = [];
    states = [];
    cities = [];
	kyc_viewdetalis =[];
	user_active =[];
	user_inactive =[];
	disablesubmit = true;
	disablesubmit1 = false;
	revertsubmit = true;
	deletemodal: ModalComponent;
	accessData;
	expire_customer="";
    records =[];
	branches;
  spe_cus:boolean;
	public loadingPicture = 'assets/img/theme/loading.gif';
	 validity_date: Date = new Date();
	 design_expiry : Date = new Date();
     settings = {
		monthName:false,
        bigBanner: true,
        timePicker: true,
        format: 'dd-MM-yyyy hh:mm:ss a',
        defaultOpen: false,
		closeOnSelect:true
    }

	stock_manages : any;


    constructor(private location: Location, private router: Router, private service: CustomerService, private commonservice: CommonService,private stockmanage : StockManageService, ) {
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];

    }

    ngOnInit() {
        this.getCustomerlist();
        this.getAllCountry();
        this.getActiveDealers();
		this.customerexpire();
		this.getStockManageData();
		this.getBranches();
    }
    getEmptyCustomer() {
		let date = new Date();
         return {
			id_customer:'',
			name:'',
			lastname:'',
			firstname:'',
			username:'',
			password:'',
			company:'',
			address1:'',
			address2:'',
			address3:'',
			id_state:'',
			id_country:'',
      id_branch:'',
			id_city:'',
			email:'',
			mobile:'',
			phone:'',
			prefix:'',
			pre_prefix:'',
//			image,
      spe_cus:false,
			status:"0",
      login_status:"0",
			validity:"1",
			design_show_type:"1",
			dealer:'',
			pincode:'',
            period_time: '',
			designshow_expiry:'',
			default_show_type:"1",
			default_show_options:'0'
        };
    }
    getDealers() {
		this.service.getDealerData().then( res => {
            if ( res ) {
                this.dealers = res.responseData;
            }
        }, error => {
        } );
    }
	getActiveDealers() {
		this.service.getActiveDealerData().then( res => {
            if ( res ) {
                this.dealers = res.responseData;
            }
        }, error => {
        } );
    }
	getAllCountry() {
        this.commonservice.getCountryData().then( res => {
            if ( res ) {
                this.countries = res;
            }
        }, error => {

        } );
    }
    getStateforCountry( country_id ) {
        this.commonservice.getStatebyCountryData( country_id ).then( res => {
            if ( res ) {
                this.states = res;
            }
        }, error => {

        } );
    }
    getCityforState( state_id ) {
        this.commonservice.getCitybyStateData( state_id ).then( res => {
            if ( res ) {
                this.cities = res;
            }
        }, error => {

        } );
    }

    getCustomerlist() {

        this.service.getData().then(( data ) => {
            this.data = data;
	        this.customerexpire();
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
	customerexpire()
	{
		 /*  this.service.getExpirecustomer().then(( data ) => {
            this.expire_customer = data;
        } );  */
	}

	prefix(event)
	{
		return event.toUpperCase();
	}

    getCustomerdetailById( cusid ) {

        this.service.getcustomerdetailById( cusid ).then( res => {
            if ( res ) {
              //console.log(res);
                this.customerdetail.id_customer = res.id_customer;
                this.customerdetail.name = res.firstname+' '+res.lastname;
                this.customerdetail.firstname = res.firstname;
                this.customerdetail.lastname = res.lastname;
                this.customerdetail.status = res.status;
                this.customerdetail.spe_cus = res.spe_cus==0?false:true;
                this.customerdetail.login_status = res.login_status;
                this.customerdetail.username = res.username;
             //   this.customerdetail.password = res.password;
                this.customerdetail.company = res.company;
                this.customerdetail.id_branch = res.id_branch;
                this.customerdetail.prefix = res.prefix;
                this.customerdetail.pre_prefix = res.prefix;
                this.customerdetail.dealer = res.dealer;
                this.customerdetail.id_state = res.id_state;
                this.customerdetail.id_city = res.id_city;
                this.customerdetail.address1 = res.address1;
                this.customerdetail.address2 = res.address2;
                this.customerdetail.address3 = res.address3;
                this.customerdetail.pincode = res.pincode;
                this.customerdetail.mobile = res.mobile;
                this.customerdetail.phone = res.phone;
                this.customerdetail.email = res.email;
                this.customerdetail.id_country = res.id_country;
                this.customerdetail.validity = res.validity;
                this.customerdetail.design_show_type = res.design_show_type;
			   if ( res.validity_period != null && res.validity_period != '' && res.validity !=1) {
					this.validity_date= new Date(res.validity_period);
					this.customerdetail.period_time = res.validity_period;
                }
				else {
                    this.validity_date = new Date();
                }
				if( res.designshow_expiry != null && res.designshow_expiry != '' && res.designshow_expiry !=1) {
					this.customerdetail.designshow_expiry = res.designshow_expiry;
	                this.design_expiry     = new Date(res.designshow_expiry);
				}
				this.customerdetail.default_show_type    = res.default_show_type;
				this.customerdetail.default_show_options = res.default_show_options;
                this.getStateforCountry( res.id_country );
                this.getCityforState( res.id_state );
                this.getDealers();
				this.customerexpire();

            }
        }, error => {
            console.log( error );
        } );
    }

	getBranches()
    {
       this.service.getBranchData().then(( data ) => {
              this.branches = data;
              console.log(this.branches);

          } );
    }


	company(values)
	{
		this.customerdetail.company = values.toUpperCase();
	}

	// Get Stock Manage Datas

	 getStockManageData() {
        this.stockmanage.getStockManageData().then(( data ) => {
			this.stock_manages =data[0].status;

		});
    }

    createnewcustomer() {
        this.title = 'Create New Customer';
        this.isAddMode = true;
        this.isEditMode = false;
        this.customerdetail = this.getEmptyCustomer();
        this.getStateforCountry( this.customerdetail.id_country );
        this.branmodal.open();
    }
    updatecustomer( id_customer ) {
		this.customerdetail = this.getEmptyCustomer();
        this.title = 'Update Customer';
        this.isAddMode = false;
        this.isEditMode = true;
        this.getCustomerdetailById( id_customer );
        this.branmodal.open();
    }
    bindModal( _modal ) {
        this.branmodal = _modal;
    }
    closemodal() {
        this.branmodal.close();
    }
	onDateSelect($event)
	{
		let choosedate = $event;
	    this.customerdetail.period_time = choosedate.getDate() +"-"+(choosedate.getMonth()+1) +"-"+choosedate.getFullYear() +" "+choosedate.getHours()+":"+choosedate.getMinutes()+":"+choosedate.getSeconds();
	}

	ondesignDateSelect($event)
	{
		let choosedate = $event;
	    this.customerdetail.designshow_expiry = choosedate.getDate() +"-"+(choosedate.getMonth()+1) +"-"+choosedate.getFullYear() +" "+choosedate.getHours()+":"+choosedate.getMinutes()+":"+choosedate.getSeconds();
	}

    savecustomerdetails( isUpdate, canClose ) {
		this.disablesubmit1 = true;
		this.customerdetail.username = this.customerdetail.mobile;
    //console.log(this.branches);
    // let bigCities = this.branches.filter(id_branch => this.customerdetail.id_branch);
    // console.log(bigCities);

        if ( isUpdate ) {
            if ( this.customerdetail.id_customer != '' ) {


                this.service.updatebranch( JSON.stringify( this.customerdetail ) ).then( res => {
                    if ( res ) {
						this.customerexpire();
                        this.getCustomerlist();
                        this.branmodal.close();
                        if ( res.success ) {

                            this.commonservice.showAlertMSG( 1, res.message );
                        } else {
                            this.commonservice.showAlertMSG( 2, res.message );
                        }
						this.disablesubmit1 = false;
                    }
                }, error => {
					this.disablesubmit1 = false;

                } );
            }
        } else {
          console.log(this.customerdetail);

            this.service.savebranch( JSON.stringify( this.customerdetail ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }

					this.customerexpire();
					this.getCustomerlist();
                    if ( canClose ) {
                        this.branmodal.close();
                    }
                    this.clearData();
					this.disablesubmit1 = false;
                }
            }, error => {
				this.disablesubmit1 = false;

            } );
        }
    }
    clearData() {
        this.customerdetail = this.getEmptyCustomer();
    }
	closedelete() {
        this.deletemodal.close();
    }
	binddeleteModal( _modal ) {
        this.deletemodal = _modal;
    }
	deleteCustomer( cusid ) {
        this.data.id_customer = cusid;
        this.title = 'Delete Customer';
        this.deletemodal.open();
    }
	removeCus( id ) {
        this.service.deletecus( JSON.stringify( { 'id': id } ) ).then( res => {
            if ( res ) {
                if ( res.success ) {
					this.commonservice.showAlertMSG( 1, res.message );
				} else {
					this.commonservice.showAlertMSG( 2, res.message );
				}
                this.deletemodal.close();
				this.getCustomerlist();
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
				 let revert_user = {'id_customer':user_detalis.id_customer,'mobile':user_detalis.mobile,'firstname':user_detalis.firstname,'status':'0'};
			     this.user_inactive.push(revert_user);
				 this.revertsubmit=false;
			  }
			  else
			  {
				  let user        = {'id_customer':user_detalis.id_customer,'mobile':user_detalis.mobile,'firstname':user_detalis.firstname,'status':'1'};
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
				 let revert_user = {'id_customer':user_detalis.id_customer,'mobile':user_detalis.mobile,'firstname':user_detalis.firstname,'status':'0'};
			     this.user_inactive.push(revert_user);
				 this.revertsubmit=false;
			  }
			  else
			  {
				  let user        = {'id_customer':user_detalis.id_customer,'mobile':user_detalis.mobile,'firstname':user_detalis.firstname,'status':'1'};
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
							  this.getCustomerlist();
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
					this.commonservice.showAlertMSG( 2, "Cusotmer Detalis Couldn't Update Properly" );
				} );
		 }
         else
         {
			 this.commonservice.showAlertMSG( 2, "Please Select Any One Cusotmer Properly");
		 }
  }

  rervert_details()
  {
	  if(this.user_inactive.length>0)
		  {
			  let id_prof = this.commonservice.getUserDetails().user_id;

			  this.service.getmultiuserById(JSON.stringify({user_detalis:this.user_inactive})).then(( res ) => {
				  if ( res ){
							  this.getCustomerlist();
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
					this.commonservice.showAlertMSG( 2, "Cusotmer Detalis Couldn't Update Properly" );
				} );
		 }
         else
         {
			 this.commonservice.showAlertMSG( 2, "Please Select Any One Cusotmer Properly");
		 }
  }



}
