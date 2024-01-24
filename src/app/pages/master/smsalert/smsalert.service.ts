import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { Http } from '@angular/http';
@Injectable()
export class SmsalertService 
{
	constructor( private commonService: CommonService, private http: Http ) { }
    getSmsData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_smsalert', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
              let result = response.json();
              return result.responseData;
            } )
            .toPromise();
    }
	
	getSmsById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_smsalert?id=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	
	saveSmsalert(smsdata):any {
		return this.http
            .post( BaseAPIURL + 'Master_api/create_smsalert', smsdata, this.commonService.getHeader() )
            .map(( response ) => {
                 let result = response.json();
                return result; 
            } )
            .toPromise();
	}
	updateSmsalert( smsdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_smsalert', smsdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	 deletesmsalert( smsdata ):any{
        return this.http
        .post( BaseAPIURL + 'Master_api/delete_smsalert', smsdata, this.commonService.getHeader() )
        .map(( response ) => {
            // some response manipulation
            let result = response.json();
            return result;
        } )
        .toPromise();
    }
		
}
