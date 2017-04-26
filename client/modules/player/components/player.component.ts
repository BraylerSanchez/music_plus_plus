import { Component, NgZone, OnInit, Input } from '@angular/core';
import { PlayerService, onPlayMusic, onStopMusic, onGettingMusic, onSuspendMusic } from '../../../services/player/player.service';
import { PlaylistService, onPlaylistChange, onAddSound, onRemoveSound } from '../../../services/playlist/playlist.service';

import { Sound } from '../../../interfaces/player/sound.interface';
import { IPlayList } from '../../../interfaces/playlist/playlist.interface';

declare var window: any;
window.AudioContext = window.AudioContext || window.webkitAudioContext;

@Component({
    selector: 'player',
    styles: [ `
        .player{
            position: fixed;
            z-index: 1000;
            bottom: 0;
            left: 0;
            width: 245px;
            background-color: #fff;
            border-top: solid 1px #c7c7c7;
            box-shadow: 0px 0px 4px 1px;
            height: 48px;
            padding-top: 10px;
        }
        .player .progress{
            margin-top: 5px;
            position: relative;
        }
        .player .progress .progress-bar{
            background-color: #333;
        }
        .player .controls a.common{
            top: -14px !important;
        }
        .player .controls a.common .mat-icon{
            font-size: 24pt;
        }
        
        .player .controls a{
            font-size: 15pt;
            color: #333;
            cursor: pointer;
            position: relative;
            transition: 0.4s;
        }
        .player .controls a:hover{
            color: #b3b2b2;
        }
        .player .controls a.play{
            top: -6px;
        }
        .player .controls a.play .mat-icon{
            font-size: 38pt;
            height: 42px;
            width: 48px;
        }
        .player .controls img{
            height: 40px;
            width: 40px;
            left: 50%;
            margin-top: 0px;
            padding-bottom: 10px;
            padding-left: 10px;
        }
        
        .player .progress span{
            position: absolute;
        }
        
        .player .progress span.left{
            left: 5;
        }
        
        .player .progress span.right{
            right: 5;
            top: 0;
        }
        
        .player .controls a.disabled{
            color: gray;
            cursor: no-drop;
        }
    `],
    template: `
    <div class="col-lg-12 no-padding-l-r player" [hidden]="!currentSoundDetails">
        <audio id="audioElement" preload="auto">
          <source src="" type="audio/mpeg">
        </audio>
        <div class="no-padding-l-r controls text-center" [ngClass]="{'playing': isPlaying == true}">
            <a class="common" (click)="previou()" [ngClass]="{'disabled': currentSoundIndex <= 0 || loading }">
                <md-icon>skip_previous</md-icon>
            </a>
            <a class="play" *ngIf="!isPlaying && !loading" (click)="play()">
                <md-icon>play_circle_outline</md-icon>
            </a>
            <img [src]="'assest/images/loading-xs.gif'" *ngIf="loading"/>
            <a class="play" *ngIf="isPlaying && !loading" (click)="stop()" [ngClass]="{'disabled': loading }">
                <md-icon>pause_circle_outline</md-icon>
            </a>
            <a class="common" (click)="next()"
            [ngClass]="{'disabled': currentSoundIndex + 1 >= soundsLength || loading }">
                <md-icon>skip_next</md-icon>
            </a>
            <a class="common" (click)="suspend()" [ngClass]="{'disabled': loading }">
                <md-icon>stop</md-icon>
            </a>
        </div>
    </div>`,
    providers: [PlayerService, PlaylistService]
})
export class PlayerComponent implements OnInit{
    private isPlaying:boolean = false;
    private loading:boolean = false;
    private currentSoundDetails: Sound;
    private currentSoundIndex: number = 0;
    private soundsLength: number = 0;
    
    private currentSound: any;
    
    private currentTime: number = 0;
    private duration:number = 0;
    
    private playingEvent:any;
    
    private player:any;
    
    constructor(
        private playerService: PlayerService,
        private ngZone: NgZone,
        private playlistService: PlaylistService
    ){
        this.eventSubscribe();
    }
    
    ngOnInit(){
        this.player = document.getElementById('audioElement');
        
        this.player.addEventListener("ended", () => {
            this.next();
        })
        this.player.addEventListener("error", () => {
            this.loading = false;
            alert(`No es posible reproducir ${this.currentSoundDetails.title}.`);
            this.suspend();
        })
        
    }
    
    eventSubscribe(){
        onPlayMusic
         .subscribe( (response) => {
            this.soundsLength = this.playlistService.getCurrentPlaylist().sounds.length;
            this.currentSoundDetails = <Sound>response['details'];
            this.currentSoundIndex = response['index'];
            this.player.setAttribute("src",`/api/v1/youtube/convert/${this.currentSoundDetails.id}`);
            this.play();
        });
        onStopMusic
        .subscribe( () => {
            this.isPlaying = false;
            this.player.pause();
            this.ngZone.run(()=>{});
        });
        
        onPlaylistChange.subscribe( (playlist) =>{
            if( playlist.sounds[0] ){
                this.playerService.getMusic(0, playlist.sounds[0]);
                this.soundsLength = playlist.sounds.length;
            }
        })
        onGettingMusic.subscribe( (response) =>{
            this.soundsLength = this.playlistService.getCurrentPlaylist().sounds.length;
            this.currentSoundDetails = response['details'];
            this.currentSoundIndex = response['index'];
            this.player.setAttribute("src",`/api/v1/youtube/convert/${this.currentSoundDetails.id}`);
            this.play();
            this.ngZone.run(()=>{});
        })
        onAddSound.subscribe( (result)=>{
            if(result.soundLength <= 0){
                this.currentSoundIndex = 0;
            }
            this.currentSoundIndex = result.soundLength;
        })
        onRemoveSound.subscribe( (result)=>{
            if(result.soundLength <= 0){
                this.currentSoundIndex = 0;
            }
            this.currentSoundIndex = result.soundLength;
        })
        
        onSuspendMusic.subscribe( () => {
            this.stop();
            this.currentSoundDetails = undefined;
        })
    }
    play(){
        this.isPlaying = false;
        this.loading = true;
        this.player.addEventListener('canplay', ()=>{
            this.player.play();
            this.player.addEventListener("playing", () => {
                this.isPlaying = true;
                this.loading = false;
                this.ngZone.run(()=>{});
            })
        })/*
        this.player.addEventListener('timeupdate', (event:any)=>{
            //console.log(Math.floor(event.target.currentTime))
        })
        this.player.addEventListener("loadedmetadata", (_event:any) => {
    		console.log( event.target.duration );
    		//document.getElementsByTagName("body")[0].removeChild(audio);
    	});*/
    }
    
    stop(){
        this.playerService.stopMusic(this.currentSoundDetails);
    }
    
    next(){
        var playlist = this.playlistService.getCurrentPlaylist();
        var index = this.currentSoundIndex + 1;
        if( index < playlist.sounds.length){
            this.playerService.getMusic(index, playlist.sounds[index]);
        }
    }
    
    previou(){
        var playlist = this.playlistService.getCurrentPlaylist();
        var index = this.currentSoundIndex - 1;
        if( index >=0){
            this.playerService.getMusic(index, playlist.sounds[index]);
        }
    }
    
    suspend(){
        this.player.pause();
        this.player.currentTime = 0;
        this.playerService.suspendMusic();
    }
}
