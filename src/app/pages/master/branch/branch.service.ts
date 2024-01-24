import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../common/common.service';
@Injectable()
export class BranchService {

    constructor( private http: Http, private commonService: CommonService ) { }
    getData(): any {
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
    getbranchdetailById( branchid ): any {
        return this.http
            .get( BaseAPIURL + 'Adminaccount_api/reterive_branch?id=' + branchid, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    savebranch( branchdata ): any {
        return this.http
            .post( BaseAPIURL + 'Adminaccount_api/create_branch', branchdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updatebranch( branchdata ): any {
        return this.http
            .post( BaseAPIURL + 'Adminaccount_api/update_branch', branchdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
}
