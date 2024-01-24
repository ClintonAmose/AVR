import { Component, OnInit } from '@angular/core';
import { CusorderstatusService } from './cusorderstatus.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../excel.service';
import { CommonService } from '../../../common/common.service';
import { ModalComponent } from '../../../common/modal/modal.component';
import { Http, Headers ,RequestOptions,ResponseContentType} from '@angular/http';
import { Location } from '@angular/common';
import { saveAs } from 'file-saver/FileSaver';
import { IMyDpOptions } from 'mydatepicker';
@Component( {
    selector: 'app-cusorderstatus',
    templateUrl: './cusorderstatus.component.html',
    styleUrls: ['./cusorderstatus.component.css', '../../../tables/components/dataTables/dataTables.scss']
} )
export class CusorderstatusComponent implements OnInit {
   filter_records = this.getEmptyfilterDetail();
   public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    };
    data;
	records =[];
    filterQuery = '';
    rowsOnPage = 50;
    rowsOnPageSet = [50,100,150];
    sortBy = 'id_orderdetails';
    sortOrder = 'desc';
	title: string = '';
	images;
	imgmodal: ModalComponent;
    private _header: Headers;
	accessData;
    public defaultPicture = 'assets/img/theme/loading.gif';
    constructor(private location: Location,private http: Http,  private router: Router, private service: CusorderstatusService, private commonservice: CommonService,private excelService: ExcelService ) 
	{
		this._header = new Headers();
		this._header.append( 'Authorization', 'Basic ' + this.commonservice.getAuthtoken());
        this._header.append( 'Content-Type', 'image/jpg' );
		this.excelService = excelService;
		
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
    }

    ngOnInit() {
        this.getCustomerOrderlist();
    }
	getEmptyfilterDetail()
	{
		var date     = new Date();
		var firstDay = new Date(date.getFullYear(), date.getMonth(),date.getDate() - 7, 1);
		return {
			from_day: {
					date: {
						year: firstDay.getFullYear(),
						month: firstDay.getMonth()+1,
						day: firstDay.getDate()
					}
				},
			from_date:'',
			last_day: {
					date: {
						year: date.getFullYear(),
						month: date.getMonth()+1,
						day: date.getDate()
					}
				},
			to_date:'',
			employee:'',
        }
	}
    getCustomerOrderlist() {
		if( this.filter_records.from_day != null ) {
		   var day     = this.filter_records.from_day.date.day;
		   var month   = this.filter_records.from_day.date.month;
		   var year    = this.filter_records.from_day.date.year;
		   this.filter_records.from_date = day.toString()+ "-" +month.toString()+ "-" +year.toString();
         }
        if( this.filter_records.last_day != null ) {
		   var day     = this.filter_records.last_day.date.day;
		   var month   = this.filter_records.last_day.date.month;
		   var year    = this.filter_records.last_day.date.year;
		   this.filter_records.to_date = day.toString()+ "-" +month.toString()+ "-" +year.toString();
         }
        this.service.getCustomerOrderStatusData({'from_date':this.filter_records.from_date,'to_date':this.filter_records.to_date}).then(( data ) => {
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
	// Get Filter Data
	getfilter_data()
    {
	   this.getCustomerOrderlist();
    }
    exportToExcel()
   {
	   this.excelService.exportAsExcelFile(this.data,'data');
   }
   
   downloadImgFile(imageurl : string) {
		 let options = new RequestOptions( { headers: this._header, responseType: ResponseContentType.Blob} );
		 console.log(options); 
		 console.log(imageurl); 
		 
	  this.http.get(imageurl,options).subscribe(
		  (response) => {
			    console.log(response.blob());
				var mediaType = 'application/Image';
				var blob = new Blob([response.blob()], {type: mediaType});
				var d = new Date(),
				n = d.getTime(),
				filename = n + ".jpg";
				saveAs(blob, filename);
			 
		  }, error => {
			 console.log(error);
            } );
	}
	
	orderImage( id_orderdetail ) {
        this.title = 'Customorder Images';
		let orderdata = this.data.filter(item => item.id_orderdetails == id_orderdetail);
		this.images =orderdata[0].customimages;
        this.imgmodal.open();
    }
	
	bindImageModal( _modal ) {
        this.imgmodal = _modal;
    }
}
