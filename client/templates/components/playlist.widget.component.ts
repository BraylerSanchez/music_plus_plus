import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPlayList } from '../../interfaces/playlist/playlist.interface';

import { PlaylistService} from '../../services/playlist/playlist.service';
import { LoginService, onLoginUser, onLogoutUser } from '../../services/user/login.service';

@Component({
    styles: [`
        
        ul{
            padding: 0px;
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
    selector: 'playlist',
    template: `
    <ul>
        <li class="title">
            <h5>Playlist</h5>
            <a [routerLink]="['/playlist/create/0']" class="btn btn-xs btn-success">Create <i class="fa fa-plus"></i></a>
        </li>
        <li class="item" *ngFor="let playlist of playlists" (click)="change(playlist)">
            <span title="{{playlist.name}}">
                {{playlist.name}}
            </span>
        </li>
    </ul>`,
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
            this.playlistService.list(this.user._id).subscribe( (result)=>{
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
            this.playlistService.list(this.user._id).subscribe( (result)=>{
                if( result.status == true)
                    this.playlists = result.playlists;
            })
        }
    }
    
    change(playlist){
        this.playlistService.changePlaylist(playlist);
    }
 }