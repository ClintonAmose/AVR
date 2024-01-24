import { Component, OnInit } from '@angular/core';
import { RejectedbyvendorService } from './rejectedbyvendor.service';
import { Router } from '@angular/router';
import { CommonService } from '../../../common/common.service';
import { ModalComponent } from '../../../common/modal/modal.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rejectedbyvendor',
  templateUrl: './rejectedbyvendor.component.html',
  styleUrls: ['./rejectedbyvendor.component.css','../../../tables/components/dataTables/dataTables.scss']
})
export class RejectedbyvendorComponent implements OnInit {

   priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'rejectedbyvendor';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
	accessData;

    constructor( private location: Location,private service: RejectedbyvendorService, private commonservice: CommonService ) { 
	//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[2])[0];
	}

    ngOnInit() {
        this.getData();
    }
 	
	//Get all the size values
	getData() {
        this.service.getData().then(( data ) => {
            this.data = data;
			console.log(this.data);
        } );
    }
}
