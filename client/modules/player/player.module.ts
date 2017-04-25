import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { PlayerComponent } from './components/player.component';
import { MaterialModule, MdIconModule } from '@angular/material';
@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        MaterialModule,
        MdIconModule
    ],
    exports: [PlayerComponent],
    declarations: [PlayerComponent],
    bootstrap: [PlayerComponent]
})

export class PlayerModule{}