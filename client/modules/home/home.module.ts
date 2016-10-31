import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './home.routes';

import { HomeComponent } from './home.component';
import { SearchComponent } from './search.component'

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        FormsModule,
        CommonModule, 
        routing],
    declarations: [HomeComponent, SearchComponent],
    bootstrap: [HomeComponent]
})

export class HomeModule{}