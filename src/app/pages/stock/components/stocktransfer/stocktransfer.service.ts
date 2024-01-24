import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../../common/common.service';
import { CompleterCmp, CompleterData, CompleterService, CompleterItem, RemoteData } from 'ng2-completer';
import { Http } from '@angular/http';
@Injectable()
export class StockTransferService {

    constructor( private commonService: CommonService, private http: Http ) { }
     getDesignData(): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_design', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }

	getDesignPuritiesById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_designwise?id_design=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();

                return result;
            } )
            .toPromise();
    }


	 getBranchData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Adminaccount_api/readall_branch', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.resposeData;
            } )
            .toPromise();
    }

	 getPurityData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_purity', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }

	getVendorData(): any {
        return this.http
            .get( BaseAPIURL + 'Vendor_api/read_karigaruser', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
	getsku_tranferstock(): any {
        return this.http
            .get( BaseAPIURL + 'Customer_api/sku_stocktransfer', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }

	 saveskustock( orderdata ): any {
             return this.http
            .post( BaseAPIURL + 'Customer_api/create_skustock_order', orderdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }

	 getSkudesignById( orderdata ): any {
        return this.http
            .post( BaseAPIURL + 'Customer_api/read_skuwise_design',orderdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }

	updateBranchDelivery(orders) :any
	 {     
		 return this.http
            .post( BaseAPIURL + 'Customer_api/update_transferstatus',orders,this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
	 }


}
