import { Component, OnInit } from '@angular/core';
import { StoneRateService } from './stonerate.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { IMyDpOptions } from 'mydatepicker';
import { ItemService } from '../item/item.service';
import { CommonService } from '../../common/common.service';
@Component( {
    selector: 'app-stonerate',
    templateUrl: './stonerate.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './stonerate.component.css']
} )

export class StoneRateComponent implements OnInit {
   
    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd-mm-yyyy',
    };
    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 100;
    sortBy = 'size';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
	items=[];
    stonerate = this.getEmptyStoneRateDetail();

    constructor( private service: StoneRateService, private commonservice: CommonService,
    private itemService: ItemService)
	{ 
	 this.getAllItem();
	}

    ngOnInit() {
        this.getStoneRateData();
    }
    getEmptyStoneRateDetail() {
		let date = new Date();
        return {
            id_stonerate: '',
            id_item: '',
            from_date:  {
                date: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                }
            },
            to_date:  {
                date: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                }
            },
            unitid: '',
            amount: '',
			status: 1
        }
    }
	
	// Get All Item
	getAllItem()
	{
		 this.itemService.getItemData().then( res => {
            if ( res ) {
                this.items = res;
            }
        }, 
		error => {

        } );
	}
	
	//Get all the size values
	getStoneRateData() {
        this.service.getStoneRateData().then(( data ) => {
            this.data = data;
        } );
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
    closedeletepopup(){
        this.deletemodal.close();
    }
	binddeleteModal( _modal ) {
        this.deletemodal = _modal;
    }
	// Create the Stone Record
	createnewstoneratedetails()
	{
	    this.title       = 'New StoneRate Detalis';
        this.isEditMode  = false;
        this.isAddMode   = true;
        this.open();
	}
	
	// Update the Stoen Record
	
	updatestonerate(id)
	{

	  this.getStoneRateById(id);
	  this.title = 'Update StoneRate Details';
      this.isEditMode = true;
      this.isAddMode = false;
      this.open(); 
	}
	
	 //Save Rate Details
  saveStoneRate(isUpdate,canClose)
  {
	  if(isUpdate)
	  {
		     if ( this.stonerate.id_stonerate != '' ) {
                this.service.updateStoneRate( JSON.stringify( this.stonerate ) ).then( res => {
                    if ( res ) {
                       this.stonerate = this.getEmptyStoneRateDetail();
                        this.getStoneRateData();
                        this.modal.close();
                        if ( res.success ) {
                            this.commonservice.showAlertMSG( 1, res.message );
                        } 
						else {
                            this.commonservice.showAlertMSG( 2, res.message );
                        } 
                    }
                }, error => {

                } );
            }
	  }
	  else
	  { 
	   this.service.saveStoneRate(JSON.stringify( this.stonerate)).then( res => {
                if ( res ) 
				{
				   if(res.success)
				    {
                       this.commonservice.showAlertMSG( 1, res.message );
                    } 
					else 
					{
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    
					 this.getStoneRateData();
				
					if(canClose)
					{
					  this.modal.close();
					}
                  this.stonerate = this.getEmptyStoneRateDetail();
				}
		});
	}
  }
  
  getStoneRateById(rateid) {
	  this.service.getStoneRateById( rateid ).then(( data ) => {
            if ( data.success ) {
			    this.stonerate.id_stonerate    = data.responseData.id_stonerate;
			    this.stonerate.id_item         = data.responseData.id_item;
			    this.stonerate.from_date       = data.responseData.from_date;
			    this.stonerate.to_date         = data.responseData.to_date;
			    this.stonerate.amount          = data.responseData.amount;
			    this.stonerate.unitid          = data.responseData.unitid;
            }
        } ); 
    }
	
	// Delete Stone Record
	deletestonerate ( rateid ) {
        this.stonerate.id_stonerate = rateid;
        this.title = 'Delete StoneRate Details';
        this.deletemodal.open();
    }
   
   removestonerate( rateid ) {
	
        if ( rateid ) {
            this.service.deletestonerate( JSON.stringify( { 'id': rateid } ) ).then( res => {
                if ( res ) {
					 
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getStoneRateData();
                    this.deletemodal.close();
                    this.stonerate = this.getEmptyStoneRateDetail();
                }
            }, error => {

            } );
        }
    }
	
}
