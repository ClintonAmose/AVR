import { Component, ViewContainerRef } from '@angular/core';
import * as $ from 'jquery';

import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';


/*
 * App Component
 * Top Level Component
 */
@Component( {
    selector: 'app',
    styleUrls: ['./app.component.scss'],
    template: `
    <main [class.menu-collapsed]="isMenuCollapsed" baThemeRun>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
  `
} )
export class App {

    isMenuCollapsed: boolean = false;
    private viewContainerRef: ViewContainerRef;
    constructor( private _state: GlobalState,
        private _imageLoader: BaImageLoaderService,
        private _spinner: BaThemeSpinner,
        viewContainerRef: ViewContainerRef,
        private themeConfig: BaThemeConfig,
        public toastr: ToastsManager, ) {

        themeConfig.config();

        this._loadImages();
        this.viewContainerRef = viewContainerRef;
        this.toastr.setRootViewContainerRef( viewContainerRef );


        this._state.subscribe( 'menu.isCollapsed', ( isCollapsed ) => {
            this.isMenuCollapsed = isCollapsed;
        } );
    }

    public ngAfterViewInit(): void {
        // hide spinner once all loaders are completed
        BaThemePreloader.load().then(( values ) => {
            this._spinner.hide();
        } );
    }

    private _loadImages(): void {
        // register some loaders
        BaThemePreloader.registerLoader( this._imageLoader.load( '/assets/img/sky-bg.jpg' ) );
    }

}
