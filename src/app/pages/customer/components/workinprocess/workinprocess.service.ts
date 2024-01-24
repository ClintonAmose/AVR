import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../../common/common.service';
@Injectable()
export class WorkinProcessService {

    constructor( private http: Http, private commonService: CommonService ) { }
    getData(order_fliter): any {
        return this.http
            .post( BaseAPIURL + 'Customer_api/workinprocess',order_fliter, this.commonService.getHeader() )
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
  
}
