import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../../common/common.service';

@Injectable()
export class CustomerorderService {

    constructor( private http: Http, private commonService: CommonService ) { }
    getData(order_fliter): any {
        return this.http
            .post( BaseAPIURL + 'Customer_api/customer_orders', order_fliter, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
     getOrderDetailsById( orderid ): any {
        return this.http
            .get( BaseAPIURL + 'Customer_api/customer_order_details_byid?id_orderdetails=' + orderid, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }

}
