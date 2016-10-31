import { NgModule }      from '@angular/core';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TemplateComponent }   from './templates/template.component';
import { routing } from './app.routes';

import { HomeModule } from './modules/home/home.module';

@NgModule({
    imports:      [
        routing,
        BrowserModule,
        HomeModule
    ],
    declarations: [ TemplateComponent ],
    bootstrap:    [ TemplateComponent ],
    providers: [
        {provide: LocationStrategy, 
        useClass: HashLocationStrategy
    }]
})
export class AppModule { }