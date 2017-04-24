import { Component, NgZone, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IPlayList } from '../../interfaces/playlist/playlist.interface';
import { Sound } from '../../interfaces/player/sound.interface';
import { PlayerService, onPlayMusic, onStopMusic, onSuspendMusic} from '../../services/player/player.service';
import { LoginService } from '../../services/user/login.service';

import { PlaylistService, onAddSound, onRemoveSound, onPlaylistChange } from '../../services/playlist/playlist.service';

@Component({
    selector: 'playingList',
    template: `
    <md-list>
        <h1 md-subheader class="header">
            <span class="text-ellipsis" mdTooltip="{{playlist.name}}" style="width: 75%;display: inline-block;" >{{playlist.name}}</span>
            <md-icon mdTooltip="Clear play list" (click)="toClearPlayList()"  class="pull-right pointer">delete</md-icon>
            <md-icon mdTooltip="Save play list" [routerLink]="['/playlist/create/default']" class="pull-right pointer">save</md-icon>
        </h1>
        <md-list-item *ngFor="let sound of playlist.sounds; let i = index" [ngClass]="{'active': currentIndex == i}">
            <md-icon md-list-icon *ngIf="currentIndex == i && isPlaying">surround_sound</md-icon>
            <md-icon class="pointer" md-list-icon *ngIf="currentIndex != i || !isPlaying" (click)="removeFromPlaylist($event, i, sound)" >remove</md-icon>
            <h5 md-line mdTooltip="{{sound.title}}" class="text-ellipsis" (click)="play(i, sound)"  class="pointer"> {{sound.title}}</h5>
        </md-list-item>
    </md-list>`,
    providers: [PlayerService, PlaylistService]
})
export class PlayingWidgetComponent implements OnInit{
    @Output()
    private onMusicAdd = new EventEmitter() 
    
    private currentIndex = -1;
    private isPlaying = false;
    private playlists:any;
    private playlist:any = { name:'default', description: '', sounds: [], createAt: new Date(), userAt: '', updateAt: new Date()};
    constructor(
        private playerService: PlayerService,
        private ngZone: NgZone,
        private loginService: LoginService,
        private playlistService:PlaylistService,
        private router: Router
    ){
    }
    events(){
        onAddSound.subscribe((result) => {
            if( result.playlist == this.playlist.name){
                this.playlist.sounds.push(result.sound)
                this.onMusicAdd.next({result: false})
            }
        })
        
        onRemoveSound.subscribe( (result) =>{
            if( result.playlist == this.playlist.name){
                this.playlist.sounds.splice(result.index,1);
            }
        })
        onPlaylistChange.subscribe( (result) => {
            this.playlist = result;
            if(this.playlist.sounds.length <= 0){
                this.playerService.suspendMusic();
            }
            this.ngZone.run(()=>{});
        })
        
        onPlayMusic
         .subscribe( (response) => {
            this.isPlaying = true;
            this.currentIndex = response['index'];
            this.onMusicAdd.next({result: true})
            this.ngZone.run(()=>{});
        });
        onStopMusic
            .subscribe( (response) => {
                this.isPlaying = false;
            })
    }
    
    removeFromPlaylist(e:any, index:number) {
        this.playlistService.removeSoundToPlaylist(index);
        e.stopPropagation();
    }
        
    ngOnInit(){
        this.events();
        var playlist = this.playlistService.getCurrentPlaylist();
        if( playlist ){
            this.playlist = playlist;
        }
    }
    
    play(index:number, sound:Sound):void {
        this.playerService.getMusic(index, sound);
    }
    
    toClearPlayList(){
        let playlist:any = { name:'default', description: '', sounds: [], createAt: new Date(), userAt: '', updateAt: new Date()};
        this.playlistService.changePlaylist(playlist);
    }
 }