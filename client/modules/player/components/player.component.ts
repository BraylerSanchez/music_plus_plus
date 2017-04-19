import { Component, NgZone, OnInit } from '@angular/core';
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
            width: 100%;
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
        .player .controls.playing a.common{
            top: -12px !important;
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
            font-size: 30pt;
            top: -6px;
        }
        .player .controls img{
            height: 40px;
            width: 40px;
            left: 50%;
            margin-top: -6px;
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
        
        input[type=range] {
          -webkit-appearance: none;
          width: 100%;
          margin: 0.7px 0;
        }
        input[type=range]:focus {
          outline: none;
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 25.6px;
          cursor: pointer;
          box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
          background: #484d4d;
          border-radius: 0px;
          border: 0px solid #010101;
        }
        input[type=range]::-webkit-slider-thumb {
          box-shadow: 0px 0px 1px #670000, 0px 0px 0px #810000;
          border: 0px solid #ff1e00;
          height: 27px;
          width: 18px;
          border-radius: 0px;
          background: rgba(255, 67, 95, 0.93);
          cursor: pointer;
          -webkit-appearance: none;
          margin-top: -0.7px;
        }
        input[type=range]:focus::-webkit-slider-runnable-track {
          background: #545a5a;
        }
        input[type=range]::-moz-range-track {
          width: 100%;
          height: 25.6px;
          cursor: pointer;
          box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
          background: #484d4d;
          border-radius: 0px;
          border: 0px solid #010101;
        }
        input[type=range]::-moz-range-thumb {
          box-shadow: 0px 0px 1px #670000, 0px 0px 0px #810000;
          border: 0px solid #ff1e00;
          height: 27px;
          width: 18px;
          border-radius: 0px;
          background: rgba(255, 67, 95, 0.93);
          cursor: pointer;
        }
        input[type=range]::-ms-track {
          width: 100%;
          height: 25.6px;
          cursor: pointer;
          background: transparent;
          border-color: transparent;
          color: transparent;
        }
        input[type=range]::-ms-fill-lower {
          background: #3c4040;
          border: 0px solid #010101;
          border-radius: 0px;
          box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        }
        input[type=range]::-ms-fill-upper {
          background: #484d4d;
          border: 0px solid #010101;
          border-radius: 0px;
          box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        }
        input[type=range]::-ms-thumb {
          box-shadow: 0px 0px 1px #670000, 0px 0px 0px #810000;
          border: 0px solid #ff1e00;
          height: 27px;
          width: 18px;
          border-radius: 0px;
          background: rgba(255, 67, 95, 0.93);
          cursor: pointer;
          height: 25.6px;
        }
        input[type=range]:focus::-ms-fill-lower {
          background: #484d4d;
        }
        input[type=range]:focus::-ms-fill-upper {
          background: #545a5a;
        }
    `],
    template: `
    <div class="col-lg-12 no-padding-l-r player" [hidden]="!currentSoundDetails" >
        <audio id="audioElement">
          <source src="" type="audio/mpeg">
        </audio>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding-l-r">
            <div class="col-lg-2 col-md-2 hidden-sm hidden-xs no-padding-l-r"></div>
            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6 no-padding-l-r controls" [ngClass]="{'playing': isPlaying == true}" >
                    <a class="common" (click)="previou()" [ngClass]="{'disabled': currentSoundIndex <= 0 }"><i class="fa fa-backward padding-right-xs"></i></a>
                    <a class="play" *ngIf="!isPlaying" (click)="play()" ><i class="fa fa-play"></i></a>
                    <a class="play" *ngIf="isPlaying" (click)="stop()" ><i class="fa fa-pause"></i></a>
                    <a class="common" (click)="next()" [ngClass]="{'disabled': currentSoundIndex + 1 >= soundsLength }" ><i class="fa fa-forward padding-left-xs"></i></a>
                    <a class="common" (click)="suspend()" ><i class="fa fa-stop"></i></a>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-6 no-padding-l-r progress">
                </div>
                <div class="col-lg-1 col-md-1 col-sm-1 hidden-xs no-padding-l-r controls">
                </div>
            </div>
            <div class="col-lg-2 col-md-2 hidden-sm hidden-xs no-padding-l-r"></div>
        </div>
    </div>`,
    providers: [PlayerService, PlaylistService]
})
export class PlayerComponent implements OnInit{
    private isPlaying= false;
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
        this.player = document.getElementById('audioElement')
    }
    
    eventSubscribe(){
        onPlayMusic
         .subscribe( (response) => {
            this.soundsLength = this.playlistService.getCurrentPlaylist().sounds.length;
            this.currentSoundDetails = response['details'];
            this.currentSoundIndex = response['index'];
            this.play();
            this.ngZone.run(()=>{});
        });
        onStopMusic
        .subscribe( () => {
            this.isPlaying = false;
            this.player.stop();
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
            this.currentSoundDetails = response['sound'];
            this.currentSoundIndex = response['index'];
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
        this.player.setAttribute("src",`/api/v1/youtube/convert/${this.currentSoundDetails.id}`);
        this.isPlaying = true;
        this.player.play();
        this.player.onended = function(){
            this.next();
        }
        this.ngZone.run(()=>{});
    }
    
    stop(){
        this.player.stop();
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
        this.stop();
        this.playerService.suspendMusic();
    }
}
