import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';
import { CommonComponent } from './common/common.component';


@NgModule( {
    imports: [CommonModule, AppTranslationModule, NgaModule, routing],
    declarations: [Pages, CommonComponent]
} )
export class PagesModule {
}
