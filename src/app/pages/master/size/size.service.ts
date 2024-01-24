import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { Http } from '@angular/http';
@Injectable()
export class SizeService 
{
	constructor( private commonService: CommonService, private http: Http ) { }
    getSizeData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_size', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
              let result = response.json();
              return result.responseData;
            } )
            .toPromise();
    }
	
	getSizeById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_size?id=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	
	saveSize(sizedata):any {
		return this.http
            .post( BaseAPIURL + 'Master_api/create_size', sizedata, this.commonService.getHeader() )
            .map(( response ) => {
                 let result = response.json();
                return result; 
            } )
            .toPromise();
	}
	updateSize( sizedata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_size', sizedata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	 deletesize(size):any{
        return this.http
        .post( BaseAPIURL + 'Master_api/delete_size', size, this.commonService.getHeader() )
        .map(( response ) => {
            // some response manipulation
            let result = response.json();
            return result;
        } )
        .toPromise();
    }
		
}
