import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { Http } from '@angular/http';
@Injectable()
export class ProfileService {

    constructor( private commonService: CommonService, private http: Http ) { }
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
    getProfileById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_profile?id=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    saveProfile( protdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/create_profile', protdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updateProfile( protdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_profile', protdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    deleteProfile(profile):any{
        return this.http
        .post( BaseAPIURL + 'Master_api/delete_profile', profile, this.commonService.getHeader() )
        .map(( response ) => {
            // some response manipulation
            let result = response.json();
            return result;
        } )
        .toPromise();
    }

}
