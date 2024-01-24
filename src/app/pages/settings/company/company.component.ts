import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company.service';
import { CommonService } from '../../common/common.service';

@Component( {
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './company.component.css']
} )

export class CompanyComponent implements OnInit {


    company = this.getEmptysettingsDetail();
    countries = [];
    states = [];
    cities = [];

    constructor( private service: CompanyService, private commonservice: CommonService ) { }

    ngOnInit() {
        this.service.getCompanyDetails().then(( data ) => {
            this.company = data;
            this.getAllCountry();
            this.getStateforCountry( this.company.comp_con_code );
            this.getCityforState( this.company.comp_state_code );
        } );

    }

    getEmptysettingsDetail() {
        return {
            comp_code: '',
            comp_name: '',
            comp_lookup: '',
            comp_address: '',
            currency: '',
            comp_city_code: '',
            comp_state_code: '',
            comp_pincode: '',
            comp_cstno: '',
            comp_ledgername: '',
            comp_regno: '',
            comp_tinno: '',
            comp_servicetaxno: '',
            comp_contactno: '',
            comp_faxno: '',
            comp_emailid: '',
            comp_url: '',
            comp_description: '',
            comp_photoname: '',
            comp_con_code: '101',
            comp_status: 1
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
    saveSettings() {
	
    }
	
	updateSettings() {
		this.service.updCompanyDetails( JSON.stringify(this.company ) ).then(( res ) => {
			if ( res.success ) {
				this.commonservice.showAlertMSG( 1, res.message );
				
			} else {
				this.commonservice.showAlertMSG( 2, res.message );
			}
		}, error => {

        } );
	
    }
    closesettings() {

    }
}
