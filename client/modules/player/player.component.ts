import { Component } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';

import { Sound } from '../../interfaces/player/sound.interface';

@Component({
    selector: 'player',
    template: ``,
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