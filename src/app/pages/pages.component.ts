import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import { CommonService } from './common/common.service';
import { Router } from '@angular/router';

@Component( {
    selector: 'pages',
    providers: [CommonService],
    template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <!-- <ba-content-top></ba-content-top> -->
        <router-outlet></router-outlet>
      </div>
    </div>
     <footer class="al-footer clearfix">
      <div class="al-footer-right" translate>{{'general.created_with'}}  <a href="http://logimaxindia.com" target="_blank" class="al-logo clearfix"><img src="{{ ( 'logimax' | baCompanyPicture ) }}"></a></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy;  <span href="#" translate>{{'general.senco'}}</span>  2017</div>
       <!--  <ul class="al-share clearfix">
          <li><i class="socicon socicon-facebook"></i></li>
          <li><i class="socicon socicon-twitter"></i></li>
          <li><i class="socicon socicon-google"></i></li>
          <li><i class="socicon socicon-github"></i></li>
        </ul> -->
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
} )
export class Pages {
	
	menuData;
	menu;

    constructor( private _menuService: BaMenuService, private router: Router, private commonservice: CommonService ) {
        if ( !commonservice.getIsloggedIn() ) {
            this.router.navigate( ['pages/login'] );
        }
    }
	


    ngOnInit() {		
		this.getUserPermission();			
		this.commonservice.getUserMenus().then(( data ) => {
			this.menuData = data;			     
			console.log(this.menuData);
			this._menuService.updateMenuByRoutes(this.menuData);	
       		// this._menuService.updateMenuByRoutes( <Routes>PAGES_MENU );  
		});		       
    }
	
	getUserPermission(){
		this.commonservice.getUserPermissionById().then(( data ) => {
			 if ( localStorage.getItem( 'currentUser' ) != null ) {
				let userdet = JSON.parse( localStorage.getItem( 'currentUser' ) );
				userdet.user_access = data ;
				localStorage.setItem( 'currentUser', JSON.stringify( userdet ) );
				console.log(JSON.parse( localStorage.getItem( 'currentUser' ) ));
				console.log(userdet);
			}  
		}); 	
	}
}
