import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPlayList } from '../../interfaces/playlist/playlist.interface';

import { PlaylistService} from '../../services/playlist/playlist.service';
import { LoginService, onLoginUser, onLogoutUser } from '../../services/user/login.service';

@Component({
    selector: 'playlist',
    styles:[`
        .mat-list .mat-list-item:last-of-type{
            margin-bottom: 64px;
        }
    `],
    template: `
    <md-list>
        <h1 md-subheader class="header">Playlist
            <md-icon mdTooltip="Create new playlist" [routerLink]="['/playlist/create/0']" class="pull-right pointer">playlist_add</md-icon></h1>
        <md-list-item [routerLinkActive]="['active']" *ngFor="let playlist of playlists" class="pointer" (click)="change(playlist)">
            <h3 md-line title="{{playlist.name}}" class="text-ellipsis">{{playlist.name}}</h3>
        </md-list-item>
    </md-list>`,
    providers: [PlaylistService, LoginService]
})
export class PlaylistWidgetComponent implements OnInit{
    private playlists:any;
    private user:any;
    constructor(
        private ngZone: NgZone,
        private loginService: LoginService,
        private playlistService:PlaylistService,
        private router: Router
    ){
    }
    events(){
        onLoginUser.subscribe( (user) =>{
            this.user = user;
            this.playlistService.list(this.user._id).subscribe( (result:any)=>{
                if( result.status == true)
                    this.playlists = result.playlists;
            this.ngZone.run(()=>{});
            })
        })
    }
        
    ngOnInit(){
        this.events();
        this.user = this.loginService.getUser();
        if(this.user){
            this.playlistService.list(this.user.use_name).subscribe( (result:any)=>{
                if( result.status == true)
                    this.playlists = result.playlists;
            })
        }
    }
    
    change(playlist:any){
        this.playlistService.changePlaylist(playlist);
    }
 }