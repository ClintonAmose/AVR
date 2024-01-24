import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../common/common.service';
@Injectable()
export class CustomerService {

    constructor( private http: Http, private commonService: CommonService ) { }
    getData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Customer_api/readall_customer', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.resposeData;
            } )
            .toPromise();
    }

	getExpirecustomer() :any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Customer_api/checkall_customer_expireperiod', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.resposeData;
            } )
            .toPromise();
    }

    getcustomerdetailById( branchid ): any {
        return this.http
            .get( BaseAPIURL + 'Customer_api/reterive_customer?id=' + branchid, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    savebranch( branchdata ): any {
      console.log(branchdata);

        return this.http
            .post( BaseAPIURL + 'Customer_api/create_appuser', branchdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	deletecus( idcus ): any {
        return this.http
            .post( BaseAPIURL + 'Customer_api/delete_customer', idcus, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updatebranch( branchdata ): any {
        return this.http
            .post( BaseAPIURL + 'Customer_api/update_customer', branchdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	getDealerData(  ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_dealers',  this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	getActiveDealerData(  ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/readactive_dealers',  this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	getmultiuserById( approve ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/updateusers_status', approve ,this.commonService.getHeader() )
            .map(( response ) => {
                let result = response.json();
                return result;
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
