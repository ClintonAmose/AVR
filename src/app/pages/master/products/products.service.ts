import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommonService, BaseAPIURL } from '../../common/common.service';

@Injectable()
export class ProductsService {

    constructor( private http: Http, private commonService: CommonService ) { }
    getAuthtoken(): any {
        return btoa( 'lmxretail:lmx@2017' );
    }
    getauthTokenPrefix(): any {
        return 'Basic';
    }
    getProductData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_product', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    saveaproduct( catdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/create_product', catdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    getProductById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_product?id_product=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updateproduct( prodata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_product', prodata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    deleteproduct( proid ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/delete_product', proid, this.commonService.getHeader() )
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
    getProductImages(id):any{
        return this.http
        .get( BaseAPIURL + 'Master_api/read_productimages?id_product=' + id, this.commonService.getHeader() )
        .map(( response ) => {
            // some response manipulation
            let result = response.json();
            return result;
        } )
        .toPromise();
    }


}
