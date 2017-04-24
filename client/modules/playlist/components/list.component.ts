import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistService } from '../../../services/playlist/playlist.service';
import { LoginService } from '../../../services/user/login.service';

import { IPlayList, ISharedPlayList } from '../../../interfaces/playlist/playlist.interface'

@Component({
    styles: [`

    `],
    template: `
        <h1>Playlists</h1>
        <div class="text-right">
            <button md-raised-button color="primary" (click)="create()">
                <md-icon>playlist_add</md-icon> New playlist
            </button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Sound Length</th>
                    <th>Share</th>
                    <th>Play</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let playlist of playLists">
                    <td>{{playlist.name}}</td>
                    <td>{{playlist.description}}</td>
                    <td>{{playlist.sounds.length}}</td>
                    <td>
                        <button md-button (click)="share(playlist)">
                            Share <md-icon>share</md-icon>
                        </button>
                    </td>
                    <td>
                        <button md-button (click)="play(playlist)">
                            Listen <md-icon>playlist_play</md-icon>
                        </button>
                    </td>
                    <td>
                        <button md-button [routerLink]="['/playlist/create', playlist._id]">
                            Edit <md-icon>edit</md-icon>
                        </button>
                        <button md-button (click)="delete(playlist['_id'])">
                            Remove <md-icon>clear</md-icon>
                        </button>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr *ngIf="playLists.length <= 0">
                    <td colspan="6" class="text-center">
                        No playlist, press new playlist.
                    </td>
                </tr>
            </tfoot>
        </table>
    `,
    providers: [PlaylistService, LoginService]
})
export class PlayListComponent implements OnInit{
    private queryString:string;
    private playLists:any[] = [];
    constructor(
        private router:Router,
        private playlistService: PlaylistService,
        private loginService: LoginService
    ){
        this.queryString = "";
    }
    
    ngOnInit(){
        this.load();
    }
    
    create(): void{
        this.router.navigate(['/playlist/create/0'])
    }
    
    play(playlist:any){
        this.playlistService.changePlaylist(playlist);
    }
    
    delete(_id:string){
        let result = confirm('Do you want delete this playList?');
        if(result == true){
            this.playlistService.delete(_id).subscribe( (result:any)=>{
                if( result.status == true){
                    alert('Playlist delete success')
                    this.load();
                }else{
                    alert(result.message)
                }
            })
        }
    }
    
    load(){
        let userId:string = this.loginService.getUser()._id;
        this.playlistService.list(userId).subscribe( (result:any) =>{
            if( result.status == true){
                this.playLists = result.playlists;
            }else{
                alert(result.message)
            }
        })
    }
    
    share(_playlist:any){
        var sharedPlaylist: ISharedPlayList ={
            origin: _playlist,
            sharedPlaylists: new Array<IPlayList>(),
            userAt: this.loginService.getUser()._id,
            userName: this.loginService.getUser().name,
            userPictureUrl: this.loginService.getUser().avatar_url,
            createAt: new Date()
        };
        this.playlistService.share(sharedPlaylist).subscribe((response) => {
            if( response.status == true){
                alert(response.message)
            }else{
                alert(response.message)
            }
        });
    }
}