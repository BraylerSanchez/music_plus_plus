import { Injectable } from '@angular/core'
import {Http, Headers, Response, ResponseOptions} from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/share';

import { Sound } from '../../interfaces/player/sound.interface'

const headers = new ResponseOptions({
    headers: new Headers({
        'Content-Type': 'application/json'
    })
})

var playSoundObserbable: any;
export const onPlayMusic: Observable<Sound> = new Observable( (observable) =>{
    playSoundObserbable = observable;
    return () => {}
}).share();

var stopSoundObserbable: any;
export const onStopMusic: Observable<Sound> = new Observable( (observable) =>{
    stopSoundObserbable = observable; 
}).share();

var onSuspendMusicTrigger: any;
export const onSuspendMusic: Observable<Sound> = new Observable( (observable) =>{
    onSuspendMusicTrigger = observable; 
}).share();

@Injectable()
export class PlayerService{
    private apiPart: string;
    private maxResults = 20;
    private apiKey: string;
    
    constructor(
        private http: Http
    ){
        this.apiPart = 'snippet';
        this.apiKey = 'AIzaSyDsnjiL2Wexp-DgCKMMQF7VyL2xzZLMFaY';
    }
    
    search(query:string){
        return this.http.get(`https://www.googleapis.com/youtube/v3/search?part=${this.apiPart}&maxResults=${this.maxResults}&q=${query}&key=${this.apiKey}`, headers )
            .map( res =>
                res.json().items.map( (video) => {
                    return {
                        title: video.snippet.title,
                        description:video.snippet.description,
                        channel: video.snippet.channelTitle,
                        thumbnail: video.snippet.thumbnails.default.url,
                        dateAt: video.snippet.publishedAt,
                        id: video.id.videoId
                    }
                })
            )
    }
    
    stopMusic(video){
        stopSoundObserbable.next(video);
    }
    
    getMusic(video: Sound ){
        var request = new XMLHttpRequest();
        request.open("GET", `/api/v1/youtube/convert/${video.id}`, true); 
        request.responseType = "arraybuffer"; 
        
        request.onload = () => {
            playSoundObserbable.next( {
                details: video,
                buffer: request.response
            });
        };
        request.send();
    }
    suspendMusic(){
        onSuspendMusicTrigger.next();
    }
}