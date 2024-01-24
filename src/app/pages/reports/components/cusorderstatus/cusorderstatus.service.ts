import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../../common/common.service';

@Injectable()
export class CusorderstatusService {

    constructor( private http: Http, private commonService: CommonService ) { }
    getCustomerOrderStatusData(order_fliter): any {
        return this.http
            .post( BaseAPIURL + 'Customer_api/customer_order_status', order_fliter, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }

}
