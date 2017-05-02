import { Component, NgZone, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PlayerService, onPlayMusic, onStopMusic } from '../../../services/player/player.service';
import { Sound } from '../../../interfaces/player/sound.interface';
import { IPlayList } from '../../../interfaces/playlist/playlist.interface';
import {MdSnackBar} from '@angular/material';

import { PlaylistService, onPlaylistChange} from '../../../services/playlist/playlist.service';

@Component({
    selector: 'search',
    templateUrl: `client/modules/home/components/search.component.html`,
      providers: [PlayerService, PlaylistService]
})
export class SearchComponent{
    @Input()
    playlist: IPlayList;
    
    private queryString:string;
    private sounds: Array<Sound>;
    private currentSound: any = {
      id: ''
    };
    
    constructor(
      private playerService: PlayerService,
      private router: ActivatedRoute,
      private ngZone: NgZone,
      private playlistService: PlaylistService,
      private snackBar: MdSnackBar
    ){
      this.playlist = this.playlist || this.playlistService.getCurrentPlaylist();
      this.queryString = '';
      this.sounds = [];
      this.router.params.subscribe( (params) =>{
        if( params['query'] != '0'){
          this.queryString = params['query'] || '';
          if(this.queryString != ''){
            this.search();
          }
        }
      })
    }
    
    addToPlaylist(e:any, sound: Sound){
      this.playlistService.addSoundToPlaylist({
        playlist: this.playlist.name,
        sound: sound
      });
      
      this.snackBar.open(`${sound.title} added to play list`, 'Cerrar', {
        duration: 1500,
      });
      e.stopPropagation();
    }
    
    search(): void{
      if( this.queryString.length <=0){
        this.snackBar.open(`Insert text to search`, 'Error', {
          duration: 1500,
        });
        return;
      }
      this.playerService.search(this.queryString)
      .subscribe( (result) =>{
        if(result.status == true){
          this.sounds = result.sounds;
        }
      })
    }
    
    play(sound:Sound){
      let playlist = this.playlistService.getCurrentPlaylist();
      this.playlistService.addSoundToPlaylist({
        sound: sound,
        playlist: playlist.name,
        to_play: true
      });
      this.snackBar.open(`${sound.title} now playing`, 'Music', {
        duration: 5000,
      });
    }
}