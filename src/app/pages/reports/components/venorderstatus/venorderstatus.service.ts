import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../../common/common.service';

@Injectable()
export class VenorderstatusService {

    constructor( private http: Http, private commonService: CommonService ) { }
    getVendorOrderStatusData(order_fliter): any {
        return this.http
            .post( BaseAPIURL + 'Vendor_api/viewall_vendorsjobs', order_fliter, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }

}
