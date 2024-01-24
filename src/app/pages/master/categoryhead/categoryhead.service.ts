import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { Http } from '@angular/http';
@Injectable()
export class CategoryheadService {

    constructor( private commonService: CommonService, private http: Http ) { }
    getcategoryheadData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_categoryhead', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    getcategoryheadById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_categoryhead?id=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    savecategoryhead( categoryheaddata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/create_categoryhead', categoryheaddata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updatecategoryhead( categoryheaddata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_categoryhead', categoryheaddata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    deletecategoryhead( categoryhead ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/delete_categoryhead', categoryhead, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }

}
