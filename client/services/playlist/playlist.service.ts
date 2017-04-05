import { Injectable } from '@angular/core'
import {Http, Headers, Response, ResponseOptions} from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/share';

import { IPlayList, ISharedPlayList } from '../../interfaces/playlist/playlist.interface'

const headers = new ResponseOptions({
    headers: new Headers({
        'Content-Type': 'application/json'
    })
})

var onPlaylistChangeTrigger: any;
export const onPlaylistChange: Observable<IPlayList> = new Observable( (observable:any) =>{
    onPlaylistChangeTrigger = observable;
}).share();

var addSoundTrigger: any;
export const onAddSound: Observable<any> = new Observable( (observable:any) =>{
  addSoundTrigger = observable;
}).share();

var removeSoundTrigger: any;
export const onRemoveSound: Observable<any> = new Observable( (observable:any) =>{
  removeSoundTrigger = observable;
}).share();

@Injectable()
export class PlaylistService{
    constructor(
        private http: Http
    ){
    }
    
    list(_userId:number){
        return this.http.get(`api/v1/${_userId}/playlist`, headers )
            .map( res => res.json())
    }
    
    get(_id:string){
        return this.http.get(`api/v1/playlist/${_id}`, headers )
        .map( res => res.json())
    }
    
    save(_playlist:any){
        return this.http.post('api/v1/playlist', _playlist, headers )
            .map( res => res.json())
    }
    
    update(_id:string, _playlist:any){
        return this.http.put(`api/v1/playlist/${_id}`, _playlist, headers )
            .map( res => res.json())
    }
    
    delete(_id: string){
        return this.http.delete(`api/v1/playlist/${_id}`, headers)
            .map( res => res.json())
    }
    
    changePlaylist( playlist: IPlayList){
        localStorage.setItem('ms_currentPlaylist', JSON.stringify( playlist ) )
        onPlaylistChangeTrigger.next(playlist)
    }
    
    getCurrentPlaylist():any{
        var playlist:any;
        playlist = localStorage.getItem('ms_currentPlaylist')
        if( playlist ){
            playlist = JSON.parse(playlist);
            return playlist;
        }else{
            playlist = {name: 'default', description: '', sounds: [], userAt: '', createAt: new Date(), updateAt: new Date() };
            this.setCurrentPlaylist(playlist);
            return playlist; 
        }
    }
    setCurrentPlaylist(playlist:any){
        localStorage.setItem('ms_currentPlaylist', JSON.stringify(playlist));
    }
    
    addSoundToPlaylist(result:any){
        var playlist = this.getCurrentPlaylist();
        playlist.sounds.push(result.sound);
        this.setCurrentPlaylist(playlist);
        addSoundTrigger.next( {
            sound: result.sound,
            playlist: result.playlist,
            soundLength: playlist.sounds.length
        });
    }
    removeSoundToPlaylist(index:number){
        var playlist = this.getCurrentPlaylist();
        playlist.sounds.splice(index,1);
        
        this.setCurrentPlaylist(playlist);
        removeSoundTrigger.next({
            index: index,
            playlist: playlist.name,
            soundLength: playlist.sounds.length
        });
    }
    
    share(_sharedPlaylist:any){
        return this.http.post('api/v1/playlist/share', _sharedPlaylist, headers )
            .map( res => res.json())
    }
    
    searchShared(){
        return this.http.get('api/v1/shared/search', headers)
        .map(res => res.json());
    }
}