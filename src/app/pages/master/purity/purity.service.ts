import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { Http } from '@angular/http';
@Injectable()
export class PurityService {

    constructor( private commonService: CommonService, private http: Http ) { }
    getPurityData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_purity', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
	getActivePurityData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readactive_purity', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    getPurityById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_purity?id=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    savePurity( puritydata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/create_purity', puritydata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updatePurity( puritydata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_purity', puritydata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    deletePurity(purity):any{
        return this.http
        .post( BaseAPIURL + 'Master_api/delete_purity', purity, this.commonService.getHeader() )
        .map(( response ) => {
            // some response manipulation
            let result = response.json();
            return result;
        } )
        .toPromise();
    }

}
