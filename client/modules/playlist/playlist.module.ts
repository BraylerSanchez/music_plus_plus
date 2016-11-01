import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './playlist.routes';
import { PlayListComponent } from './list.component';

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        FormsModule,
        CommonModule, 
        routing
    ],
    declarations: [
        PlayListComponent
    ],
    bootstrap: [
        PlayListComponent
    ]
})
export class PlaylistModule{
    constructor(){}
}