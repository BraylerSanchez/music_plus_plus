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
    <div class="col-lg-12 no-padding-l-r player" *ngIf="currentSoundDetails" >
        <audio controls autoplay style="width:100%">
            <source [src]="'/api/v1/youtube/convert/' + currentSoundDetails.id" type="audio/ogg">
            <source [src]="'/api/v1/youtube/convert/' + currentSoundDetails.id" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
    </div>`,
    providers: [PlayerService, PlaylistService]
})
export class PlayerComponent{
    private isPlaying= false;
    private isLoading = false;
    private currentSoundDetails: Sound;
    private currentSoundIndex: number = 0;
    private soundsLength: number = 0;
    
    private audioContext: any;
    private soundBuffer:any;
    private currentSound: any;
    
    private currentTime: number = 0;
    private duration:number = 0;
    
    private playingEvent:any;
    
    private audioNode:any;
    private soundVolume: number = 1;
    constructor(
        private playerService: PlayerService,
        private ngZone: NgZone,
        private playlistService: PlaylistService
    ){
        this.audioContext = new AudioContext();
        this.audioNode = this.audioContext.createGain();
        this.eventSubscribe();
    }
    
    eventSubscribe(){
        onPlayMusic
         .subscribe( (response) => {
            this.soundsLength = this.playlistService.getCurrentPlaylist().sounds.length;
            this.currentSoundDetails = response['details'];
            this.currentSoundIndex = response['index'];
            this.soundBuffer = response['buffer'];
            if(this.currentSound){
                window.clearInterval(this.playingEvent);
                this.currentSound.stop();
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
                this.playerService.getMusic(0, playlist.sounds[0]);
            }
        })
        onGettingMusic.subscribe( (sound) =>{
            this.currentSoundDetails = sound;
            this.isLoading = true;
            this.ngZone.run(()=>{})
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
        this.isPlaying = true;
        this.currentSound = this.audioContext.createBufferSource();
        this.audioContext.decodeAudioData( this.soundBuffer, (buffer:any) => {
            this.currentSound.buffer = buffer;
            this.duration = buffer.duration;
            this.currentSound.loop = false;
            this.currentSound.start(0, this.currentTime);
            
            this.isLoading = false;
            this.currentSound.connect(this.audioNode);
            this.currentSound.connect(this.audioContext.destination);
            this.playingEvent = window.setInterval(() =>{
                this.currentTime += 1;
                if( this.currentTime > this.duration){
                    this.currentTime = 0;
                    this.stop();
                    this.next();
                }
                this.ngZone.run(()=>{});
            }, 1000)
        })
        this.ngZone.run(()=>{});
    }
    
    stop(){
        if(this.currentSound){
            window.clearInterval(this.playingEvent);
            this.currentSound.stop();
            this.playerService.stopMusic(this.currentSoundDetails);
        }
    }
    
    next(){
        if(!this.isLoading){
            var playlist = this.playlistService.getCurrentPlaylist();
            var index = this.currentSoundIndex + 1;
            if( index < playlist.sounds.length){
                this.playerService.getMusic(index, playlist.sounds[index]);
            }
        }
    }
    
    previou(){
        if(!this.isLoading){
            var playlist = this.playlistService.getCurrentPlaylist();
            var index = this.currentSoundIndex - 1;
            if( index >=0){
                this.playerService.getMusic(index, playlist.sounds[index]);
            }
        }
    }
    
    toMinute(value:number){
        let minute = Math.round((value / 60) % 60);
        return minute < 10? '0' + minute: minute;
    }
    toSecound(value:number){
        let secound = Math.round(value % 60);
        return secound < 10? '0' + secound : secound;
    }
    
    mute(){
        this.soundVolume = this.soundVolume == 1? 0: 1;
        this.audioNode.gain.value = this.soundVolume;
    }
    
    changeSound(e:any){
        this.stop();
        this.currentTime = e.currentTarget.value * this.duration / 100;
        this.play();
    }
    
    suspend(){
        if(!this.isLoading){
            this.stop();
            this.playerService.suspendMusic();
        }
    }
}
