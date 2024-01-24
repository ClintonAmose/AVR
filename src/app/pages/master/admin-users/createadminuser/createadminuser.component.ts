import { Component, OnInit,Input  } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AdminUsersService } from '../admin-users.service';
import { CountryService } from '../../country/country.service';
import { StateService } from '../../state/state.service';
import { CityService } from '../../city/city.service';
import { DepartmentService } from '../../department/department.service';
import { DesignationService } from '../../designation/designation.service';
import { ProfileService } from '../../profile/profile.service';
import { IMyDpOptions } from 'mydatepicker';
import { Country } from '../../country';
import { State } from '../../state';
import { Department } from '../../department';
import { Designation } from '../../designation';
import { CommonService } from '../../../common/common.service';
//import {LimitToDirective} from '../../../ui/limit-to';



@Component( {
    selector: 'app-createadminuser',
    templateUrl: './createadminuser.component.html',
    styleUrls: ['./createadminuser.component.css'],
	 /* host: {
    '(keypress)': '_onKeypress($event)',
  } */
} )
export class CreateadminuserComponent implements OnInit {

    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    };
    selectedCountry: Country = new Country( 101, 'India', 'IN' );
    /*countries: Country[];
    states: State[];
    department: Department[];
    designation: Designation[];*/
    countries = [];
    states = [];
    cities = [];
    designations = [];
    departments = [];
    profiles = [];
	disablesubmit = false;
	moblen = localStorage.getItem( 'mobileNoLen');
	
	/* @Input('limit-to') limitTo; 
	  _onKeypress(e) {
		 const limit = +this.limitTo;
		 if (e.target.value.length === limit) e.preventDefault();
	  } */
	
	

    private model: Object;
    users = this.getEmptyUser();
    constructor( private service: AdminUsersService, private router: Router, private dpservice: DepartmentService, private desservice: DesignationService, private proservice: ProfileService, private couservice: CountryService, private staservice: StateService, private citservice: CityService, private commonservice: CommonService ) {
        this.getAllDepartments();
        this.getAllDesignation();
        this.getAllProfile();
        this.getAllCountry();
        this.getStateforCountry( this.users.id_country );
    }

    ngOnInit() {

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
    getAllDepartments() {
        this.dpservice.getDepartmentData().then( res => {
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
        this.desservice.getDesignationData().then( res => {
            if ( res ) {
                this.designations = res;
            }
        }, error => {

        } );
    }
    getAllProfile() {
        this.proservice.getProfileData().then( res => {
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
    getAllCountry() {
        this.couservice.getCountryData().then( res => {
            if ( res ) {
                this.countries = res;
            }
        }, error => {

        } );
    }
    getStateforCountry( country_id ) {
        this.staservice.getStatebyCountryData( country_id ).then( res => {
            if ( res ) {
                this.states = res;
            }
        }, error => {

        } );
    }
    getCityforState( state_id ) {
        this.citservice.getCitybyStateData( state_id ).then( res => {
            if ( res ) {
                this.cities = res;
            }
        }, error => {

        } );
    }
    saveAdminuser() {
		this.disablesubmit = true;
        if ( this.users.dob != null ) {
            this.users.date_of_birth = this.users.dob.date.day + "-" + this.users.dob.date.month + "-" + this.users.dob.date.year;
        }
        if ( this.users.doj != null ) {
            this.users.date_of_join = this.users.doj.date.day + "-" + this.users.doj.date.month + "-" + this.users.doj.date.year;
        }
        this.service.saveadminuser( JSON.stringify( this.users ) ).then( res => {
            if ( res ) {
                if ( res.success ) {
                    this.commonservice.showAlertMSG( 1, res.message );
                } else {
                    this.commonservice.showAlertMSG( 2, res.message );
                }
				this.disablesubmit = false;
                this.router.navigate( ['pages/master/adminuser'] );
            }
        }, error => {
			this.disablesubmit = false;
        } );
    }
    btnCloseAdminuser() {
        this.router.navigate( ['pages/master/adminuser'] );
    }
}