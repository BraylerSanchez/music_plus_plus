import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IPlayList } from '../interfaces/playlist/playlist.interface';
import { Sound } from '../interfaces/player/sound.interface';
import { PlayerService, onPlayMusic, onStopMusic, onSuspendMusic} from '../services/player/player.service';
import { LoginService, onLoginUser, onLogoutUser } from '../services/user/login.service';

import { PlaylistService, onAddSound, onRemoveSound, onPlaylistChange } from '../services/playlist/playlist.service';

import { PlayingWidgetComponent }   from './components/playing.widget.component';
import { PlaylistWidgetComponent }   from './components/playlist.widget.component';

declare var window: any;

@Component({
  selector: 'sidebar',
    styles: [`
        .sidebar{
            position: fixed;
            left: 0;
            top: 0;
        }
        .sidebar ul.sidebar-menu{
            transition: 1s;
            position: relative;
            margin: 0;
            padding: 0;
            text-align: left;
        }
        .sidebar ul.sidebar-menu li:first-of-type{
            margin-top: 0px;
        }
        .sidebar ul.sidebar-menu li{
            border-top: #333333 solid 1px;
            border-right: #333333 solid 1px;
            border-left: #333333 solid 1px;
            font-size: 12pt;
            display: block;
            width: 128px;
            text-transform: uppercase;
            margin-right: 10px;
            margin-top: 109px;
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            transform: rotate(90deg);
            -webkit-transform-origin: 0 100%;
            -moz-transform-origin: 0 100%;
            -o-transform-origin: 0 100%;
            transform-origin: 0 100%;
            background-color: white;
            border-top-left-radius: 24px;
            border-top-right-radius: 24px;
            text-align: center;
            padding-top: 5px;
            color: black;
            cursor: pointer;
            transition: 1s;
        }
        
        .sidebar ul.sidebar-menu li:hover{
            box-shadow: 0px 0px 5px white;
            color: white;
            background-color: #333333;
        }
        
        .sidebar ul.sidebar-menu li.active{
            box-shadow: 0px 0px 5px white;
            color: white;
            background-color: #5bc0de;
        }
        
        .sidebar div.menu{  
            background-color: white; 
            width: 213px;
            box-shadow: 0px 0px 5px;
            left: 0;
            top: 0;
            position: absolute;
            transition: 1s;
            overflow-x: auto;
            border-right: solid #333333 1px;
        }
        
        .sidebar div.menu::-webkit-scrollbar {
            width: 7px;
        }
         
        .sidebar div.menu::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        }
         
        .sidebar div.menu::-webkit-scrollbar-thumb {
            background-color: rgb(84, 189, 220);
            outline: 1px solid #999;
            border-radius: 10px;
        }
        
        .sidebar div.menu .home ul{
            padding: 0px;
        }
        .sidebar div.menu .home ul li.title{
            background-color: #333333;
            padding: 5px;
            font-size: 11pt;
            color: white;
        }
        .sidebar div.menu .home ul li{
            padding: 5px;
            font-size: 9pt;
            border-bottom: 1px solid #d0d0d0;
            color: #333333;
            cursor: pointer;
        }
        .sidebar div.menu .home ul li.active{
            background-color: #5bc0de;
        }
        .sidebar div.menu .home ul li{
            font-size: 12pt;
            text-align: left;
            padding-left: 30px;
        }
        .sidebar div.menu .home ul li a{
            color: #333333;
        }
        .sidebar div.menu .home ul li:hover{
            background-color: #e4e4e4;
        }
        .sidebar div.menu .nowplay ul li h5{
            width: 90%;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .sidebar a{
            margin-right: 3px;
        }
    `],
    template: `
    <div class="sidebar">
        <ul class="sidebar-menu" [ngStyle]="{'left': active != ''? menuLeft : '0px'}">
            <li [ngClass]="{'active': active == 'menu'}" (click)="setActive('menu')" >
                MENU
            </li>
            <li [ngClass]="{'active': active == 'playlist'}" (click)="setActive('playlist')" *ngIf="user">
                PLAYLIST
            </li>
            <li [ngClass]="{'active': active == 'nowplay'}" (click)="setActive('nowplay')">
                PLAYING
                <i *ngIf="isPlaying" class="fa fa-volume-up"></i>
            </li>
        </ul>
        <div class="menu" [ngStyle]="{'width': active != ''? menuLeft : '0px', 'opacity': active != ''? '1':'0', 'height': windowHeight}">
            <div class="home" *ngIf="active == 'menu'">
                <ul>
                    <li class="title">
                    <h3><i class="fa fa-music fa-1x"></i> MUSIC++ </h3></li>
                    <li  [routerLinkActive]="['active']" >
                        <a [routerLink]="['/home']" >
                            <i class="fa fa-home fa-1x"></i> Home
                        </a>
                    </li>
                    <li  [routerLinkActive]="['active']" *ngIf="user" >
                        <a [routerLink]="['/playlist/list']" >
                            <i class="fa fa-list  fa-1x"></i> Playlist
                        </a>
                    </li>
                    <li  [routerLinkActive]="['active']" >
                        <a [routerLink]="['/search/0']" >
                            <i class="fa fa-search fa-1x"></i> search
                        </a>
                    </li>
                    <li>
                        <span *ngIf="user">{{user.name}}</span>
                        <a *ngIf="user" class="btn btn-warning btn-xs" (click)="logout()">
                            <i class="fa fa-sign-out "></i> Sing-Out
                        </a>
                        <a *ngIf="!user" class="btn btn-primary btn-xs" (click)="login()">
                            <i class="fa fa-google"></i> Sing-In
                        </a>
                    </li>
                </ul>
            </div>
            <div class="nowplay" *ngIf="active == 'playlist'">
                <playlist></playlist>
            </div>
            <div class="nowplay" *ngIf="active == 'nowplay'">
                <playingList (onMusicAdd)="musicAdd($event)"></playingList>
            </div>
        </div>
    </div>`,
    providers: [PlayerService, LoginService, PlaylistService]
})
export class SideBarComponent implements OnInit{
    @ViewChild(PlayingWidgetComponent) playingWidgetComponent: PlayingWidgetComponent;
    @ViewChild(PlaylistWidgetComponent) playlistWidgetComponent: PlaylistWidgetComponent;
    
