import { Component, OnInit } from '@angular/core';
//import { DataTablesService } from '../../tables/components/dataTables/dataTables.service';
import { AdminUsersService } from './admin-users.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { Router } from '@angular/router';
import { CommonService } from '../../common/common.service';
import { IMyDpOptions } from 'mydatepicker';
//import { DataFilterPipe } from '../../../data-filter.pipe';
import { Location } from '@angular/common';

@Component( {
    selector: 'app-admin-users',
    templateUrl: './admin-users.component.html',
    //styleUrls: ['./admin-users.component.css']
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './admin-users.component.scss'],

} )
export class AdminUsersComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 50;
    rowsOnPageSet = [50,100,150];
    sortBy = 'id_user';
    sortOrder = 'asc';

    credmodal: ModalComponent;
    imgmodal: ModalComponent;
    addrmodal: ModalComponent;
    deletemodal: ModalComponent;
    persmodal: ModalComponent;
    officmodal: ModalComponent;

    title: string = '';
    users = this.getEmptyUser();
    countries = [];
    states = [];
    cities = [];
    profiles = [];
    departments = [];
    designations = [];
    agree = false;
	accessData;
	records =[];
	public loadingPicture = 'assets/img/theme/loading.gif';
	currUserProfile;
	
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    };
	moblen = localStorage.getItem( 'mobileNoLen');

    constructor( private location: Location,private router: Router, private service: AdminUsersService, private commonservice: CommonService ) {
        this.getAdminuserlist();
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
		console.log(this.accessData);
		this.currUserProfile = this.commonservice.getUserDetails().id_profile;
    }
   
    ngOnInit() {
		this.getAllProfile();
        this.getAllDepartments();
        this.getAllDesignation();
        this.getAllCountry();
    }
    getEmptyUser() {
        let date = new Date();
        return {
            id_user: '',
            lastname: '',
            firstname: '',
            dob: {
                date: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                }
            },
            doj: {
                date: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                }
            },
            date_of_birth: '',
            emp_code: '',
            address1: '',
            address2: '',
            address3: '',
            id_country: '101',
            id_state: '',
            id_city: '',
            dept: '',
            designation: '',
            id_profile: '',
            date_of_join: '',
            email: '',
            mobile: '',
            phone: '',
            image: '',
            urname: '',
            psword: '',
            status_user: 1
        }
    }
    getAllCountry() {
        this.service.getCountryData().then( res => {
            if ( res ) {
                this.countries = res;
            }
        }, error => {

        } );
    }
    getStateforCountry( country_id ) {
        this.service.getStatebyCountryData( country_id ).then( res => {
            if ( res ) {
                this.states = res;
            }
        }, error => {

        } );
    }
    getCityforState( state_id ) {
        this.service.getCitybyStateData( state_id ).then( res => {
            if ( res ) {
                this.cities = res;
            }
        }, error => {

        } );
    }
    getAllProfile() {
        this.service.getProfileData().then( res => {
            if ( res ) {
               let currUserProfile = this.commonservice.getUserDetails().id_profile;
				if(currUserProfile == 1){
					this.profiles = res;
				}
                else{
					this.profiles = res.filter(o => o.id_profile >= currUserProfile);
				}
            }
        }, error => {

        } );
    }
    getAllDepartments() {
        this.service.getDepartmentData().then( res => {
            if ( res ) {
                // console.log( res );
                this.departments = res;
                /* for ( var prop in res ) {
                     this[prop] = res[prop];
                     // this.department[prop] = new Department( this[prop].id_dept, this[prop].name, this[prop].status );
                     //this.department[] = new Department( this[prop].id_dept, this[prop].name, this[prop].status );    
                 } console.log( this.department );*/
                //this.department = res;
            }
        }, error => {
            console.log( error );
        } );

    }
    getAllDesignation() {
        this.service.getDesignationData().then( res => {
            if ( res ) {
                this.designations = res;
            }
        }, error => {

        } );
    }
    getAdminuserlist() {
		let id_prof = this.commonservice.getUserDetails().id_profile;
        this.service.getData(id_prof).then(( data ) => {
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
    bindCredentialModal( _modal ) {
        this.credmodal = _modal;
    }
    bindPersonalDetailModal( _modal ) {
        this.persmodal = _modal;
    }
    bindOfficialModal( _modal ) {
        this.officmodal = _modal;
    }
    bindAddressModal( _modal ) {
        this.addrmodal = _modal;
    }
	binddeleteModal( _modal ) {
        this.deletemodal = _modal;
    }
    closecredential() {
        this.credmodal.close();
    }
    closepersonal() {
        this.persmodal.close();
    }
    closeofficial() {
        this.officmodal.close();
    }
    closeaddress() {
        this.addrmodal.close();
    }
	closedelete() {
        this.deletemodal.close();
    }
    updatelogincredential( userid ) {
        this.title = 'Update Credential';
        this.agree = false;
        this.getuserCredentialbyId( userid );
        this.credmodal.open();
    }
    updatepersonalinfo( userid ) {
        this.title = 'Update Personal Details';
        this.agree = false;
        this.getuserPersonaldetbyId( userid );
        this.persmodal.open();
    }
    updateofficalinfo( userid ) {
        this.title = 'Update Official Details';
        this.agree = false;
        this.getuserOfficialdetbyId( userid );
        this.officmodal.open();
    }
    updatecontactinfo( userid ) {
        this.title = 'Update Contact Details';
        this.agree = false;
        this.getuserAddressdetbyId( userid );
        this.addrmodal.open();
    }
    getuserCredentialbyId( userid ) {
        this.service.getusercredential( userid ).then( res => {
            if ( res ) {
                this.users.urname = res.urname;
                this.users.id_user = res.id_user;
            }
        }, error => {
            console.log( error );
        } );
    }
    getuserPersonaldetbyId( userid ) {
        this.service.getusercredential( userid ).then( res => {
            if ( res ) {
                this.users.id_user = res.id_user;
                this.users.firstname = res.firstname;
                this.users.lastname = res.lastname;				
                this.users.status_user = res.status_user;
                //this.users.dob = res.date_of_birth;
                if ( res.date_of_birth != null && res.date_of_birth != '' ) {
                    let date = new Date( res.date_of_birth );
                    this.users.dob = {
                        date: {
                            year: date.getFullYear(),
                            month: date.getMonth() + 1,
                            day: date.getDate()
                        }
                    }
                } else {
                    this.users.dob = res.date_of_birth;
                }

                this.users.id_profile = res.id_profile;
				
            }
        }, error => {
            console.log( error );
        } );
    }
    getuserOfficialdetbyId( userid ) {
        this.service.getusercredential( userid ).then( res => {
            if ( res ) {
                this.users.id_user = res.id_user;
                this.users.emp_code = res.emp_code;
                this.users.dept = res.dept;
                this.users.designation = res.designation;
                if ( res.date_of_join != null && res.date_of_join != '' ) {
                    let date = new Date( res.date_of_join );
                    this.users.doj = {
                        date: {
                            year: date.getFullYear(),
                            month: date.getMonth() + 1,
                            day: date.getDate()
                        }
                    }
                } else {
                    this.users.doj = res.date_of_join;
                }
            }
        }, error => {
            console.log( error );
        } );
    }
    getuserAddressdetbyId( userid ) {
        this.service.getusercredential( userid ).then( res => {
            if ( res ) {
                this.users.id_user = res.id_user;
                this.users.address1 = res.address1;
                this.users.address2 = res.address2;
                this.users.address3 = res.address3;
                this.users.id_country = res.id_country;
                this.getStateforCountry( res.id_country );
                this.users.id_state = res.id_state;
                this.getCityforState( res.id_state );
                this.users.id_city = res.id_city;
                this.users.phone = res.phone;
                this.users.mobile = res.mobile;
                this.users.email = res.email;
            }
        }, error => {
            console.log( error );
        } );
    }
    updatecredential( userid ) {
        if ( userid ) {
            this.service.updatedminusercredential( JSON.stringify( { id: userid, urname: this.users.urname, psword: this.users.psword } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.credmodal.close();
                    this.router.navigate( ['pages/master/adminuser'] );
                }
            }, error => {
                console.log( error );
            } );
        }
    }
    updatepersonaldetail( userid ) {
        if ( this.users.dob != null ) {
            this.users.date_of_birth = this.users.dob.date.day + "-" + this.users.dob.date.month + "-" + this.users.dob.date.year;
        }
        if ( userid ) {
            this.service.updatedminuserpersonaldetails( JSON.stringify( { id: userid, firstname: this.users.firstname, lastname: this.users.lastname, date_of_birth: this.users.date_of_birth, id_profile: this.users.id_profile, status_user: this.users.status_user } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
						this.getAllProfile();
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.persmodal.close();
					this.getAdminuserlist();
                    this.router.navigate( ['pages/master/adminuser'] );
                }
            }, error => {
                console.log( error );
            } );
        }
    }

    updateofficialdetail( userid ) {
        if ( this.users.doj != null ) {
            this.users.date_of_join = this.users.doj.date.day + "-" + this.users.doj.date.month + "-" + this.users.doj.date.year;
        }
        if ( userid ) {
            this.service.updatedminuserofficialdetails( JSON.stringify( { id: userid, emp_code: this.users.emp_code, dept: this.users.dept, date_of_join: this.users.date_of_join, designation: this.users.designation } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.officmodal.close();
                    this.router.navigate( ['pages/master/adminuser'] );
                }
            }, error => {
                console.log( error );
            } );
        }
    }
    updateAddress( userid ) {
        if ( userid ) {
            this.service.updatedminuseraddressdetails( JSON.stringify( { id: userid, address1: this.users.address1, address2: this.users.address2, address3: this.users.address3, id_country: this.users.id_country, id_state: this.users.id_state, id_city: this.users.id_city, email: this.users.email, mobile: this.users.mobile, phone: this.users.phone } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.addrmodal.close();
					this.getAdminuserlist();
                    this.router.navigate( ['pages/master/adminuser'] );
                }
            }, error => {
                console.log( error );
            } );
        }
    }
	deleteUser( userid ) {
        this.users.id_user = userid;
        this.title = 'Delete Admin user';
        this.deletemodal.open();
    }
	removeUser( id ) {
        this.service.deleteuser( JSON.stringify( { 'id': id } ) ).then( res => {
            if ( res ) {
                if ( res.success ) {
					this.commonservice.showAlertMSG( 1, res.message );
				} else {
					this.commonservice.showAlertMSG( 2, res.message );
				}
                this.deletemodal.close();
				this.getAdminuserlist();
                this.router.navigate( ['pages/master/adminuser'] );
            }
        }, error => {

        } );
    }
}

