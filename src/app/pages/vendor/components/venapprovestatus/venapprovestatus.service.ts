import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../../common/common.service';

@Injectable()
export class VendorApprovestatusService {

    constructor( private http: Http, private commonService: CommonService ) { }
    getVendorOrderStatusData(order_fliter): any {
        return this.http
            .post( BaseAPIURL + 'Vendor_api/viewall_vendorsjobs', order_fliter,this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } ) 
            .toPromise();
    }

	
	 
    acceptjoborder(joborders) : any {
        return this.http
            .post( BaseAPIURL + 'Vendor_api/vendors_accept_jobsorder', joborders, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    
	}
	
	rejectjoborder(joborders) : any {
        return this.http
            .post( BaseAPIURL + 'Vendor_api/vendor_reject_alljobs', joborders, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	
	
	completetjoborder(joborders) : any {
        return this.http
            .post( BaseAPIURL + 'Vendor_api/adminvendorjob_status', joborders, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	
	change_orderdate(orders) : any {
        return this.http
            .post( BaseAPIURL + 'Vendor_api/vendors_change_joborder', orders, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	
	
	
}
