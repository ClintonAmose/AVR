import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { encode } from 'punycode';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CommonService {

    private _header: Headers;
    private _username: string = 'lmxretail';
    private _password: string = 'lmx@2017';
    public UserName: string;
    public UserId: number;
    public DisplayName: string;
    public Loggedin: boolean = false;
    public itemsdetails = [];

    constructor( private http: Http, private toastr: ToastsManager ) {
        this._header = new Headers();
        this._header.append( 'Content-Type', 'application/json;charset=UTF-8' );
        /*let auth = $base64.encode("foo:bar"),
        this._header = {"Authorization": "Basic " + auth};*/
        this._header.append( 'Authorization', 'Basic ' + btoa( this._username + ':' + this._password ) );

		localStorage.setItem( 'mobileNoLen', '10' );
    }
    public updateLogin( username: string, userid: number, displayname: string, loggedin: boolean ) {
        this.UserName = username;
        this.UserId = userid;
        this.DisplayName = displayname;
        this.Loggedin = loggedin;
    }
    getDisplayName() {
        var currentUser = JSON.parse( localStorage.getItem( 'currentUser' ) );
        /*this.commonService.updateLogin(result.responsedata.username, result.
                responsedata.userid, result.responsedata.userdisplayname, true);*/
        return currentUser.userdisplayname;
    }
    public getHeader() {
        let options = new RequestOptions( { headers: this._header } );
        return options;
    }
    getAuthtoken(): any {
        return btoa( 'lmxretail:lmx@2017' );
    }
    getauthTokenPrefix(): any {
        return 'Basic';
    }
    getUserDetails() {
        if ( localStorage.getItem( 'currentUser' ) != null ) {
            return JSON.parse( localStorage.getItem( 'currentUser' ) );
        }
    }
    getIsloggedIn() {
        if ( localStorage.getItem( 'currentUser' ) != null ) {
            let userdet = JSON.parse( localStorage.getItem( 'currentUser' ) );
			console.log(userdet);
            return userdet.is_logged_in;
        } else {
            return false;
        }
    }
    getLoginId() {
        if ( localStorage.getItem( 'currentUser' ) != null ) {
            let userdet = JSON.parse( localStorage.getItem( 'currentUser' ) );
            return userdet.userid;
        } else {
            return 0;
        }
    }
    showAlertMSG( type, message ) {
        if ( type == 1 )
            this.toastr.success( message, 'Success!' );
        else if ( type == 2 )
            this.toastr.error( message, 'Oops!' )
        else if ( type == 3 )
            this.toastr.info( message )
        else if ( type == 4 )
            this.toastr.info( message, 'Alert!' )
    }

	getUserAccessByMenuPath(path){
		if ( localStorage.getItem( 'currentUser' ) != null ) {
            let userdet = JSON.parse( localStorage.getItem( 'currentUser' ) );
			let menupermission = userdet.user_access.filter(o => o.path == path);
            return menupermission;
        } else {
            return 0;
        }
	}

    getCountryData(): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_country', this.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    getStatebyCountryData( id ): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_state?id_country=' + id, this.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    getCitybyStateData( id ): any {
        //let options = new RequestOptions({ headers: this.commonService.getHeader() });
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_city?id_state=' + id, this.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    getAllBranch(): any {
        return this.http
            .get( BaseAPIURL + 'Adminaccount_api/readall_branch', this.getHeader() )
            .map(( response ) => {
                let result = response.json();
                return result.resposeData;
            } )
            .toPromise();
    }
    getAllBOMLineType(): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/bom_linetype', this.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result.responseData;
            } )
            .toPromise();
    }
    getCompanylogo(): any {
        return BaseURL + "assets/images/company/logo.png";
    }
    getDashboardOrders(): any {

    }
    getSelectItemData(): any {
        return this.http
            .get( BaseAPIURL + 'Master_api/readall_selectitems', this.getHeader() )
            .map(( response ) => {
                let result = response.json();
                this.itemsdetails = result.responseData;
            } )
            .toPromise();
    }

    getUserMenus(): any {
    	let userdet = JSON.parse( localStorage.getItem( 'currentUser' ) );
		let user_id = userdet.userid;
        return this.http
            .get( BaseAPIURL + 'Adminaccount_api/getUserMenus?id='+user_id, this.getHeader() )
            .map(( response ) => {
                let result = response.json();
                 return  result.responseData;
            } )
            .toPromise();
    }

	getUserPermissionById(): any {
    	let userdet = JSON.parse( localStorage.getItem( 'currentUser' ) );
		let user_id = userdet.userid;
        return this.http
            .get( BaseAPIURL + 'Adminaccount_api/read_useraccessById?id='+user_id, this.getHeader() )
            .map(( response ) => {
                let result = response.json();
                 return  result.responseData;
            } )
            .toPromise();
    }

	/* getUserMenus(){
		if ( localStorage.getItem( 'currentUser' ) != null ) {
            let user
            return menu;
        } else {
            return 0;
        }
	} */

    getItemData(): any {
        return this.itemsdetails;
    }


}

/* export const BaseAPIURL = 'http://localhost/winjewel/mehtaapi/index.php/';
 export const BaseURL = 'http://localhost/winjewel/mehtaapi/'; */
//  export const BaseAPIURL = 'http://localhost/jaigulab_new/index.php/';
//  export const BaseURL = 'http://localhost/jaigulab_new/';

export const BaseAPIURL = 'https://ecatalogadmin.avrswarnamahalapp.com/winjewel_api/index.php/';
export const BaseURL = 'https://ecatalogadmin.avrswarnamahalapp.com/winjewel_api/';

export const LogoURL = BaseURL + "assets/images/company/logo.png";
export const PoweredbyURL = BaseURL + "assets/images/company/poweredby.png";
