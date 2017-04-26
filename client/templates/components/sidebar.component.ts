import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IPlayList } from '../../interfaces/playlist/playlist.interface';
import { Sound } from '../../interfaces/player/sound.interface';
import { PlayerService, onPlayMusic, onStopMusic, onSuspendMusic} from '../../services/player/player.service';
import { LoginService, onLoginUser, onLogoutUser } from '../../services/user/login.service';

import { PlaylistService, onAddSound, onRemoveSound, onPlaylistChange } from '../../services/playlist/playlist.service';
import { MdSidenav } from '@angular/material';
import { PlayingWidgetComponent }   from './playing.widget.component';
import { PlaylistWidgetComponent }   from './playlist.widget.component';

declare var window: any;

@Component({
  selector: 'sidebar',
    styles: [`
        .sidebar{
            position: fixed;
            width: 28px;
            transition: 1s;
            left: 0;
            top: 0;
        }
        .sidebar ul.sidebar-menu{
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

        .sidebar a{
            margin-right: 3px;
        }
        .sidevar{
            height: 100%;
            transition: 1s;
        }
        .mat-sidenav{
            width: 100%;
        }
        .fixed-sidenav{    
            position: fixed;
            border-right: solid 2px gray;
        }
    `],
    template: `
    <md-sidenav-container class="sidevar fixed-sidenav"  [ngStyle]="{'width': active != ''? menuLeft + 'px' : '0px'}">
        <md-sidenav #sidenav class="sidevar" mode="push">
            <div class="home" *ngIf="active == 'menu'">
                <menu class="p-m-zero"></menu>
            </div>
            <div class="nowplay" *ngIf="active == 'playlist'">
                <playlist class="p-m-zero"></playlist>
            </div>
            <div class="nowplay" *ngIf="active == 'nowplay'">
                <playingList class="p-m-zero" (onMusicAdd)="musicAdd($event)"></playingList>
            </div>
        </md-sidenav>
    </md-sidenav-container>
    <div class="sidebar" [ngStyle]="{'left': active != ''? menuLeft + 'px': '0px'}">
        <ul class="sidebar-menu">
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
    </div>
    <player></player>`,
    providers: [PlayerService, LoginService, PlaylistService]
})
export class SideBarComponent implements OnInit{
    @ViewChild('sidenav') sidenav:MdSidenav;

    @ViewChild(PlayingWidgetComponent) playingWidgetComponent: PlayingWidgetComponent;
    @ViewChild(PlaylistWidgetComponent) playlistWidgetComponent: PlaylistWidgetComponent;
    
    private active:string;
    private isPlaying = false;
    private windowHeight:number = 512;
    private menuLeft: number = 256;
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
    
    musicAdd(result:any){
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
        window.addEventListener('resize', (event:any) => {
            this.resizeSideBar();
        });
        this.resizeSideBar();
        this.user = this.loginService.getUser();
    }
    
    setActive(menu:any){
        if(menu == '')
            this.sidenav.close();
        else
            this.sidenav.open();
        if( menu == this.active){
            this.active ='';
            return;
        }
        this.active = menu;
    }
    
    hide(){
        this.active = '';
    }
}