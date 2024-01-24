import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../../common/common.service';
import { Http } from '@angular/http';
@Injectable()
export class PermissionService {

    constructor( private commonService: CommonService, private http: Http ) { }
    
    getAccessPermissionByID( getAccessPermission ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_accesspermissionByID?id='+getAccessPermission, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	getProfile(  ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_profile', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updateAccessPermission( permissiondata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_accesspermission', permissiondata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
}
