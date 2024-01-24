import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../../common/common.service';

@Injectable()
export class CustomerdeliveryService {

    constructor( private http: Http, private commonService: CommonService ) { }
    getData(order_filter): any {
        return this.http
            .post( BaseAPIURL + 'Customer_api/customer_readytodelivery_orders',order_filter, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    getOrderDetailsById( orderid ): any {
        return this.http
            .get( BaseAPIURL + 'Customer_api/customer_orderdetail_byorderid?id_orderdetails=' + orderid, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    updatereadytodelivery( orders ): any {
        return this.http
            .post( BaseAPIURL + 'Customer_api/update_ordersto_delivery', orders, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }

}
