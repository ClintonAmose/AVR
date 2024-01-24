import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../common/common.service';
@Injectable()
export class EmployeeService {

    constructor( private http: Http, private commonService: CommonService ) { }
    getServerurl(): any {
        return BaseAPIURL;
    }
    getData(): any {
        return this.http
            .get( BaseAPIURL + 'Adminaccount_api/readall_employee', this.commonService.getHeader() )
            .map(( response ) => {
                let result = response.json();
                return result.resposeData;
            } )
            .toPromise();
    }
    getemployeedetailById( empid ): any {
        return this.http
            .get( BaseAPIURL + 'Adminaccount_api/reterive_employee?id=' + empid, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    createemployee( empdata ): any {
        return this.http
            .post( BaseAPIURL + 'Adminaccount_api/create_employee', empdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updateemployee( empdata ): any {
        return this.http
            .post( BaseAPIURL + 'Adminaccount_api/update_employee', empdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    getDepartmentData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_department', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    getDesignationData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_designation', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    getProfileData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_profile', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    getusercredential( userid ): any {
        return this.http
            .get( BaseAPIURL + 'Adminaccount_api/reterive_employee?id=' + userid, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    updateemployeecredential( empcred ): any {
        return this.http
            .post( BaseAPIURL + 'Adminaccount_api/update_employee_credentials', empcred, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    getAuthtoken(): any {
        return btoa( 'lmxretail:lmx@2017' );
    }
    getauthTokenPrefix(): any {
        return 'Basic';
    }

}
