import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../../common/common.service';
@Injectable()
export class DeliveryremainderService {

    constructor( private http: Http, private commonService: CommonService ) { }
	
	getDeliveryremainder(): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_ordermanagement',this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
	
    getData(order_fliter): any {
        return this.http
            .post( BaseAPIURL + 'Customer_api/deliverydate_remainderorders',order_fliter,this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
	
	updatevenfeedback( orders ): any {
        return this.http 
            .post( BaseAPIURL + 'Customer_api/update_vendorfeedback', orders, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
  
}
