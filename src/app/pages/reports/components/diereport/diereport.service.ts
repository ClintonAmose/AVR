import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../../common/common.service';

@Injectable()
export class DiereportService {

    constructor( private http: Http, private commonService: CommonService ) { }
    getReqDieForDesignData(): any {
        return this.http
            .get( BaseAPIURL + 'Vendor_api/viewreq_diefordesign', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }

}
