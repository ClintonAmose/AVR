import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../common/common.service';
@Injectable()
export class CustomerrequestService {

    constructor( private http: Http, private commonService: CommonService ) { }
    getData(): any {
        return this.http
            .get( BaseAPIURL + 'Customer_api/customer_request_orders', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
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
}
