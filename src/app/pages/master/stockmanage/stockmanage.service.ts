import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { Http } from '@angular/http';
@Injectable()
export class StockManageService 
{
	constructor( private commonService: CommonService, private http: Http ) { }
    getStockManageData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_stockmanagement', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
              let result = response.json();
              return result.responseData;
            } )
            .toPromise();
    }
	
	getStockById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_stockmanage?id=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	
	saveStockManage(data):any {
		return this.http
            .post( BaseAPIURL + 'Master_api/create_stockmanage', data, this.commonService.getHeader() )
            .map(( response ) => {
                 let result = response.json();
                return result; 
            } )
            .toPromise();
	}
	updateSmsalert( data ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_stockmanage', data, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	 delete_stockmanage( smsdata ):any{
        return this.http
        .post( BaseAPIURL + 'Master_api/delete_stockmanage', smsdata, this.commonService.getHeader() )
        .map(( response ) => {
            // some response manipulation
            let result = response.json();
            return result;
        } )
        .toPromise();
    }
		
}
