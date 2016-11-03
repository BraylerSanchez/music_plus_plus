import { Component, NgZone } from '@angular/core';
import { PlayerService, onPlayMusic, onStopMusic } from '../../services/player/player.service';

import { Sound } from '../../interfaces/player/sound.interface';

declare var window: any;
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
            border-top: solid 1px #f3f3f3;
            box-shadow: 0px 0px 4px 1px;
            height: 48px;
            padding-top: 10px;
        }
        .player .progress{
            margin-top: 5px;
        }
        .player .progress .progress-bar{
            background-color: #333;
        }
        .player .progress .sr-only{
            color: white;
            z-index: 1000;
            position: relative;
            text-shadow: 0px 0px 3px black;
        }
        
        .player .controls a{
            font-size: 20pt;
            color: #333;
        }
        
    `],
    template: `
    <div class="col-lg-12 no-padding-l-r player">
        <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs no-padding-l-r"></div>
        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padding-l-r controls">
                <a *ngIf="!isPlaying" (click)="play()" ><i class="glyphicon glyphicon-play"></i></a>
                <a *ngIf="isPlaying" (click)="stop()" ><i class="glyphicon glyphicon-pause"></i></a>
                <span></span>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                <div class="progress text-center">
                  <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" [ngStyle]="{'width': (currentTime / duration * 100) + '%'}">
                  </div>
                  <span class="sr-only">{{toMinute(currentTime)}}:{{toSecound(currentTime)}} of {{toMinute(duration)}}:{{toSecound(duration)}}</span>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padding-l-r controls">
                <a><i class="glyphicon glyphicon-volume-up"></i></a>
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
    constructor(
        private playerService: PlayerService,
        private ngZone: NgZone
    ){
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
        
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
        .subscribe( (sound) => {
            this.isPlaying = false;
            this.ngZone.run(()=>{});
        });
        
    }
    
    play(){
        this.isPlaying = true;
        this.currentSound = this.audioContext.createBufferSource();
        this.audioContext.decodeAudioData( this.soundBuffer, (buffer) => {
            this.currentSound.buffer = buffer;
            this.duration = buffer.duration;
            this.currentSound.connect(this.audioContext.destination);
            this.currentSound.loop = false;
            this.currentSound.start(0, this.currentTime);
            
            this.playingEvent = window.setInterval(() =>{
                this.currentTime += 1;
                this.ngZone.run(()=>{});
            }, 1000)
        })
        this.ngZone.run(()=>{});
    }
    
    stop(){
        window.clearInterval(this.playingEvent);
        
        this.currentTime = this.audioContext.currentTime;
        this.currentSound.stop(this.audioContext.currentTime);
        this.isPlaying = false;
        this.playerService.stopMusic(this.currentSound);
    }
    toMinute(value){
        return Math.round((value / 60) % 60);
    }
    toSecound(value){
        return Math.round(value % 60);
    }
}