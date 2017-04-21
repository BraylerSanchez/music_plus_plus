import { Component, NgZone, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IPlayList } from '../../interfaces/playlist/playlist.interface';
import { Sound } from '../../interfaces/player/sound.interface';
import { PlayerService, onPlayMusic, onStopMusic, onSuspendMusic} from '../../services/player/player.service';
import { LoginService } from '../../services/user/login.service';

import { PlaylistService, onAddSound, onRemoveSound, onPlaylistChange } from '../../services/playlist/playlist.service';

@Component({
    styles: [`
        
        ul{
            padding: 0px;
            margin: 0px;
        }
        ul li.title{
            background-color: #333333;
            padding: 5px;
            font-size: 11pt;
            color: white;
        }
        ul li{
            padding: 5px;
            font-size: 9pt;
            border-bottom: 1px solid #d0d0d0;
            color: #333333;
            cursor: pointer;
        }
        ul li.active{
            background-color: #5bc0de;
        }
        ul li:hover{
            background-color: #e4e4e4;
        }
        ul li.active i{
            color: #d9edf7;
        }
        ul li{
            text-align: left;
        }
        ul li span{
            width: 90%;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        ul li h5{
            width: 75%;
        }
        ul li.title a{
            float: right;
            position: relative;
            top: -30px;
        }
        ul li i{
            float: right;
            top: -15px;
            position: relative;
        }
        ul li.item i{
            color: #5bc0de;
        }
        ul li.title i{
            float: none;
            top: 0;
            color: #green;
        }
        a{
            margin-right: 3px;
        }
    `],
    selector: 'playingList',
    template: `
    <ul>
        <li class="title">
            <h5>{{playlist.name}}</h5>
            <a *ngIf="playlist.name == 'default'" [routerLink]="['/playlist/create/default']" class="btn btn-xs btn-success">
                Save <i class="fa fa-floppy-o"></i>
            </a>
            <a class="btn btn-xs btn-default" (click)="toClearPlayList()">
                Clear <i class="fa fa-trash"></i>
            </a>
        </li>
        <li class="item" *ngFor="let sound of playlist.sounds; let i = index" (click)="play(i, sound)" [ngClass]="{'active': currentIndex == i}" >
            <span title="{{sound.title}}">
                {{sound.title}}
            </span>
            <i *ngIf="currentIndex == i && isPlaying" class="fa fa-volume-up"></i>
            <i *ngIf="currentIndex != i || !isPlaying" class="fa fa-minus pull-right" (click)="removeFromPlaylist($event, i, sound)"></i>
        </li>
    </ul>`,
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