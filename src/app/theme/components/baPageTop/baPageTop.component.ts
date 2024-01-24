import { Component } from '@angular/core';
import { CommonService, BaseAPIURL } from '../../../pages/common/common.service';
import { Router } from '@angular/router';
import { GlobalState } from '../../../global.state';
import { Observable } from 'rxjs/Rx';

@Component( {
    selector: 'ba-page-top',
    templateUrl: './baPageTop.html',
    styleUrls: ['./baPageTop.scss'],
    providers: [CommonService]
} )
export class BaPageTop {

    public isScrolled: boolean = false;
    public isMenuCollapsed: boolean = false;
    public compName: string = 'Senco';
    public displayName: string;

    constructor( private _state: GlobalState, private router: Router, private commonService: CommonService ) {
        this._state.subscribe( 'menu.isCollapsed', ( isCollapsed ) => {
            this.isMenuCollapsed = isCollapsed;
        } );
        this.displayName = commonService.getDisplayName();
        Observable.interval( 1000 * 60 ).subscribe( x => {
            commonService.getDashboardOrders();
        } );
    }

    public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged( 'menu.isCollapsed', this.isMenuCollapsed );
        return false;
    }

    public scrolledChanged( isScrolled ) {
        this.isScrolled = isScrolled;
    }
    public userlogout() {
        console.log( "Logout" );
        this.commonService.updateLogin( "", 0, "", false );
        let curuserdet = JSON.parse( localStorage.getItem( 'currentUser' ) );
        curuserdet.is_logged_in = false;
        localStorage.setItem( 'currentUser', JSON.stringify( curuserdet ) );
        this.router.navigate( ['pages/login'] );
    }
}
