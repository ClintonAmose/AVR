import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { Http } from '@angular/http';

@Injectable()
export class CityService {

    constructor( private commonService: CommonService, private http: Http ) { }
    getCitybyStateData( id ): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_city?id_state=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }

}
