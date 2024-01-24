import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { Http } from '@angular/http';
@Injectable()
export class RateService 
{
	constructor( private commonService: CommonService, private http: Http ) { }
    
	getRateData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_rate', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
              let result = response.json();
              return result.responseData;
            } )
            .toPromise();
    }
	
	getRateById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_rate?id=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	
	saveRate(ratedata):any {
		return this.http
            .post( BaseAPIURL + 'Master_api/create_rate', ratedata, this.commonService.getHeader() )
            .map(( response ) => {
                 let result = response.json();
                return result; 
            } )
            .toPromise();
	}
	updateRate( ratedata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_rate', ratedata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	
	 deleterate(ratedata):any{
        return this.http
        .post( BaseAPIURL + 'Master_api/delete_rate', ratedata, this.commonService.getHeader() )
        .map(( response ) => {
            // some response manipulation
            let result = response.json();
			console.log(result);
            return result;
        } )
        .toPromise();
    }
	
}
