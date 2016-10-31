import { Component} from '@angular/core';
import {Http, Headers, Response, ResponseOptions} from '@angular/http'
import 'rxjs/add/operator/map'

declare var window: any;
const headers = new ResponseOptions({
    headers: new Headers({
        'Content-Type': 'application/json'
    })
})


@Component({
    styles: [`
      .home .search-text{
        background-color: #333333 !important;
        color: white !important;
      }
    `]
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
          <a *ngFor="let video of videos" class="list-group-item" >{{video.snippet.title}}
            <i (click)="play(video)" class="glyphicon glyphicon-play pull-right"></i>
          </a>
        </div>
      </div>`
})
export class HomeComponent{
    private apiKey: string = 'AIzaSyDsnjiL2Wexp-DgCKMMQF7VyL2xzZLMFaY';
    private apiPart: string = 'snippet';
    private audioContext:any;
    private queryString:string;
    private videos: Array<any>;
    private maxResults = 20;
    constructor(
        private http: Http
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
    
    search(){
      if( this.queryString.length <=0){
        alert('Insert text to search.');
        return;
      }
        this.http.get(`https://www.googleapis.com/youtube/v3/search?part=
        ${this.apiPart}
        &maxResults=${this.maxResults}&q=${this.queryString}&key=${this.apiKey}`, headers )
        .map( (res) => res.json())
        .subscribe( (res) =>{
            console.log(res.items);
            this.videos = res.items;
        })
    }
    process(Data) {
        var source = this.audioContext.createBufferSource(); // Create Sound Source
        this.audioContext.decodeAudioData(Data, (buffer) => {
            source.buffer = buffer;
            source.connect(this.audioContext.destination); 
            source.start(this.audioContext.currentTime);
        })
    }

    play(video){
        var request = new XMLHttpRequest();
        request.open("GET", `/api/stream/play/${video.id.videoId}`, true); 
        request.responseType = "arraybuffer"; 
        
        request.onload = () => {
            var Data = request.response;
            this.process(Data);
        };
        
        request.send();
    }
 }