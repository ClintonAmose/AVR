import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../common/common.service';
@Injectable()
export class SubcategoryService {

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
    getSubCategoryData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_subcategory', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    getSubCategoryByCatId(catid): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_subcategory', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData.filter(subca => subca.id_category == catid);
            } )
            .toPromise();
    }
    saveasubcategory( catdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/create_subcategory', catdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    getsubCategoryById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_subcategory?id=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updatesubcategory( catdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_subcategory', catdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    deletesubcategory( catid ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/delete_subcategory', catid, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }

}
