import { Component, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PlayerService } from '../../../services/player/player.service';
import { IPlayList } from '../../../interfaces/playlist/playlist.interface';
import { Sound } from '../../../interfaces/player/sound.interface';
import { onAddSoundToPlaylist, onRemoveSoundToPlaylist } from '../../home/components/search.component';

@Component({
    selector: 'songlist',
    styles: [`
        .video{
            color: #333333;
        }
    `],
    template: `
        <div class="list-group">
            <div *ngIf="playlist.sounds.length == 0">
                <div class="alert alert-info">
                    <h4>Not songs added</h4>
                </div>
            </div>
            <div class="video list-group-item" *ngFor="let video of playlist.sounds">
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
                            <i *ngIf="isAdded(video)" class="fa fa-minus pull-right" (click)="removeFromPlaylist($event, video)"></i>
                        </h4>
                    </div>
                    <span  id="channel">{{ video.channel }}</span>
                    <span class="pull-right">{{ video.dateAt | date }}</span>
                </div>
            </div>
        </div>`,
    providers: []
})

export class SongListComponent{
    @Input()
    playlist: IPlayList;
    
    constructor(){
        onAddSoundToPlaylist.subscribe((result) => {
            //this.playlist.sounds.push(result.sound)
        })
        
        onRemoveSoundToPlaylist.subscribe((result) => {
          for( var i = this.playlist.sounds.length-1; i>=0; i--) {
            if( this.playlist.sounds[i].id == result.sound.id){
              this.playlist.sounds.splice(i,1);
            }
          }
        })
    }
    
    addFromPlaylist(e, sound: Sound){
      this.playlist.sounds.push(sound);
    }
    
    removeFromPlaylist(e,  sound: Sound){
      for( var i = this.playlist.sounds.length-1; i>=0; i--) {
        if( this.playlist.sounds[i].id == sound.id){
          this.playlist.sounds.splice(i,1);
        }
      }
    }
    
    isAdded(video){
      return this.playlist.sounds.some( (sound)=>{
        return sound.id == video.id
      })
    }
}