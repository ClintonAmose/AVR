import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../common/common.service';
@Injectable()
export class ItemcategoryService {

    constructor( private http: Http, private commonService: CommonService ) { }

    getitemcategoryData(): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_itemcategory', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    saveaitemcategory( itemcategorydata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/create_itemcategory', itemcategorydata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    getItemCategoryById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_itemcategory?id_itemcategory=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updateitemcategory( catdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_itemcategory', catdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    deleteitemcategory( itemcategoryid ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/delete_itemcategory', itemcategoryid, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }


}
