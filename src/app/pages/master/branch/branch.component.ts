import { Component, OnInit } from '@angular/core';
import { BranchService } from './branch.service';
import { Router } from '@angular/router';
import { CommonService } from '../../common/common.service';
import { ModalComponent } from '../../common/modal/modal.component';
@Component( {
    selector: 'app-branch',
    templateUrl: './branch.component.html',
    styleUrls: ['./branch.component.css', '../../tables/components/dataTables/dataTables.scss']
} )
export class BranchComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 50;
    sortBy = 'name';
    sortOrder = 'asc';

    branmodal: ModalComponent;
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    branchdet = this.getEmptyBranch();
    countries = [];
    states = [];
    cities = [];
    records =[];
	public loadingPicture = 'assets/img/theme/loading.gif';
    constructor( private router: Router, private service: BranchService, private commonservice: CommonService ) {

    }

    ngOnInit() {
        this.getBranchlist();
        this.getAllCountry();
    }
    getEmptyBranch() {
        return {
            id_branch: '',
            name: '',
            active: 1,
            short_name: '',
            channel_type: 1,
            warehouse: '',
            taxgroup: '',
            id_state: '',
            id_city: '',
            address1: '',
            address2: '',
            address3: '',
            contactperson: '',
            contactno1: '',
            contactno2: '',
            emailid: '',
            id_country: '101',
            createdby: 1,
			prefix:'',
			colors:''
        };
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

    getBranchlist() {
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
    getBranchDetailById( branchid ) {
        this.service.getbranchdetailById( branchid ).then( res => {
            if ( res ) {
                this.branchdet.id_branch = res.id_branch;
                this.branchdet.name = res.name;
                this.branchdet.active = res.active;
                this.branchdet.short_name = res.short_name;
                this.branchdet.channel_type = res.channel_type;
                this.branchdet.warehouse = res.warehouse;
                this.branchdet.taxgroup = res.taxgroup;
                this.branchdet.id_state = res.id_state;
                this.branchdet.id_city = res.id_city;
                this.branchdet.address1 = res.address1;
                this.branchdet.address2 = res.address2;
                this.branchdet.address3 = res.address3;
                this.branchdet.contactperson = res.contactperson;
                this.branchdet.contactno1 = res.contactno1;
                this.branchdet.contactno2 = res.contactno2;
                this.branchdet.emailid = res.emailid;
                this.branchdet.id_country = res.id_country;
                this.branchdet.prefix     = res.prefix;
                this.branchdet.colors     = res.colors; 
                this.getStateforCountry( res.id_country );
                this.getCityforState( res.id_state );
 
            }
        }, error => {
            console.log( error );
        } );
    }
    createnewbranchdetails() {
        this.title = 'Create New Branch';
        this.isAddMode = true;
        this.isEditMode = false;
        this.branchdet = this.getEmptyBranch();
        this.getStateforCountry( this.branchdet.id_country );
        this.branmodal.open();
    }
    updatebranch( id_branch ) {
        this.title = 'Update Branch';
        this.isAddMode = false;
        this.isEditMode = true;
        this.getBranchDetailById( id_branch );
        this.branmodal.open();
    }
    bindBranchModal( _modal ) {
        this.branmodal = _modal;
    }
    closebranchmodal() {
        this.branmodal.close();
    }
    savebranchdetails( isUpdate, canClose ) {
        if ( isUpdate ) {
            if ( this.branchdet.id_branch != '' ) {
                this.service.updatebranch( JSON.stringify( this.branchdet ) ).then( res => {
                    if ( res ) {
                        this.getBranchlist();
                        this.branmodal.close();
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
            this.service.savebranch( JSON.stringify( this.branchdet ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getBranchlist();
                    if ( canClose ) {
                        this.branmodal.close();
                    }
                    this.clearData();
                }
            }, error => {

            } );
        }
    }
    clearData() {
        this.branchdet = this.getEmptyBranch();
    }
}
