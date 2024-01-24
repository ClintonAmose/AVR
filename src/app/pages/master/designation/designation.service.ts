import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { Http } from '@angular/http';

@Injectable()
export class DesignationService {

    constructor( private commonService: CommonService, private http: Http ) { }
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
    getDesignationById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_designation?id=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    saveDesignation( deptdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/create_designation', deptdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updateDesignation( deptdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_designation', deptdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    deleteDesignation(designation):any{
        return this.http
        .post( BaseAPIURL + 'Master_api/delete_designation', designation, this.commonService.getHeader() )
        .map(( response ) => {
            // some response manipulation
            let result = response.json();
            return result;
        } )
        .toPromise();
    }
}
