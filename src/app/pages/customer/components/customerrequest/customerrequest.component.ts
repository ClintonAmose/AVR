import { Component, OnInit ,Injectable  } from '@angular/core';
import { Location } from '@angular/common';
import { CustomerrequestService } from './customerrequest.service';
import { Router } from '@angular/router';
import { CommonService } from '../../../common/common.service';
import { ModalComponent } from '../../../common/modal/modal.component';
import { Http, Headers ,RequestOptions,ResponseContentType} from '@angular/http';
import { saveAs } from 'file-saver/FileSaver';
import { GlobalState } from '../../../../global.state';
import { IMyDpOptions } from 'mydatepicker';
import { StockManageService } from '../../../master/stockmanage/stockmanage.service';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { Subscription as Sub } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';

@Component( {
    selector: 'app-customerrequest',
    templateUrl: './customerrequest.component.html',
    styleUrls: ['./customerrequest.component.css', '../../../tables/components/dataTables/dataTables.scss'],
	providers: [StockManageService]
} )


@Injectable()
export class CustomerrequestComponent implements OnInit {
   filter_records = this.getEmptyfilterDetail();

   public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    };
    data;
	cusorderweight=0;
	cusorderlist;
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
    vendors = [];
    branches  = [];
    orignial_catdesign_image  = [];
    assignvendor = "";
    assignbranch = "";
	private _header: Headers;
	images;
	chen : string = 'CHE';
	bang  : string = 'BAN';
	mumb  : string = 'MUB';
	imgmodal: ModalComponent;
	accessData;
	public isMenuCollapsed: boolean = false;
    smallImageSrc="";
	records =[];
	public loadingPicture = 'assets/img/theme/loading.gif';

	public logoPicture = 'assets/img/logo.png';
	 stock_manages : any;
    constructor(private location: Location,private http: Http, private router: Router, private service: CustomerrequestService, private commonservice: CommonService,private _state: GlobalState,private stockmanage : StockManageService,private socket: Socket) {
		this._header = new Headers();
		this._header.append( 'Authorization', 'Basic ' + this.commonservice.getAuthtoken());
        this._header.append( 'Content-Type', 'image/jpg' );

		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');

		this.accessData = this.commonservice.getUserAccessByMenuPath(path[2])[0];

		 this._state.subscribe( 'menu.isCollapsed', ( isCollapsed ) => {
            this.isMenuCollapsed = isCollapsed;
        } );

        this.toggleMenu();
        this.onNewMessage();
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

  // HANDLER
  onNewMessage() {
		 this.socket.on("devupdateorder:App\\Events\\WJDevUpdates", function(data){
			console.log("New Order Table Refreshed");
			   let audio  = new Audio();
			   audio.src  = "assets/beep-09.mp3";
			   audio.load();
			   audio.play();
		 });
    }

	 public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
		console.log(this.isMenuCollapsed);
        this._state.notifyDataChanged( 'menu.isCollapsed', this.isMenuCollapsed );
        return false;
    }


    ngOnInit() {

        this.getVendorslist();
        this.getBranches();
		this.getStockManageData();
		this.getCustomerOrderlist();
    }
    // Get All Branches

    getBranches()
    {
       this.service.getBranchData().then(( data ) => {
              this.branches = data;
			  console.log(this.branches);
          } );
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
            this.cusorderlist  = data;
			this.getCustomerOrderweight();

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


	getCustomerOrderweight()
	{
		this.cusorderweight = 0;
		this.smallImageSrc  = "";
		this.data.forEach(( orders ) => { // foreach statement
                 this.cusorderweight += parseFloat(orders.weight);
             } );

			 var a              = this.cusorderweight;
			 this.smallImageSrc = a.toFixed(3);
	}


    getVendorslist() {
        this.service.getVendorData().then(( data ) => {
            this.vendors = data;
        } );
    }

	// Get Stock Manage Datas

	 getStockManageData() {
        this.stockmanage.getStockManageData().then(( data ) => {
			this.stock_manages =data[0].status;
			console.log(this.stock_manages);
		});
    }


    getOrderDetailById( orderid ) { }

    assignordertovendor() {
        let assignorders = [];
        this.data.forEach(( orders ) => { // foreach statement
            if ( orders.isChecked == true ) {
                //deliveryorders
                assignorders.push( orders );
            }
        } )
        if ( assignorders.length > 0 && this.assignvendor != "" || this.assignbranch !='' ) {
            this.service.assignordertovendor( JSON.stringify( { assignorders: assignorders, vendorid: this.assignvendor,branchid:this.assignbranch } ) ).then( res => {
                if ( res ) {
                    this.getCustomerOrderlist();
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                }
            }, error => {
                this.commonservice.showAlertMSG( 2, "Please select any one order" );
            } );
        } else {
            if ( this.assignvendor == "" ) {
                this.commonservice.showAlertMSG( 2, "Please select karigar or Branch Options" );
                return;
            }
            this.commonservice.showAlertMSG( 2, "Please select any one order" );
        }
    }

    rejectcustomerorder() {
        let rejectorders = [];
        this.data.forEach(( orders ) => { // foreach statement
            if ( orders.isChecked == true ) {
                let rejorders = {
                    id_orderdetails: orders.id_orderdetails
                };
                rejectorders.push( rejorders );
            }
        } )
        if ( rejectorders.length > 0) {
            this.service.rejectcustomerorder( JSON.stringify( { rejectorders: rejectorders,vendorid: this.assignvendor,branchid:this.assignbranch  } ) ).then( res => {
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
        } else {
            this.commonservice.showAlertMSG( 2, "Please select any one order" );
        }
    }


	ordertypeFilter(type:string){

		 console.log(type);

		if(type == ''){
			this.data = this.cusorderlist;

		}else{

			let filteredOrders = this.cusorderlist.filter(o => o.is_customeitem == type);
			this.data = filteredOrders;

		}


	}

	downloadImgFile(imageurl : string) {
		 let options = new RequestOptions( { headers: this._header, responseType: ResponseContentType.Blob} );
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

 /*  public config: ICarouselConfig = {
			verifyBeforeLoad: true,
			log: false,
			animation: true,
			animationType: AnimationConfig.SLIDE,
			autoplay: true,
			autoplayDelay: 2000,
			stopAutoplayMinWidth: 768
    };  */


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


	// Image Zooming Options


	   PhotoClicked($event)
	   {
           $event.stopPropogation();
	   }


	// Print the Documents

		customerorder_print($event,item): void {

		let popupWin,printContents;
		printContents = item;
	    let order_images = [];
		let orderdata       = this.data.filter(item => item.id_orderdetails == printContents.id_orderdetails);
		if(orderdata[0].customimages !='')
		 {
				order_images = orderdata[0].customimages;
		 }
		 else
		  {
			  order_images.push(orderdata[0].image);
       	  }

		popupWin = window.open('','_blank','top=0,left=0,height=100%,max-width=100%,padding=0;margin:0');
		//popupWin.document.open();
		for(var i=0;i<order_images.length;i++) {
			let imageurl = order_images[i];
		  popupWin.document.write(`
		  <html>`);
		  if(i==0) {
		  popupWin.document.write(`
		   <h3 style="marign-left:25px;"><center><img src="${this.logoPicture}" max-width='170px' height="150px"></center></h3><h3 style="marign-left:25px;"><center>Customer Order List</center></h3>`);
		  }
		  popupWin.document.write(`
		   <body onload="window.print();">
		   <center><img src="${imageurl}" max-width='660px' height="600px">
		   <br><br>`);
		}
		  popupWin.document.write(`
		    <table border="0" style="border:1px solid #000000;padding:5px;marign-left:25px;">
			<tbody>
					<tr>
					    <td width="230px" style="fontSize:17px;">Order Number</td>
						<td width="20px">:</td>
						<td><label>${printContents.orderno}</label></td>
						<td width="230px" style="fontSize:15px;">Customer Order</td>
						<td width="20px">:</td>
						<td>${printContents.is_customeitem}</td>
					</tr>
					<tr>
						<td width="230px" style="fontSize:15px;">Order Taken Employee</td>
						<td width="20px">:</td>
						<td><label>${printContents.employee}</label></td>
						<td width="230px" style="fontSize:15px;">Due Date</td>
						<td width="20px">:</td>
						<td><label>${printContents.due_date}</label></td>
					</tr>
					</tr>
					<tr>
					    <td width="230px" style="fontSize:17px;fontWeight:bold">Item</td>
						<td width="20px">:</td>
						<td><label>${printContents.itemname}</label></td>
						<td width="230px" style="fontSize:15px;">Size</td>
						<td width="20px">:</td>
						<td><label>${printContents.size}</label></td>
					</tr>
					<tr>
					    <td width="230px" style="fontSize:17px;fontWeight:bold">Total Items</td>
						<td width="20px">:</td>
						<td><label>${printContents.totalitems}</label></td>
						<td width="230px" style="fontSize:15px;">Weight</td>
						<td width="20px">:</td>
						<td><label>${printContents.weight}</label></td>
					</tr>
					<tr>
					    <td width="230px" style="fontSize:17px;fontWeight:bold">Order Status</td>
						<td width="20px">:</td>
						<td><label>${printContents.orderstatus}</label></td>
						<td width="230px" style="fontSize:15px;">Order Type</td>
						<td width="20px">:</td>
						<td><label>${printContents.ortertype}</label></td>
					</tr>
					<tr>
					    <td width="230px" style="fontSize:17px;fontWeight:bold">Order Date</td>
						<td width="20px">:</td>
						<td><label>${printContents.order_date}</label></td>
						<td width="230px" style="fontSize:15px;">Delivery Date</td>
						<td width="20px">:</td>
						<td><label>${printContents.deliverydate}</label></td>
					</tr>
					<tr>
					    <td width="230px" style="fontSize:17px;fontWeight:bold">Description</td>
						<td width="20px">:</td>
						<td colspan='4'><label>${printContents.description}</label></td>
					</tr>

				</tbody>
			</table></center>
	</body>
</html>`
		);
		popupWin.document.close();
	}

	  bindOrderDetailModal( _modal ) {
        this.orderdetailsmodal = _modal;
    }
    closeorderdetailmodal() {
        this.orderdetails = [];
        this.orderdetailsmodal;
    }

     vieworderdetails( id_order,order ) {
        this.title = 'View Order Details';
        this.isAddMode = false;
        this.isEditMode = false;
	    this.orderdetails.push(order);
        this.orderdetailsmodal.open();
    }


     closeImageModal()
	  {
          this.imgmodal;
	  }



}
