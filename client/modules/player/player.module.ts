import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { PlayerComponent } from './player.component'
@NgModule({
    imports: [
        BrowserModule,
        CommonModule
    ],
    declarations: [PlayerComponent],
    bootstrap: [PlayerComponent]
})

export class PlayerModule{}