import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { Http } from '@angular/http';
@Injectable()
export class OrderManageService 
{
	constructor( private commonService: CommonService, private http: Http ) { }
    getStockManageData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_ordermanagement', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
              let result = response.json();
              return result.responseData;
            } )
            .toPromise();
    }
	
	getOrderById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_ordermanage?id=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	
	saveOrderManage(data):any {
		return this.http
            .post( BaseAPIURL + 'Master_api/create_ordermanage', data, this.commonService.getHeader() )
            .map(( response ) => {
                 let result = response.json();
                return result; 
            } )
            .toPromise();
	}
	updateorderalert( data ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_ordermanage', data, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	 delete_ordermanage( smsdata ):any{
        return this.http
        .post( BaseAPIURL + 'Master_api/delete_ordermanage', smsdata, this.commonService.getHeader() )
        .map(( response ) => {
            // some response manipulation
            let result = response.json();
            return result;
        } )
        .toPromise();
    }
		
}
