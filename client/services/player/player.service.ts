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
export const onPlayMusic: Observable<Sound> = new Observable( (observable:any) =>{
    playSoundObserbable = observable;
    return () => {}
}).share();

var gettingMusicObserbable: any;
export const onGettingMusic: Observable<Sound> = new Observable( (observable:any) =>{
    gettingMusicObserbable = observable;
    return () => {}
}).share();

var stopSoundObserbable: any;
export const onStopMusic: Observable<Sound> = new Observable( (observable:any) =>{
    stopSoundObserbable = observable; 
}).share();

var onSuspendMusicTrigger: any;
export const onSuspendMusic: Observable<Sound> = new Observable( (observable:any) =>{
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
        return this.http.get(`/api/v1/youtube/search/${query}`, headers )
            .map( res => res.json() )
    }
    
    stopMusic(video:any){
        stopSoundObserbable.next(video);
    }
    
    getMusic(i: number, sound:Sound ){
        playSoundObserbable.next({ details: sound, index: i});
    }
    suspendMusic(){
        onSuspendMusicTrigger.next();
    }
}