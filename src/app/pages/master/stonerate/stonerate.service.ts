import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { Http } from '@angular/http';
@Injectable()
export class StoneRateService 
{
	constructor( private commonService: CommonService, private http: Http ) { }
    getStoneRateData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_stonerate', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
              let result = response.json();
              return result.responseData;
            } )
            .toPromise();
    }

	getStoneRateById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_stonerate?id=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	
	saveStoneRate(stoneratedata):any {
		return this.http
            .post( BaseAPIURL + 'Master_api/create_stonerate', stoneratedata, this.commonService.getHeader() )
            .map(( response ) => {
                 let result = response.json();
                return result; 
            } )
            .toPromise();
	}
	
	updateStoneRate( stoneratedata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_stonerate', stoneratedata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	
  deletestonerate(stoneratedata):any{
        return this.http
        .post( BaseAPIURL + 'Master_api/delete_stonerate', stoneratedata, this.commonService.getHeader() )
        .map(( response ) => {
            // some response manipulation
            let result = response.json();
			console.log(result);
            return result;
        } )
        .toPromise();
    }
}
