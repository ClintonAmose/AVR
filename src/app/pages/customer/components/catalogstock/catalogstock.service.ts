import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../../common/common.service';
@Injectable()
export class CatalogStockService {

    constructor( private http: Http, private commonService: CommonService ) { }
    getData(order_fliter): any {
        return this.http
            .post( BaseAPIURL + 'Customer_api/catalogstock',order_fliter, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
  
     getBranchData(): any {
         //let options = new RequestOptions({ headers: this.commonService.getHeader() });
         return this.http
             .get( BaseAPIURL + 'Adminaccount_api/readall_branch', this.commonService.getHeader() )
             .map(( response ) => {
                 // some response manipulation
                 let result = response.json();
                 return result.resposeData;
             } )
             .toPromise();
     }
	 
	  getVendorData(): any {
        return this.http
            .get( BaseAPIURL + 'Vendor_api/read_karigaruser', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
	 
	 
	 
     assignordertobranch(orders) : any {
        return this.http
            .post( BaseAPIURL + 'Customer_api/assign_branch_order', orders, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
  
      rejectcustomerorder( orders ): any {
        return this.http
            .post( BaseAPIURL + 'Customer_api/reject_customer_order', orders, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	
	
	 getOrderDetailsById( orderid ): any {
        return this.http
            .get( BaseAPIURL + 'Customer_api/catalogstock_order_details_byid?id_orderdetails=' + orderid, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
	
  
}
