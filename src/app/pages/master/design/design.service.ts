import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../common/common.service';
@Injectable()
export class DesignService {

    constructor( private http: Http, private commonService: CommonService ) { }
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
    getVendrordata(): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_vendors', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
	
	
	getExpiredesign(): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/checkall_design_expireperiod', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
	
	
    saveadesign( designdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/create_design', designdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	
	
	  saveabulkdesign( designdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/create_bulkdesign', designdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	
    getDesignById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_design?id_design=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	getDesignPuritiesById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_designpurities?id_design=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
				
                return result;
            } )
            .toPromise();
    }
    getBOMByDesignId( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_bombydesign?id_design=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	
    updatedesign( designdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_design', designdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                //console.log(result);
                return result;
            } )
            .toPromise();
    }
	deletedesign( iddesign ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/delete_design', iddesign, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updatedesignbom( bomdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_bomdetails', bomdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    deleteproductimage( proimgid ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/delete_product_image', proimgid, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updatedefaultimg( proimgid ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_product_defaultimage', proimgid, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    getProductImages( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_productimages?id_product=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    getSelectItemData(): any {
      return this.http
            .get( BaseAPIURL + 'Master_api/readall_selectitems', this.commonService.getHeader() )
            .map(( response ) => {
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
   /* getSelectItemData() {
        return this.http.request( BaseAPIURL + 'Master_api/readall_selectitems', this.commonService.getHeader() )
            .map(( response ) => {
                let result = response.json();
                return result.responseData;
            } );
    }*/

	saveBom(bomdata):any {
		return this.http
            .post( BaseAPIURL + 'Master_api/create_bomdetails', bomdata, this.commonService.getHeader() )
            .map(( response ) => {
                 let result = response.json();
                return result; 
            } )
            .toPromise();
	}
	
    editBom( bomdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_bomdetails', bomdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	
	 deleteBom( bomdata ):any {
        return this.http
        .post( BaseAPIURL + 'Master_api/delete_bomdetail', bomdata, this.commonService.getHeader() )
        .map(( response ) => {
            // some response manipulation
            let result = response.json();
            return result;
        } )
        .toPromise();
    }
	
	getselectcustomer(): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_selectdesign', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
	
	saveCustomer(customerdata):any {
		return this.http
            .post( BaseAPIURL + 'Master_api/create_selectcustomerdetails', customerdata, this.commonService.getHeader() )
            .map(( response ) => {
                 let result = response.json();
                return result; 
            } )
            .toPromise();
	}
	
	
	editCustomer( customerdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_selectcustomerdetails', customerdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    } 
	
	
	getCustomerselectById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_customerselectdesign?id_design=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	
	
	 deleteCustomer( customerdata ):any {
        return this.http
        .post( BaseAPIURL + 'Master_api/delete_selectcustomerdetails', customerdata, this.commonService.getHeader() )
        .map(( response ) => {
            // some response manipulation
            let result = response.json();
            return result;
        } )
        .toPromise();
    }
	
	getmultidesignById( approve ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/updatedesign_status', approve ,this.commonService.getHeader() )
            .map(( response ) => {
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
	
	add_stockprocess( stock ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/add_stockprocess', stock ,this.commonService.getHeader() )
            .map(( response ) => {
                let result = response.json();
                return result;
            } )
            .toPromise();
    }

    getallusers(): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_allusers',this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
	
	
}
