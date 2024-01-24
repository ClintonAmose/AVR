import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { Http } from '@angular/http';
@Injectable()
export class ThemeService {

    constructor( private commonService: CommonService, private http: Http ) { }
    getThemeData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_theme', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    getThemeById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_theme?id=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    saveTheme( themedata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/create_theme', themedata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updateTheme( themedata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_theme', themedata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    deleteTheme(theme):any{
        return this.http
        .post( BaseAPIURL + 'Master_api/delete_theme', theme, this.commonService.getHeader() )
        .map(( response ) => {
            // some response manipulation
            let result = response.json();
            return result;
        } )
        .toPromise();
    }


}
