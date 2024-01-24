import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from './permission.service';
import { ToastsManager } from 'ng2-toastr';
import { CommonService } from '../../../common/common.service';
import { Location } from '@angular/common';

@Component( {
    selector: 'app-permission',
    templateUrl: './permission.component.html',
    styleUrls: ['../../../tables/components/dataTables/dataTables.scss', './permission.component.css']
} )
export class PermissionComponent implements OnInit {

    priorityLDtitle = '';
    data;
	userid;
    filterQuery = '';
    rowsOnPage = 50;
	rowsOnPageSet = [50,100,150];
    sortBy = '';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
	accessData;
	disablesubmit = false;

    constructor( private location: Location,private service: PermissionService,private route: ActivatedRoute,private router: Router, private commonservice: CommonService ) { 		
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
	}

    ngOnInit() {
		this.route.params.subscribe( params => {
            this.userid = params['id'];
            this.readPermissionData(this.userid);
        } );
    }
   
    readPermissionData(user_id:number) {
        this.service.getAccessPermissionByID(user_id).then(( data ) => {
            this.data = data.responseData;
        } );
    }
	
	selectAll(field:string,value:boolean) {
		for (var i = 0; i < this.data.length; i++) {
			if(field == 'view'){
				this.data[i].view = value;
			}else if(field == 'edit'){
				this.data[i].edit = value;
			}else if(field == 'delete'){
				this.data[i].delete = value;
			}else if(field == 'add'){
				this.data[i].add = value;
			}else if(field == 'print'){
				this.data[i].print = value;
			}
		}
	}
	
    updatePermission() {
		//let updatedata = this.accessdata.filter(o => o.id_profile == profileid);		
        this.service.updateAccessPermission(JSON.stringify({'permissiondata':this.data,'id_user':this.userid})).then(( res ) => {
			if ( res.success ) {
				this.commonservice.showAlertMSG( 1, res.message );
			} else {
				this.commonservice.showAlertMSG( 2, res.message );
			}
            this.readPermissionData( this.userid );

        }, error => {
			this.commonservice.showAlertMSG( 2, JSON.parse( error._body ).message );
        } );
    }
    
    
}
