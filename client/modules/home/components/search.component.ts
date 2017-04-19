import { Component, NgZone, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PlayerService, onPlayMusic, onStopMusic } from '../../../services/player/player.service';
import { Sound } from '../../../interfaces/player/sound.interface';
import { IPlayList } from '../../../interfaces/playlist/playlist.interface';

import { PlaylistService, onPlaylistChange} from '../../../services/playlist/playlist.service';

@Component({
    selector: 'search',
    styles: 
    [`
      .home .search-button{
        background-color: #333333 !important;
        color: white !important;
      }
      
      .playing{
        content:url("assest/images/equalizer.gif");
        height: 50%;
        width: 10%;
        margin-top: -15px;
      }
      
      .video{
        color: #333333;
      }

      .media-object{
          border-radius: 5px !important;
      }
      .media-heading .title{
        cursor: pointer;
        width: 70%;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .addButton{
        position: absolute;
        width: 80%;
      }
      .dateText{
        position:absolute;
        bottom:30;
        right:10;
      }
    `],
    template: `
      <div class="inner cover">
        <form class="home">
          <div class="input-group input-group-lg">
            <input class="form-control" (keyup)="handleKeyup($event)" placeholder="Search music on youtube" name="queryString" [(ngModel)]="queryString" aria-describedby="sizing-addon1"> 
            <span class="input-group-btn">
              <i class="fa fa-search btn btn-default search-button" type="button" (click)="search()"></i>
            </span>
          </div>
        </form>
        <div class="list-group">
          <div class="video list-group-item" *ngFor="let video of videos; let i = index">
            <div class="media-left">
              <span>
                <img id="
                " class="media-object" src="{{ video.thumbnail }}" alt="...">
              </span>
            </div>
            <div class="media-body text-left">
              <div class="media-heading">
                <div class="col-xs-10 col-sm-11 col-md-11 col-lg-11 no-padding-r">
                  <h4 (click)="play(video)" title="{{ video.title }}" class="title no-padding-r" >
                    {{ video.title }}
                  </h4>
                </div>
                <div class="col-xs-2 col-sm-1 col-md-1 col-lg-1 text-right no-padding-l addButton">
                  <a class=" btn btn-success btn-sm" (click)="addToPlaylist($event, video)">
                    <i class="fa fa-plus"></i>
                  </a>
                </div>
              </div>
              <span class="pull-right dateText">{{ video.dateAt | date }}</span>
            </div>
          </div>
        </div>
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