    private active:string;
    private isPlaying = false;
    private windowHeight:number = 512;
    private menuLeft: number = 250;
    private user: any;
    constructor(
        private loginService: LoginService,
        private ngZone: NgZone,
        private router: Router
    ){
        this.active = '';
        onStopMusic
            .subscribe( (response) => {
                this.resizeSideBar();
                this.isPlaying = false;
            })
        onLoginUser.subscribe( (user) =>{
            this.user = user;
            this.ngZone.run(()=>{});
        })
        onLogoutUser.subscribe( ()=>{
            this.user = undefined;
            this.ngZone.run(()=>{});
        })
    }
    
    musicAdd(result){
        if(result.result){
            this.resizeSideBar();
            this.isPlaying = true;
        }
        this.active = 'nowplay';
    }
    
    resizeSideBar(){
        if( this.isPlaying == true){
            this.windowHeight = window.document.body.clientHeight - 48;
        }else{
            this.windowHeight = window.document.body.clientHeight;
        }
    }

    ngOnInit(){
        window.addEventListener('resize', (event) => {
            this.resizeSideBar();
        });
        this.resizeSideBar();
        this.user = this.loginService.getUser();
    }
    
    setActive(menu){
        if( menu == this.active){
            this.active ='';
            return;
        }
        this.active = menu;
    }
    
    hide(){
        this.active = '';
    }
    login(){
        this.loginService.login();
    }
    logout(){
        this.loginService.singOut();
        this.router.navigate(['/home']);
    }
}