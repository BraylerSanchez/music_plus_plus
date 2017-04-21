import { NgModule }      from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routes';

import { HomeModule } from './modules/home/home.module';
import { PlayerModule } from './modules/player/player.module';
import { PlaylistModule } from './modules/playlist/playlist.module';

import { TemplateComponent }   from './templates/template.component';
import { SideBarComponent }   from './templates/components/sidebar.component';
import { PlayingWidgetComponent }   from './templates/components/playing.widget.component';
import { PlaylistWidgetComponent }   from './templates/components/playlist.widget.component';

import 'hammerjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@angular/material'

@NgModule({
    imports:      [
        routing,
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        MaterialModule,
        HomeModule,
        PlayerModule,
        PlaylistModule,
    ],
    declarations: [
        TemplateComponent,
        SideBarComponent,
        PlayingWidgetComponent,
        PlaylistWidgetComponent ],
    bootstrap:    [ TemplateComponent ],
    providers: [
        {
            provide: LocationStrategy, 
            useClass: HashLocationStrategy
        }
    ]
})
export class AppModule { }