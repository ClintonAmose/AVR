import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { Http } from '@angular/http';
@Injectable()
export class CollectionService {

    constructor( private commonService: CommonService, private http: Http ) { }
    getCollectionData(): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_collection', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    getCollectionById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_collection?id=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    saveCollection( colldata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/create_collection', colldata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updateCollection( colldata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_collection', colldata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    deleteCollection( collection ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/delete_collection', collection, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }


}
