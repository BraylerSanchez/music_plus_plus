import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { PlayerComponent } from './player.component'

import { PlayerService } from '../../services/player/player.service';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule
    ],
    providers: [PlayerService],
    declarations: [PlayerComponent],
    bootstrap: [PlayerComponent]
})

export class PlayerModule{}