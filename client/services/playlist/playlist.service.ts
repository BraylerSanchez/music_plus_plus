import { Injectable } from '@angular/core'
import {Http, Headers, Response, ResponseOptions} from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { IPlayList } from '../../interfaces/playlist/playlist.interface'

const headers = new ResponseOptions({
    headers: new Headers({
        'Content-Type': 'application/json'
    })
})
var onPlaylistChangeTrigger: any;
export const onPlaylistChange: Observable<IPlayList> = new Observable( (observable) =>{
    onPlaylistChangeTrigger = observable;
})

@Injectable()
export class PlaylistService{
    
    constructor(
        private http: Http
    ){
    }
    
    get(_id:string){
        return this.http.get(`api/v1/playlist/${_id}`, headers )
            .map( res => res.json())
    }
    list(){
        return this.http.get('api/v1/playlist', headers )
            .map( res => res.json())
    }
    save(_playlist){
        return this.http.post('api/v1/playlist', _playlist, headers )
            .map( res => res.json())
    }
    
    update(_id:string, _playlist){
        return this.http.put(`api/v1/playlist/${_id}`, _playlist, headers )
            .map( res => res.json())
    }
    
    /*delete(_playlist){
        return this.http['delete']('api/v1/playlist', _playlist, headers)
            .map( res => res.json())
    }*/
    
    changePlaylist( playlist: IPlayList){
        onPlaylistChangeTrigger.next(playlist)
    }
}