import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../common/common.service';
@Injectable()
export class CompanyService {

    constructor( private http: Http, private commonService: CommonService ) { }
    getCompanyDetails(): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/company_details', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
	updCompanyDetails(cmpdata): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_company', cmpdata,this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }

}
