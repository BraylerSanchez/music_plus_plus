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
    `],
    template: `
      <h2 class="font-thin m-b">Search Results</h2>
      <div class="row row-sm">
        <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2"  *ngFor="let sound of sounds">
          <div class="item">
            <div class="pos-rlt">
              <div class="bottom">
                <span class="badge bg-info m-l-sm m-b-sm">03:20</span>
              </div>
              <div class="item-overlay opacity r r-2x bg-black">
                <div class="text-info padder m-t-sm text-sm">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star-o text-muted"></i>
                </div>
                <div class="center text-center m-t-n">
                  <a (click)="play(sound)"><i class="icon-control-play i-2x"></i></a>
                </div>
                <div class="bottom padder m-b-sm">
                  <a href="#" class="pull-right">
                    <i class="fa fa-heart-o"></i>
                  </a>
                  <a (click)="addToPlaylist($event, sound)">
                    <i class="fa fa-plus-circle"></i>
                  </a>
                </div>
              </div>
              <a href="#"><img style="height: 140px;"
                    [src]="sound.thumbnail" alt="" class="r r-2x img-full"
                    onError="this.src='assest/images/p0.jpg'"></a>
            </div>
            <div class="padder-v">
              <a class="text-ellipsis" mdTooltip="{{sound.title}}">{{sound.title}}</a>
              <a class="text-ellipsis text-xs text-muted" mdTooltip="{{sound.channel}}">{{sound.channel}}</a>
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
          this.sounds = result.sounds;
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