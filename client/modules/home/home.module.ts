import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './home.routes';

import { HomeComponent } from './components/home.component';
import { SearchComponent } from './components/search.component';
import { MdInputModule, MdCardModule, MdButtonModule, MdIconModule } from '@angular/material';

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        FormsModule,
        CommonModule,
        MdInputModule,
        MdButtonModule,
        MdCardModule,
        MdIconModule,
        routing],
      exports: [
          SearchComponent
      ],
    declarations: [HomeComponent, SearchComponent],
    bootstrap: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HomeModule{}