import { NgModule } from '@angular/core';
import { routing } from './home.routes';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        FormsModule,
        CommonModule, 
        routing],
    declarations: [HomeComponent],
    bootstrap: [HomeComponent]
})

export class HomeModule{}