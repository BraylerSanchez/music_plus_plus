import { Component, NgZone, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PlayerService, onPlayMusic, onStopMusic } from '../../../services/player/player.service';
import { Sound } from '../../../interfaces/player/sound.interface';
import { IPlayList } from '../../../interfaces/playlist/playlist.interface';
import {MdSnackBar} from '@angular/material';

import { PlaylistService, onPlaylistChange} from '../../../services/playlist/playlist.service';

@Component({
    selector: 'search',
    styles: [`
      .search-input{
        margin-top: 15px;
        width: 100%;
      }
      .music-container{
        overflow-y: auto;
        max-height: 450px;
      }
      .card-img{
        margin: 0;
        width: 100%;
        height: 90px;
      }
      .music-card{    
        width: 175px;
        padding: 10px;
        margin: 10px;
        display: inline-block;
        height: 200px;
      }`],
    template: `
    
      <md-input-container class="search-input">
        <input mdInput
         (keyup)="handleKeyup($event)" 
         name="queryString" [(ngModel)]="queryString"
          #searchInput placeholder="Search music and press ENTER" />
      </md-input-container>
      
      <div class="music-container">
        <md-card class="music-card" *ngFor="let video of videos; let i = index">
          <md-card-header>
            <md-card-title class="text-ellipsis" mdTooltip="{{video.channel}}">{{ video.channel }}</md-card-title>
          </md-card-header>
          <img md-card-image class="card-img" [src]="video.thumbnail">
          <md-card-content style="margin-bottom: 5px;">
            <p class="text-ellipsis" mdTooltip="{{video.title}}" >{{ video.title}}</p>
            {{video.dateAt | date}}
          </md-card-content>
          <md-card-actions>
            <button md-button color="primary" (click)="play(video)"> 
              <md-icon>play_arrow</md-icon>
            </button>
            <button md-button (click)="addToPlaylist($event, video)">
              <md-icon>playlist_add</md-icon>
            </button>
          </md-card-actions>
        </md-card>
      </div>`,
      providers: [PlayerService, PlaylistService]
})
export class SearchComponent{
    @Input()
    playlist: IPlayList;
    
    private queryString:string;
    private videos: Array<Sound>;
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
      this.videos = [];
      this.router.params.subscribe( (params) =>{
        if( params['query'] != '0'){
          this.queryString = params['query'] || '';
          if(this.queryString != ''){
            this.search();
          }
        }
      })
      
      onPlayMusic
         .subscribe( (response) => {
            this.currentSound = response['details'];
      });
      onStopMusic
       .subscribe( (sound) => {
            this.currentSound = sound;
            this.ngZone.run(()=>{});
      });
      onPlaylistChange.subscribe( (playlist) =>{
        this.playlist = playlist;
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
    
    handleKeyup(e:any){
        if( e.keyCode == 13){
          this.search();
        }  
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
          this.videos = result.sounds;
        }
      })
    }
    
    play(sound:Sound){
      let playlist = this.playlistService.getCurrentPlaylist();
      this.playlistService.addSoundToPlaylist({
        sound: sound,
        playlist: playlist.name
      });
      this.playerService.getMusic(playlist.sounds.length, sound);
        this.snackBar.open(`${sound.title} now playing`, 'Music', {
          duration: 1500,
        });
    }
}