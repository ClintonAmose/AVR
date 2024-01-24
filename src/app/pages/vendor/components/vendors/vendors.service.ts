import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../../common/common.service';

@Injectable()
export class VendorsService {

    constructor( private http: Http, private commonService: CommonService ) { }

    getData(): any {
        return this.http
            .get( BaseAPIURL + 'Vendor_api/read_karigaruser', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    getvendordetails( userid ): any {
        return this.http
            .get( BaseAPIURL + 'Vendor_api/reterive_karigaruser?id=' + userid, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
	
    savevendor(vendordata): any {
		 return this.http
            .post( BaseAPIURL + 'Vendor_api/create_vendoruser', vendordata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
			     console.log(result);
                return result;
            } )
            .toPromise();
    }
	

   updatevendor( vendorpersonal ): any {
        return this.http
            .post( BaseAPIURL + 'Vendor_api/update_karigaruser', vendorpersonal, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    } 
	
	deletekarigar( idkarigar ): any {
        return this.http
            .post( BaseAPIURL + 'Vendor_api/delete_karigaruser', idkarigar, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    } 
	
	getmultiuserById( approve ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/updatekarigar_status', approve ,this.commonService.getHeader() )
            .map(( response ) => {
                let result = response.json();
                return result;
            } )
            .toPromise();
    }

}
