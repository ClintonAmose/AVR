import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../../common/common.service';

@Injectable()
export class JobordersService {

    constructor( private http: Http, private commonService: CommonService ) { }

    getData(order_fliter): any {
        return this.http
            .post( BaseAPIURL + 'Vendor_api/viewall_vendorsjobs',order_fliter,this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    
	 getBranchData(): any {
         //let options = new RequestOptions({ headers: this.commonService.getHeader() });
         return this.http
             .get( BaseAPIURL + 'Adminaccount_api/readall_branch', this.commonService.getHeader() )
             .map(( response ) => {
                 // some response manipulation
                 let result = response.json();
                 return result.resposeData;
             } )
             .toPromise();
     }
	
}
