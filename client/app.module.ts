import { NgModule }      from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routes';

import { HomeModule } from './modules/home/home.module';
import { PlaylistModule } from './modules/playlist/playlist.module';

import { TemplateComponent }   from './templates/template.component';
import { SideBarComponent }   from './templates/components/sidebar.partial.component';
import { HeaderPartialComponent }   from './templates/components/header.partial.component';
import { FooterPartialComponent }   from './templates/components/footer.partial.component';
import { LoginDialogComponent }   from './templates/components/login.dialog.component';

import 'hammerjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule, MdSidenavModule, MdListModule } from '@angular/material'

@NgModule({
    imports:      [
        routing,
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        HomeModule,
        PlaylistModule,
    ],
    declarations: [
        TemplateComponent,
        SideBarComponent,
        HeaderPartialComponent,
        FooterPartialComponent,
        LoginDialogComponent
    ],
    entryComponents: [ LoginDialogComponent ],
    bootstrap:    [ TemplateComponent ],
    providers: [
        {
            provide: LocationStrategy, 
            useClass: HashLocationStrategy
        }
    ]
})
export class AppModule { }