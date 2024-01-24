import { Component, OnInit } from '@angular/core';
import { RateService } from './rate.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { IMyDpOptions } from 'mydatepicker';
import { PurityService } from '../purity/purity.service';
import { BranchService } from '../branch/branch.service';
import { ItemtypeService } from '../itemtype/itemtype.service';
import { CommonService } from '../../common/common.service';
@Component( {
    selector: 'app-rate',
    templateUrl: './rate.component.html',
    styleUrls: ['../../tables/components/dataTables/dataTables.scss', './rate.component.css']
} )
export class RateComponent implements OnInit {
   
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    };
    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 100;
    sortBy = 'ratedate';
    sortOrder = 'desc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    purities = [];
    branchies = [];
	items=[];
	ratemaster = this.getEmptyRateDetail();
    constructor( private service: RateService, private commonservice: CommonService, private purityservice: PurityService, private branchservice: BranchService, private itemtypeService: ItemtypeService ) 
	{
		  this.getAllPurity();
		  this.getAllBranch();
		  this.getAllItem();
	}

    ngOnInit() {
        this.getRateData();
    }
   	
	// Get All Purity
	getAllPurity() {
        this.purityservice.getPurityData().then( res => {
            if ( res ) {
                this.purities = res;
            }
        }, error => {

        } );
    }
	
	// Get All Branch
	getAllBranch()
	{
		 this.branchservice.getData().then( res => {
            if ( res ) {
                this.branchies = res;
            }
        }, error => {

        } );
	}
	
	// Get All Item
	getAllItem()
	{
		 this.itemtypeService.getitemtypeData().then( res => {
            if ( res ) {
                this.items = res;
            }
        }, 
		error => {

        } );
	}

	// Get Rate Empty Detalis
	 getEmptyRateDetail() {
		let date = new Date();
		return {
            id_rate: '',
			ratedate: {
                date: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                }
            },
			baserate: '',
			purity: '',
			branch:'',
			item:'',
			rate:'',
			ratetype:'',
            status: 1
        }
    }
	

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
	
	//Get all the size values
	getRateData() {
        this.service.getRateData().then(( data ) => {
            this.data = data;
        } );
    }
   
   // create Rate Detalis
  createnewratedetails()
  {
	    this.title       = 'New Rate Detalis';
        this.isEditMode  = false;
        this.isAddMode   = true;
        this.open();
  }
  
  // Update Rate Detalis
  updaterate(id)
  {
	  this.getRateById(id);
	  this.title = 'Update Rate Details';
      this.isEditMode = true;
      this.isAddMode = false;
      this.open();
  }
  
  //Save Rate Details
  saveRate(isUpdate,canClose)
  {
	  if(isUpdate)
	  {
		     if ( this.ratemaster.id_rate != '' ) {
                this.service.updateRate( JSON.stringify( this.ratemaster ) ).then( res => {
                    if ( res ) {
                     this.ratemaster = this.getEmptyRateDetail();
                        this.getRateData();
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
	   this.service.saveRate(JSON.stringify( this.ratemaster)).then( res => {
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
                    
					 this.getRateData();
				
					if(canClose)
					{
					  this.modal.close();
					}
                  this.ratemaster = this.getEmptyRateDetail();
				}
		});
	  }
  }
 
  getRateById(rateid) {
	  this.service.getRateById( rateid ).then(( data ) => {
            if ( data.success ) {
			    this.ratemaster.id_rate    = data.responseData.id_rate;
			    this.ratemaster.ratedate   = data.responseData.ratedate;
			    this.ratemaster.baserate   = data.responseData.baserate;
			    this.ratemaster.branch     = data.responseData.branchid;
			    this.ratemaster.item       = data.responseData.itemtype;
			    this.ratemaster.purity     = data.responseData.purity;
			    this.ratemaster.rate       = data.responseData.rate;
			    this.ratemaster.ratetype   = data.responseData.ratetype;
            }
        } ); 
    }
	
	 deleterate( rateid ) {
        this.ratemaster.id_rate = rateid;
        this.title = 'Delete Rate Details';
        this.deletemodal.open();
    }
   
   removerate( rateid ) {
	
        if ( rateid ) {
            this.service.deleterate( JSON.stringify( { 'id': rateid } ) ).then( res => {
                if ( res ) {
					 
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getRateData();
                    this.deletemodal.close();
                    this.ratemaster = this.getEmptyRateDetail();
                }
            }, error => {

            } );
        }
    }
}
