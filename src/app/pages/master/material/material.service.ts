import { Injectable } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../common/common.service';
import { Http } from '@angular/http';
@Injectable()
export class MaterialService {

    constructor( private commonService: CommonService, private http: Http ) { }
    getMaterialData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_material', this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    getMaterialById( id ): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/read_material?id=' + id, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    saveMaterial( materialdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/create_material', materialdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    updateMaterial( materialdata ): any {
        return this.http
            .post( BaseAPIURL + 'Master_api/update_material', materialdata, this.commonService.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }
    deleteMaterial(material):any{
        return this.http
        .post( BaseAPIURL + 'Master_api/delete_material', material, this.commonService.getHeader() )
        .map(( response ) => {
            // some response manipulation
            let result = response.json();
            return result;
        } )
        .toPromise();
    }
}
