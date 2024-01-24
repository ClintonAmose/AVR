import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../../common/common.service';
@Injectable()

export class RejectedbyadminService {

    constructor( private http: Http, private commonService: CommonService ) { }
    getData(order_fliter): any {
        return this.http
            .post( BaseAPIURL + 'Customer_api/adminrejected_orders',order_fliter,this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
  
}
