import { Injectable } from '@angular/core'
import {Http, Headers, Response, ResponseOptions} from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { Sound } from '../../interfaces/player/sound.interface'

declare var window: any;
const headers = new ResponseOptions({
    headers: new Headers({
        'Content-Type': 'application/json'
    })
})

@Injectable()
export class PlayerService{
    public currentSound: any;
    public currentVideo: Sound;
    public isPlaying: boolean;
    public isOnList: boolean;
    private apiPart: string;
    private maxResults = 20;
    private apiKey: string;
    
    private playSound: Observable<Sound>;
    private playSoundObserbable: any;
    
    private stopSound: Observable<Sound>;
    private stopSoundObserbable: any;
    
    private audioContext:any;
    
    constructor(
        private http: Http
    ){
        this.isPlaying = false;
        this.isOnList =false;
        this.apiPart = 'snippet';
        this.apiKey = 'AIzaSyDsnjiL2Wexp-DgCKMMQF7VyL2xzZLMFaY';
        
        this.playSound = new Observable( (observable) =>{
            this.playSoundObserbable = observable;
        })
        
        this.stopSound = new Observable( (obs) =>{
            this.stopSoundObserbable = obs; 
        })
        
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
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
    
    onStopMusic():Observable<any>{
        this.currentSound.stop();
        this.isPlaying = false;
        window.setTimeout( () =>{
            this.stopSoundObserbable.next(this.currentVideo);
        }, 0);
        
        return this.stopSound;
    }
    
    onPlayMusic(video?: Sound):Observable<Sound>{
        if( video != undefined){
            if( this.currentSound != undefined && video.id == this.currentVideo.id){
                this.currentSound.start();
            }else{
                if(this.currentSound ){
                this.currentSound.stop();
                }
                var request = new XMLHttpRequest();
                request.open("GET", `/api/stream/play/${video.id}`, true); 
                request.responseType = "arraybuffer"; 
                
                request.onload = () => {
                    this.currentSound = this.audioContext.createBufferSource();
                    this.audioContext.decodeAudioData(request.response, (buffer) => {
                        this.currentSound.buffer = buffer;
                        this.currentSound.connect(this.audioContext.destination); 
                        this.currentSound.start(this.audioContext.currentTime);
                        this.currentVideo = video;
                        this.isPlaying = true;
                        this.playSoundObserbable.next( video )
                    })
                };
                
                request.send();
            }
        }
        return this.playSound;
    }
}