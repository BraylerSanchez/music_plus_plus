import { NgModule }      from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TemplateComponent }   from './templates/template.component';
import { SideBarComponent }   from './templates/sidebar.component';
import { routing } from './app.routes';
import {ToasterModule} from 'angular2-toaster/angular2-toaster';

import { HomeModule } from './modules/home/home.module';
import { PlayerModule } from './modules/player/player.module';
import { PlaylistModule } from './modules/playlist/playlist.module';

//import { CanActivateViaAuthGuard } from './services/user/login.service';

@NgModule({
    imports:      [
        routing,
        BrowserModule,
        CommonModule,
        HomeModule,
        PlayerModule,
        PlaylistModule,
        ToasterModule
    ],
    declarations: [ TemplateComponent, SideBarComponent ],
    bootstrap:    [ TemplateComponent ],
    providers: [
        {
            provide: LocationStrategy, 
            useClass: HashLocationStrategy
        }
    ]
})
export class AppModule { }