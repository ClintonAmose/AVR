import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { Http } from '@angular/http';
@Injectable()
export class DealerService {

    constructor( private commonService: CommonService, private http: Http ) { }
    getDealerData(): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_dealers', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    getDealerById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_dealer?id=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    saveDealer( colldata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/create_dealer', colldata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updateDealer( colldata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_dealers', colldata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    deleteDealer( collection ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/delete_dealer', collection, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }


}
