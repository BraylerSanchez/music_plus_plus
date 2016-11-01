import { Component } from '@angular/core';
import {Http, Headers, Response, ResponseOptions} from '@angular/http'
import 'rxjs/add/operator/map';
import { PlayerService } from '../../services/player/player.service';

declare var window: any;
const headers = new ResponseOptions({
    headers: new Headers({
        'Content-Type': 'application/json'
    })
})


@Component({
    styles: 
    [`
    .home .search-button{
        background-color: #333333 !important;
        color: white !important;
      }
      #title{
        color: #333333;
      }
      }
    #channel{
            color: #ccc !important;
        }
    #thumbnail{
            border-radius: 5px;
        }
    `],
    template: `
      <div class="inner cover">
        <form class="home">
          <div class="input-group input-group-lg">
            <input class="form-control" placeholder="Search music on youtube" name="queryString" [(ngModel)]="queryString" aria-describedby="sizing-addon1"> 
            <span class="input-group-btn">
              <button class="btn btn-default search-button" type="button" (click)="search()">Go!</button>
            </span>
          </div>
        </form>
        
  <div class="list-group">
    <div class="list-group-item" *ngFor="let video of videos">
      <div class="media-left">
        <span>
          <img id="thumbnail" class="media-object" src="{{ video.thumbnail }}" alt="...">
        </span>
      </div>
      <div class="media-body">
        <h4 id="title" class="media-heading">{{ video.title }}</h4>
        <span id="channel">{{ video.channel }}</span>
        <i (click)="play(video)" class="glyphicon glyphicon-play pull-right"></i>
      </div>
    </div>
  </div>
        
      </div>`,
      providers: [PlayerService]
})
export class SearchComponent{
    private maxResults = 20;
    private audioContext:any;
    private queryString:string;
    private videos: Array<any>;
    private currentSound: any = {
      id: ''
    };
    
    constructor(private playerService: PlayerService){
      this.queryString = '';
      this.videos = [];
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
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
      this.playerService.onPlayMusic(video)
        .subscribe( (sound) =>{
            this.currentSound = sound;
        })
    }
    stop(){
      this.playerService.onStopMusic()
        .subscribe( () =>{
          
        })
    }
}
///

