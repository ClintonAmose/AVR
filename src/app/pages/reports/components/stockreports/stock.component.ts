import { Component, OnInit,ViewChild } from '@angular/core';
import { StockService} from './stock.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ExcelService } from '../../excel.service';
import { CommonService,BaseAPIURL } from '../../../common/common.service';
import { Location } from '@angular/common';
import { CompleterCmp, CompleterData, CompleterService, CompleterItem, RemoteData } from 'ng2-completer';
import { Http, Headers, RequestOptions } from '@angular/http';
@Component({
  selector: 'app-stockreports',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css', '../../../tables/components/dataTables/dataTables.scss']
})
export class StockComponent implements OnInit {

    data;
	stockweight =0;
    filterQuery = '';
    rowsOnPage  = 50;
    rowsOnPageSet = [50,100,150];
    sortBy       = 'id_orderdetails';
    sortOrder    = 'desc';
	branches     = [];
    assignbranch = "";
    name = "";
    select_designid = "";
	smallweight ="";
	accessData;
    disablesubmit = false;
	
	public itemsRemote: RemoteData;
	private _header: Headers;
	@ViewChild( "remoteDataExample" ) private remoteDataExample: CompleterCmp;
	
    constructor(private location: Location,completerService: CompleterService,http: Http,private route: ActivatedRoute, private router: Router, private service: StockService, private commonservice: CommonService,
	private excelService: ExcelService )
	{
		this.excelService = excelService;
		//Get User rights
		let currentURL  = this.location.path();
		let path        = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
		
		this._header = new Headers();
		this._header.append( 'Authorization', 'Basic ' + btoa( 'lmxretail' + ':' + 'lmx@2017' ) );
        this.itemsRemote = completerService.remote( BaseAPIURL + 'Master_api/autocompletedesigns?search=',"name","name" );
        this.itemsRemote.headers( this._header );
        this.itemsRemote.dataField( "responseData" );
		
		
    }

    ngOnInit() {
		this.getBranches();
		
    }
    /* getCustomerOrderlist() {
        this.service.getDeliveryReadyStatusData().then(( data ) => {
            this.data = data;
        } );
    } */
     
	
	// Get All Branches
    getBranches()
    {
       this.service.getBranchData().then(( data ) => {
              this.branches = data;
          } );
    }
	
	// Select Design wise 
	onRawdesignSelected( selected: CompleterItem ) {
	         if ( selected )
				  {
					  this.select_designid = selected.originalObject.id;
					  this.disablesubmit = false;
				  }
				  
	}
	
	// All Design Datas
	
	alldesigndata($event)
	{
		if( this.select_designid !='')
		{
			 this.disablesubmit   = true;
			 this.name            ='';
			 this.select_designid ='';
			 this.commonservice.showAlertMSG(2, "Indivusal Designs Removed");
		}
		else
		{
			 this.select_designid ='';
			 this.disablesubmit  = true;
		}
	}
	
    fetchdata()
	{  
	  let avalible_designid = this.select_designid; 
	  let avalible_branch   = this.assignbranch;
	  let all_designs       = this.disablesubmit;
		 if(avalible_branch !='' && (avalible_designid !='' || (all_designs == true || all_designs == false)))
		 {
			 this.service.getAvailableStock(JSON.stringify( { avalible_designid, avalible_branch,all_designs } )).then(( data ) => {
            if ( data.success ) {
              this.data = data.responseData;
			  this.getstockweight();
			   if(this.data.length < 0)
			   {
			    this.commonservice.showAlertMSG( 2, "Avaliable Brachwise Stock is Empty" );
			   }
            }
          }, error => {
            this.data =[];
            this.commonservice.showAlertMSG( 2, "Avaliable Stock is Empty" );
          } );
		  
		 }
 
	}		
	 
	 getstockweight()
	 {
		this.stockweight = 0;
		this.smallweight ="";
		this.data.forEach(( stock ) => { // foreach statement
                 this.stockweight += parseFloat(stock.weight);					 
             } ); 
			 var a = this.stockweight;
			 this.smallweight = a.toFixed(3);
		 
	 }
	 
   exportToExcel()
   {
	   this.excelService.exportAsExcelFile(this.data,'Avaliable Stock');
   }
}
