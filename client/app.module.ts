import { NgModule }      from '@angular/core';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TemplateComponent }   from './templates/template.component';
import { routing } from './app.routes';

import { HomeModule } from './modules/home/home.module';
import { PlayerModule } from './modules/player/player.module';

@NgModule({
    imports:      [
        routing,
        BrowserModule,
        HomeModule,
        PlayerModule
    ],
    declarations: [ TemplateComponent ],
    bootstrap:    [ TemplateComponent ],
    providers: [
        {provide: LocationStrategy, 
        useClass: HashLocationStrategy
    }]
})
export class AppModule { }