import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../common/common.service';

@Injectable()
export class CategoryService {

    constructor( private http: Http, private commonService: CommonService ) { }
    getServerurl(): any {
        return BaseAPIURL;
    }
    getAuthtoken(): any {
        return btoa( 'lmxretail:lmx@2017' );
    }
    getauthTokenPrefix(): any {
        return 'Basic';
    }
    getCategoryData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_category', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    saveacategory( catdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/create_category', catdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    getCategoryById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_category?id_category=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updatecategory( catdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_category', catdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    deletecategory(catid):any{
        return this.http
        .post( BaseAPIURL + 'Master_api/delete_category', catid, this.commonService.getHeader() )
        .map(( response ) => {
            // some response manipulation
            let result = response.json();
            return result;
        } )
        .toPromise();
    }

}
