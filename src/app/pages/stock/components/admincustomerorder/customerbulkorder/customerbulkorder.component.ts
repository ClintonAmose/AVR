import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, BaseAPIURL } from '../../../../common/common.service';
import { AdminCustomerorderService } from '../admincustomerorder.service';
import { CompleterCmp, CompleterData, CompleterService, CompleterItem, RemoteData } from 'ng2-completer';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ModalComponent } from '../../../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { Location } from '@angular/common';
import { ExcelService } from '../../../../reports/excel.service';
import * as XLSX from 'xlsx';
@Component( {
    selector: 'app-customerbulkorder',
    templateUrl: './customerbulkorder.component.html',
    styleUrls: ['./customerbulkorder.component.css', '../../../../tables/components/dataTables/dataTables.scss']
} )
export class CustomersBulkorderComponent implements OnInit {
   
    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    data;
    filterQuery = '';
    rowsOnPage = 50;
	rowsOnPageSet = [50,100,150];
    sortBy = 'id_customerorder';
    sortOrder = 'asc';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
	disablesubmit = true;
    adminorderdetails = this.getAdminorderEmptyData();
    admindetails      = this.getAdminEmptyData();
	accessData;
    arrayBuffer:any;
    file:File;
	exceldata;

    @ViewChild('myInput')
      myInputVariable: any;
	
	
	 constructor( private location: Location,completerService: CompleterService,http: Http,private service: AdminCustomerorderService,private commonservice: CommonService,private excelService: ExcelService ) {
		//Get User rights
	    
	 }
   
	ngOnInit() {
	}
	
	
	
	getAdminEmptyData()
	{
		 return {
			order_for:2,
			order_to:'',
			order_taken_by:''
		 }

	}

	getAdminorderEmptyData()
	{
		 return {
    			isurgent:0,
    			is_customeitem:'0',
                id_product:'',
    			name:'',
    			customerid: '',
    			qty:'',
                id_purity: '',
                reqweight: '',
    			is_chain:0,
                hook_type:'',
    			id_karigar: '',
    			remarks: '',
    			sizeorlen:'',
				is_stock_avail:'0',
				itemname:'',
    			customimages:[],
    			prodefaultimg:'assets/img/theme/no-photo.png',
    			productimgdetails:'',
    			s_hook_type:0,
    			m_hook_type:0,
    			ortertype:'2'
				
      }
	}

	
	incomingfile(event) 
    {
		console.log(event);
      this.file= event.target.files[0]; 
	  if(this.file)
	  {
		  this.disablesubmit=false;
	  }
   }
	
	
	 Upload() {
      let fileReader = new FileReader();
	 
	  
        fileReader.onload = (e) => {
			
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
			this.exceldata =  XLSX.utils.sheet_to_json(worksheet,{raw:true});
		    this.getordersdata(this.exceldata);
        }
        fileReader.readAsArrayBuffer(this.file);
		
		
		
		
		
    }
	
	getordersdata(bulkdata)
	{ 
	    this.accessData = bulkdata;
 
		if(this.accessData.length>0)
		{
			this.service.saveadminbulkorder( JSON.stringify( { 'orders' : this.accessData } ) ).then( res => {
				if ( res ) {
				  if ( res.success ){
					this.commonservice.showAlertMSG( 1, res.message );
					  this.accessData="";
					  this.disablesubmit =true;
					  this.get_reset();
				  } else{
					this.commonservice.showAlertMSG( 2, res.message );
				  }
				  
				}
			  }, error => {
			   this.disablesubmit =false;

		   } );
		
		}
	 
	}
	
	
	
	 
	get_reset() {
    this.myInputVariable.nativeElement.value = "";
     }
	 
	 
}
