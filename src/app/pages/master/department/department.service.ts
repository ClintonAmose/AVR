import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { Http } from '@angular/http';

@Injectable()
export class DepartmentService {

    constructor( private commonService: CommonService, private http: Http ) { }
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
    getDepartmentById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_department?id=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    saveDepartment( deptdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/create_department', deptdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updateDepartment( deptdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_department', deptdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    deleteDepartment(department):any{
        return this.http
        .post( BaseAPIURL + 'Master_api/delete_department', department, this.commonService.getHeader() )
        .map(( response ) => {
            // some response manipulation
            let result = response.json();
            return result;
        } )
        .toPromise();
    }

}
