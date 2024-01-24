import { Component, OnInit } from '@angular/core';
import { CustomerdeliveryService } from './customerdelivery.service';
import { Router } from '@angular/router';
import { CommonService } from '../../../common/common.service';
import { ModalComponent } from '../../../common/modal/modal.component';
import { saveAs } from 'file-saver/FileSaver';
import { Http, Headers ,RequestOptions,ResponseContentType} from '@angular/http';
import { Location } from '@angular/common';
import { IMyDpOptions } from 'mydatepicker';
@Component( {
    selector: 'app-customerdelivery',
    templateUrl: './customerdelivery.component.html',
    styleUrls: ['./customerdelivery.component.css', '../../../tables/components/dataTables/dataTables.scss']
} )

export class CustomerdeliveryComponent implements OnInit {
    filter_records = this.getEmptyfilterDetail();
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    };
    data;
    filterQuery = '';
    rowsOnPage = 50;
    rowsOnPageSet = [50,100,150];
    sortBy = 'id_orderdetails';
    sortOrder = 'desc';

    orderdetailsmodal: ModalComponent;
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    orderdetails = [];
	private _header: Headers;
	images;
	imgmodal: ModalComponent;
	accessData;
    records =[];
	public loadingPicture = 'assets/img/theme/loading.gif';
    constructor(private location: Location,private http: Http, private router: Router, private service: CustomerdeliveryService, private commonservice: CommonService ){
		this._header = new Headers();
		this._header.append( 'Authorization', 'Basic ' + this.commonservice.getAuthtoken());
        this._header.append( 'Content-Type', 'image/jpg' );
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
        this.service.getData({'from_date':this.filter_records.from_date,'to_date':this.filter_records.to_date}).then(( data ) => {
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
	getfilter_data()
    {
	   this.getCustomerOrderlist();
    }
    bindOrderDetailModal( _modal ) {
        this.orderdetailsmodal = _modal;
    }
    closeorderdetailmodal() {
        this.orderdetails = [];
        this.orderdetailsmodal.close();
    }
    vieworderdetails( id_order,order) {
        this.title = 'View Order Details';
        this.isAddMode = false;
        this.isEditMode = false;
		this.orderdetails =[];
        this.orderdetails.push(order);
        this.orderdetailsmodal.open();
    }
    getOrderDetailById( orderid ) {
        this.service.getOrderDetailsById( orderid ).then( res => {
            if ( res ) {
                this.orderdetails = res;
            }
        }, error => {
            console.log( error );
        } );
    }
    processdelivery() {
        let deliveryorders = [];
        this.data.forEach(( orders ) => { // foreach statement  
            if ( orders.isChecked == true ) {
                //deliveryorders
                let delivery = {
                    id_orderdetails: orders.id_orderdetails
                };
                deliveryorders.push( orders );
            }
        } )
        if ( deliveryorders ) {
            this.service.updatereadytodelivery( JSON.stringify( { readydelivery: deliveryorders } ) ).then( res => {
                if ( res ) {
                    this.getCustomerOrderlist();
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                }
            }, error => {

            } );
        }
    }
	
orderImage( id_orderdetail ) {
          this.title          = 'Customorder Images';
		  this.images = [];
		  let orderdata       = this.data.filter(item => item.id_orderdetails == id_orderdetail);
		  if(orderdata[0].customimages !='')
		  {
		  this.images         = orderdata[0].customimages;
		  }
		  else
		  {
			  this.images.push(orderdata[0].image);
       	  }
		  this.imgmodal.open();
    }

	bindImageModal( _modal ) {
        this.imgmodal = _modal;
    }	

    closeImageModal()
	  {
          this.imgmodal;		  
	  }	
		
	 /* downloadImgFile() {
		 let options = new RequestOptions( { headers: this._header, responseType: ResponseContentType.Blob} );
		 console.log(options);
	  this.http.get(
		'http://winjewel.hrdkbullion.com/hrdkapi/assets/images/products/JR03727-YGP900_1_lar.jpg',options).subscribe(
		  (response) => {
			    console.log(response.blob());
			    console.log(response);
				var mediaType = 'application/Image';
				var blob = new Blob([response.blob()], {type: mediaType});
				var filename = 'test.jpg';
				saveAs(blob, filename);
			 
		  }, error => {
			 console.log(error);
				var mediaType = 'application/Image';
				var blob = new Blob([error], {type: mediaType});
				var filename = 'test.jpg';
				saveAs(blob, filename);
            } );
	} */ 

}
