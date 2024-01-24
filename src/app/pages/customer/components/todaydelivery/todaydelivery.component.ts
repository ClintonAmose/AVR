import { Component, OnInit } from '@angular/core';
import { TodaydeliveryService } from './todaydelivery.service';
import { Router } from '@angular/router';
import { CommonService } from '../../../common/common.service';
import { ModalComponent } from '../../../common/modal/modal.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-todaydelivery',
  templateUrl: './todaydelivery.component.html',
  styleUrls: ['./todaydelivery.component.css','../../../tables/components/dataTables/dataTables.scss']
})
export class TodaydeliveryComponent implements OnInit {

  modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 100;
    rowsOnPageSet = [100,200,300];
    sortBy = 'id_orderdetails';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
	accessData;
    records =[];
	public loadingPicture = 'assets/img/theme/loading.gif';
    constructor(private location: Location, private service: TodaydeliveryService, private commonservice: CommonService ) { 
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
}
