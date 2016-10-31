
import { Component, ElementRef  } from '@angular/core';
import {Http, Headers, Response, ResponseOptions} from '@angular/http'
import 'rxjs/add/operator/map'

const headers = new ResponseOptions({
    headers: new Headers({
        'Content-Type': 'application/json'
    })
})

@Component({
    selector: 'app',
    template: `<h1>Stream app</h1>
        <input type="search"  />
        <a (click)="seach()" >
            buscar
        </a>
        <div>
            <ul>
                <li *ngFor="let video of videos">
                    <img src="{{video.snippet.thumbnails.medium.url}}"/>{{video.snippet.title}}
                    <a (click)="play(video)">play</a>
                </li>
            </ul>
        </div>
    `
})
export class AppComponent {
    private apiKey: string = 'AIzaSyDsnjiL2Wexp-DgCKMMQF7VyL2xzZLMFaY';
    private apiPart: string = 'snippet';
    private audioContext:any;
    
    private videos: Array<any>;
    constructor(
        private http: Http
        ,private element: ElementRef ){
            this.videos = [];
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
    }
    seach(){
        this.http.get(`https://www.googleapis.com/youtube/v3/search?part=${this.apiPart}&q=${this.element.nativeElement.children[1].value}&key=${this.apiKey}`, headers )
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