import { NgModule }      from '@angular/core';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TemplateComponent }   from './templates/template.component';
import { routing } from './app.routes';
import {ToasterModule} from 'angular2-toaster/angular2-toaster';

import { HomeModule } from './modules/home/home.module';
import { PlayerModule } from './modules/player/player.module';
import { PlaylistModule } from './modules/playlist/playlist.module';

@NgModule({
    imports:      [
        routing,
        BrowserModule,
        HomeModule,
        PlayerModule,
        PlaylistModule,
        ToasterModule
    ],
    declarations: [ TemplateComponent ],
    bootstrap:    [ TemplateComponent ],
    providers: [
        {provide: LocationStrategy, 
        useClass: HashLocationStrategy
    }]
})
export class AppModule { }