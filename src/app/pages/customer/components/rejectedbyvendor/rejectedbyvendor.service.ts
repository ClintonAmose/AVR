import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../../common/common.service';
@Injectable()
export class RejectedbyvendorService {

    constructor( private http: Http, private commonService: CommonService ) { }
    getData(): any {
        return this.http
            .get( BaseAPIURL + 'Customer_api/venrejectorder', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
  
}
