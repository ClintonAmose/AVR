import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../../common/common.service';
@Injectable()
export class CustomerrequestService {

    constructor( private http: Http, private commonService: CommonService ) { }
    getData(order_fliter): any {
        return this.http
            .post( BaseAPIURL + 'Customer_api/customer_request_orders',order_fliter, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    getVendorData(): any {
        return this.http
            .get( BaseAPIURL + 'Vendor_api/read_activekarigaruser', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    assignordertovendor( orders ): any {
        return this.http
            .post( BaseAPIURL + 'Customer_api/assign_customer_order', orders, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
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

}
