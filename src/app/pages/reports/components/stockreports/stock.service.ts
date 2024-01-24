import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../../common/common.service';

@Injectable()
export class StockService {

    constructor( private http: Http, private commonService: CommonService ) { }
   
	// Get Branches
	
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
	
	 getAvailableStock( orderdata ): any {
        return this.http
            .post( BaseAPIURL + 'Customer_api/read_avaliablestock_design',orderdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }

	

}
