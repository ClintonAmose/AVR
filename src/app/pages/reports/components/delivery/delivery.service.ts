import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../../common/common.service';

@Injectable()
export class DeliveryService {

    constructor( private http: Http, private commonService: CommonService ) { }
    getDeliveryReadyStatusData(order_fliter): any {
        return this.http
            .post( BaseAPIURL + 'Vendor_api/view_deliveryready_reports', order_fliter, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
	
	reject_customerorder(orders) :any {
		 return this.http
            .post( BaseAPIURL + 'Customer_api/reject_customerorder',orders, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
	}



}
