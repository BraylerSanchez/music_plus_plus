import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './playlist.routes';
import { PlayListComponent } from './list.component';
import { CreateListComponent } from './create.component';

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        routing
    ],
    declarations: [
        PlayListComponent,
        CreateListComponent
    ],
    bootstrap: [
        PlayListComponent
    ]
})
export class PlaylistModule{
    constructor(){}
}