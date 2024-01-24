import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../common/common.service';

@Injectable()
export class ItemtypeService {

    constructor( private http: Http, private commonService: CommonService ) { }
    
    getitemtypeData(): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_itemtype', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    saveaitemtype( itemtypedata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/create_itemtype', itemtypedata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    getItemTypeById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_itemtype?id_itemtype=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updateitemtype( catdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_itemtype', catdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    deleteitemtype( itemtypeid ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/delete_itemtype', itemtypeid, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }

}
