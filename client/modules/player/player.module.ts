import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { PlayerComponent } from './components/player.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule
    ],
    exports: [PlayerComponent],
    declarations: [PlayerComponent],
    bootstrap: [PlayerComponent]
})

export class PlayerModule{}