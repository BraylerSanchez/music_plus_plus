import { Component } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';

import { Sound } from '../../interfaces/player/sound.interface';

@Component({
    selector: 'player',
    styles: [ `
        .player{
            position:absolute;
            z-index: 1000;
            bottom: 0;
            left: 0;
            width: 100%;
        }
    `],
    template: `
    <div class="col-lg-12 no-padding-l-r player">
        <h1>Hola mundo</h1>
    </div>`,
    providers: [PlayerService]
})
export class PlayerComponent{
    private currentSound: Sound;
    constructor(private playerService: PlayerService ){
        this.playerService.onPlayMusic()
         .subscribe( (sound) => {
            this.currentSound = sound;
        });
    }
}