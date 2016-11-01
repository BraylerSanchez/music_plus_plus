import { Component} from '@angular/core';
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
    styles: [`
      .home .search-button{
        background-color: #333333 !important;
        color: white !important;
      }
    `],
    template: `
      <div class="inner cover">
        <form class="home">
          <div class="input-group input-group-lg">
            <input class="form-control" (keyup)="handleKeyup($event)" placeholder="Search music on youtube" name="queryString" [(ngModel)]="queryString" aria-describedby="sizing-addon1"> 
            <span class="input-group-btn">
              <button class="btn btn-default search-button" type="button" (click)="search()">Go!</button>
            </span>
          </div>
        </form>
        <div class="list-group">
          <a class="list-group-item" >Video Id: {{currentSound.id}}</a>
          <a *ngFor="let video of videos" class="list-group-item" >{{video.title}}
            <i *ngIf="currentSound.id != video.id" (click)="play(video)" class="glyphicon glyphicon-play pull-right"></i>
            <i *ngIf="currentSound.id == video.id" (click)="stop(video)" class="glyphicon glyphicon-pause pull-right"></i>
          </a>
        </div>
      </div>`,
      providers: [PlayerService]
})
export class HomeComponent{
    private apiKey: string = 'AIzaSyDsnjiL2Wexp-DgCKMMQF7VyL2xzZLMFaY';
    private apiPart: string = 'snippet';
    private audioContext:any;
    private queryString:string;
    private videos: Array<any>;
    private currentSound: any = {
      id: ''
    };
    private maxResults = 20;
    constructor(
        private http: Http,
        private playerService: PlayerService 
    ){
      this.queryString = '';
      this.videos = [];
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();

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