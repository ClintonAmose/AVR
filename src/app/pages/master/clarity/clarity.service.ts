import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { Http } from '@angular/http';
@Injectable()
export class ClarityService {

    constructor( private commonService: CommonService, private http: Http ) { }
    getClarityData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_clarity', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    getClarityById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_clarity?id=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    saveClarity( claritydata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/create_clarity', claritydata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updateClarity( claritydata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_clarity', claritydata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    deleteClarity(clarity):any{
        return this.http
        .post( BaseAPIURL + 'Master_api/delete_clarity', clarity, this.commonService.getHeader() )
        .map(( response ) => {
            // some response manipulation
            let result = response.json();
            return result;
        } )
        .toPromise();
    }

}
