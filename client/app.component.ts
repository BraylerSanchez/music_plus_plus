
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
                    <a (click)="play()">play</a>
                </li>
            </ul>
        </div>
    `
})
export class AppComponent {
    private apiKey: string = 'AIzaSyDsnjiL2Wexp-DgCKMMQF7VyL2xzZLMFaY';
    private apiPart: string = 'snippet';

    private videos: Array<any>;
    constructor(
        private http: Http
        ,private element: ElementRef ){
            this.videos = [];
    }
    seach(){
        this.http.get(`https://www.googleapis.com/youtube/v3/search?part=${this.apiPart}&q=${this.element.nativeElement.children[1].value}&key=${this.apiKey}`, headers )
        .map( (res) => res.json())
        .subscribe( (res) =>{
            console.log(res.items);
            this.videos = res.items;
        })
    }
    play(video){
        this.http.get('/api/stream/play/' + video.id.videoId, headers )
        .map( (res) => res.json())
        .subscribe( (res) =>{
            console.log(res.items);
            this.videos = res.items;
        })
    }
 }