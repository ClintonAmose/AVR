import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { Http } from '@angular/http';
@Injectable()
export class StyleService {

    constructor( private commonService: CommonService, private http: Http ) { }
    getStyleData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_catalogstyle', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    getStyleById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_catalogstyle?id=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    saveStyle( styledata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/create_catalogstyle', styledata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updateStyle( styledata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_catalogstyle', styledata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    deleteStyle(style):any{
        return this.http
        .post( BaseAPIURL + 'Master_api/delete_catalogstyle', style, this.commonService.getHeader() )
        .map(( response ) => {
            // some response manipulation
            let result = response.json();
            return result;
        } )
        .toPromise();
    }


}
