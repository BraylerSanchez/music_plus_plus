import { Component, NgZone, OnInit } from '@angular/core';
import { PlayerService, onPlayMusic, onStopMusic } from '../../../services/player/player.service';
import { onPlaylistChange } from '../../../services/playlist/playlist.service';

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
        .player .controls a{
            font-size: 20pt;
            color: #333;
            cursor: pointer;
        }
        .player .progress .progress-counter{
            color: black;
            z-index: 1108;
            position: absolute;
            left: 45%;
            text-shadow: 0px 0px 2px white;
            bottom: 0;
        }
        .player .controls a.disabled{
            color: gray;
            cursor: no-drop;
        }
    `],
    template: `
    <div class="col-lg-12 no-padding-l-r player" *ngIf="currentSoundDetails" >
        <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs no-padding-l-r"></div>
        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padding-l-r controls">
                <a (click)="previou()" [ngClass]="{'disabled': playlist.sounds.indexOf(currentSoundDetails) <= 0 }"><i class="fa fa-backward padding-right-xs"></i></a>
                <a *ngIf="!isPlaying" (click)="play()" ><i class="fa fa-play"></i></a>
                <a *ngIf="isPlaying" (click)="stop()" ><i class="fa fa-pause"></i></a>
                <a (click)="next()" [ngClass]="{'disabled': (playlist.sounds.indexOf(currentSoundDetails) +1) >= playlist.sounds.length  }" ><i class="fa fa-forward padding-left-xs"></i></a>
                <a (click)="suspend()" ><i class="fa fa-stop "></i></a>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                <div class="progress text-center">
                  <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" [ngStyle]="{'width': (currentTime / duration * 100) + '%'}">
                  </div>
                  <span class="progress-counter">{{toMinute(currentTime)}}:{{toSecound(currentTime)}} of {{toMinute(duration)}}:{{toSecound(duration)}}</span>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padding-l-r controls">
                <a (click)="mute()" class="hide"><i class="fa" [ngClass]="{'fa-volume-up': soundVolume ==1, 'fa-volume-off': soundVolume ==0}"></i></a>
            </div>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs no-padding-l-r"></div>
    </div>`,
    providers: [PlayerService]
})
export class PlayerComponent{
    private isPlaying= false;
    private currentSoundDetails: Sound;
    private audioContext: any;
    private soundBuffer:any;
    private currentSound: any;
    
    private currentTime: number = 0;
    private duration:number = 0;
    
    private playingEvent:any;
    
    private playlist:IPlayList;
    private audioNode:any;
    private soundVolume: number = 1;
    constructor(
        private playerService: PlayerService,
        private ngZone: NgZone
    ){
        this.audioContext = new AudioContext();
        this.audioNode = this.audioContext.createGain();
        this.playlist = { name:'default', description: '', sounds: [], createAt: new Date(), userAt: '', updateAt: new Date()}
        this.eventSubscribe();
    }
    
    eventSubscribe(){
        onPlayMusic
         .subscribe( (response) => {
            this.currentSoundDetails = response['details'];
            this.soundBuffer = response['buffer'];
            if(this.currentSound){
                this.stop();
                this.currentTime = 0;
            }
            this.play();
        });
        onStopMusic
        .subscribe( () => {
            this.isPlaying = false;
            this.ngZone.run(()=>{});
        });
        
        onPlaylistChange.subscribe( (playlist) =>{
            if( playlist.sounds[0] ){
                this.playerService.getMusic(playlist.sounds[0]);
            }
        })
    }
    play(){
        this.isPlaying = true;
        this.currentSound = this.audioContext.createBufferSource();
        this.audioContext.decodeAudioData( this.soundBuffer, (buffer) => {
            this.currentSound.buffer = buffer;
            this.duration = buffer.duration;
            this.currentSound.loop = false;
            this.currentSound.start(0, this.currentTime);
            
            this.currentSound.connect(this.audioNode);
            this.currentSound.connect(this.audioContext.destination);
            this.playingEvent = window.setInterval(() =>{
                this.currentTime += 1;
                if( this.currentTime > this.duration){
                    this.currentTime = 0;
                    var index = this.playlist.sounds.indexOf(this.currentSoundDetails) + 1;
                    if( index < this.playlist.sounds.length){
                        this.next();
                    }
                    this.stop();
                }
                this.ngZone.run(()=>{});
            }, 1000)
        })
        this.ngZone.run(()=>{});
    }
    
    stop(){
        window.clearInterval(this.playingEvent);
        this.currentSound.stop(this.currentTime);
        this.playerService.stopMusic(this.currentSound);
    }
    
    next(){
        var index = this.playlist.sounds.indexOf(this.currentSoundDetails) + 1;
        if( index < this.playlist.sounds.length){
            this.playerService.getMusic(this.playlist.sounds[index]);
        }
    }
    
    previou(){
        var index = this.playlist.sounds.indexOf(this.currentSoundDetails) - 1;
        if( index >=0){
            this.playerService.getMusic(this.playlist.sounds[index]);
        }
    }
    
    toMinute(value){
        let minute = Math.round((value / 60) % 60);
        return minute < 10? '0' + minute: minute;
    }
    toSecound(value){
        let secound = Math.round(value % 60);
        return secound < 10? '0' + secound : secound;
    }
    
    mute(){
        this.soundVolume = this.soundVolume == 1? 0: 1;
        this.audioNode.gain.value = this.soundVolume;
    }
    suspend(){
        this.stop();
        this.currentSoundDetails = undefined;
        this.playerService.suspendMusic();
    }
}
