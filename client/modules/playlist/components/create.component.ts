import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPlayList } from '../../../interfaces/playlist/playlist.interface';
import { PlayListModel } from '../../../models/playlist/playlist.model'
import { Sound } from '../../../interfaces/player/sound.interface'
import { PlaylistService } from '../../../services/playlist/playlist.service';
import { LoginService } from '../../../services/user/login.service';
import { PlayerService } from '../../../services/player/player.service';

@Component({
    styles: [ `
    `],
    template: ` 
    <h3>Playlist create</h3>
    <form (keydown.enter)="$event.preventDefault()">
        <md-input-container class="md-block">
            <input 
                mdInput 
                #name 
                name="name" 
                placeholder="Name" 
                autofocus 
                [(ngModel)]="playlist.name" 
                required />
            <md-hint align="end"></md-hint>
        </md-input-container>
        <md-input-container class="md-block">
            <textarea 
                    mdInput 
                    placeholder="Description"
                    name="description"
                    [(ngModel)]="playlist.description"></textarea>
        </md-input-container>
        <md-grid-list cols="2" rowHeight="2:1">
            <md-grid-tile>
                <div class="md-block">
                    <md-list  style="overflow-y: auto;height: 256px;">
                        <h3 md-subheader>Selected sounds</h3>
                        <md-list-item *ngFor="let sound of playlist.sounds; let i = index">
                            <img md-list-avatar [src]="sound.thumbnail">
                            <h3 md-line mdTooltip="{{sound.title}}" >{{ sound.title}}</h3>
                            <p md-line>
                                <span mdTooltip="{{sound.channel}}">{{ sound.channel }} </span>
                                <md-icon class="pull-right pointer" (click)="remove(sound)" *ngIf="sound.added == true">delete</md-icon>
                            </p>
                            <md-divider></md-divider>
                        </md-list-item>
                    </md-list>
                </div>
            </md-grid-tile>
            <md-grid-tile>
                <div class="md-block">
                    <md-list  style="overflow-y: auto;height: 256px;">
                        <md-input-container  class="md-block">
                            <input mdInput
                            (keyup)="handleKeyup($event)" 
                            name="queryString" [(ngModel)]="queryString"
                            #searchInput placeholder="Search music and press ENTER" />
                        </md-input-container>
                        <md-list-item *ngFor="let sound of sounds; let i = index">
                            <img md-list-avatar [src]="sound.thumbnail">
                            <h3 md-line mdTooltip="{{sound.title}}" >{{ sound.title}}</h3>
                            <p md-line>
                                <span mdTooltip="{{sound.channel}}">{{ sound.channel }} </span>
                                <md-icon class="pull-right pointer" (click)="add(sound)" *ngIf="!sound.added">add</md-icon>
                                <md-icon class="pull-right pointer" (click)="remove(sound)" *ngIf="sound.added == true">delete</md-icon>
                            </p>
                            <md-divider></md-divider>
                        </md-list-item>
                    </md-list>
                </div>
            </md-grid-tile>
        </md-grid-list>
        <div class="md-block">
            <button type="button" md-button color="warn" (click)="cancel()">
                <md-icon>delete</md-icon> Cancel
            </button>
            <button type="button" md-raised-button color="primary" (click)="save()">
                <md-icon>save</md-icon> Save playlist
            </button>
        </div>
    </form>
    `,
    providers: [PlaylistService, LoginService, PlayerService]
})

export class CreateListComponent{
    private playlist:IPlayList;
    private queryString:string = '';
    private sounds:any;

    constructor(
        private router:Router, 
        private routerParams: ActivatedRoute,
        private playlistService: PlaylistService,
        private loginService: LoginService,
        private playerService: PlayerService,
        private zone: NgZone
    ){
        this. playlist = new PlayListModel();

        this.routerParams.params.subscribe((params) => {
           var id = params['_id'];
           if( id == 'default'){
               this.playlist = this.playlistService.getCurrentPlaylist();
           }else{
               this.playlistService.get(id).subscribe((result) => {
                    this.playlist = result.playlist;
               })
           }
        });
    }
    
    cancel(): void{
        this.router.navigate(['/playlist/list'])
    }
    add(sound:Sound){
        sound['added'] = true;
        this.playlist.sounds.push(sound);
        this.zone.run( ()=>{});
    }
    remove(sound:Sound){
        sound['added'] = false;
        var index:number = 0;
        this.playlist.sounds.forEach( (s:Sound, i:number) =>{
            if( sound.id == s.id)
                index = i;
        })
        this.playlist.sounds.splice( index, 1);
        this.zone.run( ()=>{});
    }
    save(){
        this.playlist.userAt = this.loginService.getUser().user_name;
        var response;
        if( this.playlist['_id']){
            response = this.playlistService.update( this.playlist['_id'], this.playlist);
        }else{
            response = this.playlistService.save(this.playlist);
        }
        response.subscribe((result) => {
            if(result.status === true){
                alert(result.message);
                this.router.navigate(['/playlist/list']);
            }
            else{
                alert(result.message);
            }
        });
    }
    
    handleKeyup(e:any){
        if( e.keyCode == 13){
          this.search();
        }  
    }
    
    search(): void{
      if( this.queryString.length <=0){
        return;
      }
      this.playerService.search(this.queryString)
      .subscribe( (result: any) =>{
        if(result.status == true){
          this.sounds = result.sounds;
        }
      })
    }
}