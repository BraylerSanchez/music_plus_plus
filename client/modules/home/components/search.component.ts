import { Component, NgZone, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PlayerService, onPlayMusic, onStopMusic } from '../../../services/player/player.service';
import { Sound } from '../../../interfaces/player/sound.interface';
import { IPlayList } from '../../../interfaces/playlist/playlist.interface';

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/share';

var addSoundToPlaylistTrigger: any;
export const onAddSoundToPlaylist: Observable<any> = new Observable( (observable) =>{
  addSoundToPlaylistTrigger = observable;
}).share();

var removeSoundToPlaylistTrigger: any;
export const onRemoveSoundToPlaylist: Observable<any> = new Observable( (observable) =>{
  removeSoundToPlaylistTrigger = observable;
}).share();

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
        height: 10%;
        width: 10%;
      }
      
      .video{
        color: #333333;
      }

      .media-object{
          border-radius: 5px !important;
      }
      .media-heading .title{
        cursor: pointer;
      }
      .media-heading .title small{
        display: none;
      }
      .media-heading:hover .title small{
        display: inline-block;
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
          <div class="video list-group-item" *ngFor="let video of videos">
            <div class="media-left">
              <span>
                <img id="
                " class="media-object" src="{{ video.thumbnail }}" alt="...">
              </span>
            </div>
            <div class="media-body text-left">
              <div class="media-heading">
                <h4 class="title" (click)="play(video)" >
                {{ video.title }} 
                <small >
                  click to play <i class="fa fa-play"></i>
                </small>
                <i *ngIf="!isAdded(video)" class="fa fa-plus pull-right" (click)="addFromPlaylist($event, video)"></i>
                <i *ngIf="isAdded(video)" class="fa fa-minus pull-right" (click)="removeFromPlaylist($event, video)"></i>
                <img class="glyphicon pull-right" *ngIf="video.id == currentSound.id" [ngClass]="{ 'playing': video.id == currentSound.id }">
                </h4>
              </div>
              <span  id="channel">{{ video.channel }}</span>
              <span class="pull-right">{{ video.dateAt | date }}</span>
              
            </div>
          </div>
        </div>
      </div>`,
      providers: [PlayerService]
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
      private ngZone: NgZone
    ){
      this.playlist = this.playlist || { name:'', description:'', sounds: [], createAt: new Date(), userAt: '', updateAt: new Date()}
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
    }
    
    addFromPlaylist(e, sound: Sound){
      this.playlist.sounds.push(sound);
      addSoundToPlaylistTrigger.next({
        sound: sound,
        playlist: this.playlist.name
      });
      e.stopPropagation();
    }
    
    removeFromPlaylist(e,  sound: Sound){
      for( var i = this.playlist.sounds.length-1; i>=0; i--) {
        if( this.playlist.sounds[i].id == sound.id){
          this.playlist.sounds.splice(i,1);
        }
      }
      removeSoundToPlaylistTrigger.next({
        sound: sound,
        playlist: this.playlist.name
      });
      e.stopPropagation();
    }
      
    handleKeyup(e){
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
      .subscribe( (videos) =>{
        this.videos = videos;
      })
    }
    
    play(video){
      this.playerService.getMusic(video);
    }
    
    isAdded(video){
      return this.playlist.sounds.some( (sound)=>{
        return sound.id == video.id
      })
    }
}