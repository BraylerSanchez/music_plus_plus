import { Component, NgZone, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PlayerService } from '../../../services/player/player.service';
import { onAddSound } from '../../../services/playlist/playlist.service';
import { IPlayList } from '../../../interfaces/playlist/playlist.interface';
import { Sound } from '../../../interfaces/player/sound.interface';

@Component({
    selector: 'songlist',
    styles: [`
        .video{
            color: #333333;
        }
    `],
    template: `
        <h3>Play list:</h3>
        <div class="list-group">
            <div *ngIf="playlist.sounds.length == 0">
                <div class="alert alert-info">
                    <h4>Not songs added</h4>
                </div>
            </div>
            <div class="video list-group-item" *ngFor="let video of playlist.sounds; let i = index">
                <div class="media-left">
                    <span>
                        <img id="" class="media-object" src="{{ video.thumbnail }}" alt="...">
                    </span>
                </div>
                <div class="media-body text-left">
                    <div class="media-heading">
                        <h4 class="title">
                            {{ video.title }} 
                            <i *ngIf="!isAdded(video)" class="fa fa-plus pull-right" (click)="addFromPlaylist($event, video)"></i>
                            <i *ngIf="isAdded(video)" class="fa fa-minus pull-right" (click)="removeFromPlaylist($event, i)"></i>
                        </h4>
                    </div>
                    <span  id="channel">{{ video.channel }}</span>
                    <span class="pull-right">{{ video.dateAt | date }}</span>
                </div>
            </div>
        </div>`,
    providers: []
})

export class SongListComponent implements OnInit{
    @Input()
    playlist: IPlayList;
    
    constructor(){
    }
    
    ngOnInit(){ 
        onAddSound.subscribe((result) => {
            if( result.playlist != 'default' ){
                this.playlist.sounds.push(result.sound)
            }
        })
    }
    removeFromPlaylist(e:any,  index:number){
        this.playlist.sounds.splice(index, 1);
    }
    
    isAdded(video:any){
      return this.playlist.sounds.some( (sound)=>{
        return sound.id == video.id
      })
    }
}