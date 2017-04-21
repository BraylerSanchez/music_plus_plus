import { Component, NgZone, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PlayerService, onPlayMusic, onStopMusic } from '../../../services/player/player.service';
import { Sound } from '../../../interfaces/player/sound.interface';
import { IPlayList } from '../../../interfaces/playlist/playlist.interface';

import { PlaylistService, onPlaylistChange} from '../../../services/playlist/playlist.service';

@Component({
    selector: 'search',
    styles: [`
      .search-input{
        margin-top: 15px;
        width: 80%;
      }
      .music-container{
        overflow-y: auto;
      }
      .music-card{
          width: 256px;
          margin: 10px;
          display: inline-block;
          max-height: 256px;
          height: 256px;
      }`],
    template: `
    
      <md-input-container class="search-input">
        <input mdInput
         (keyup)="handleKeyup($event)" 
         name="queryString" [(ngModel)]="queryString"
          #searchInput placeholder="Search music and press ENTER" />
      </md-input-container>
      
      <div class="music-container">
        <h3 md-subheader>Search results</h3>
        <md-card class="music-card" *ngFor="let video of videos; let i = index">
          <md-card-header>
            <md-card-title title="{{ video.title }}">{{ video.title }}</md-card-title>
            <md-card-subtitle>{{ video.dateAt | date }}</md-card-subtitle>
          </md-card-header>
          <img md-card-image [src]="video.thumbnail">
          <md-card-content>
            <p>{{ video.description}}</p>
          </md-card-content>
          <md-card-actions>
            <button md-button (click)="play(video)">Play now</button>
            <button md-button (click)="addToPlaylist()">Add to playlist</button>
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
      private playlistService: PlaylistService
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
      //this.toasterService.pop('success', 'Added music to playlist', sound.title);
      e.stopPropagation();
    }
    
    handleKeyup(e:any){
        if( e.keyCode == 13){
          this.search();
        }  
    }
    
    search(): void{
      if( this.queryString.length <=0){
        alert('Insert text to search.');
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
      //this.toasterService.pop('success', 'Playing Music', sound.title);
    }
}