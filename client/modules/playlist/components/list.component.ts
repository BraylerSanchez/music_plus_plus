import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistService } from '../../../services/playlist/playlist.service';
import { LoginService } from '../../../services/user/login.service';

import { IPlayList, ISharedPlayList } from '../../../interfaces/playlist/playlist.interface'

@Component({
    selector: 'playList',
    styles: [`
    `],
    template: `
        <div>
        <h1>Playlists</h1>
        <div class="col-lg-12 no-padding-l-r">
            <div class="col-lg-12 text-right margin-bottom-xs">
                <a class="btn btn-success" (click)="toCreate()">
                    <i class="glyphicon glyphicon-plus-sign"></i> Create New
                </a>
            </div>
            <table class="table table-striped" *ngIf="playLists.length > 0">
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
                            <a class="btn btn-xs btn-primary" (click)="share(playlist)">
                                Share <i class="fa fa-share-alt"></i>
                            </a>
                        </td>
                        <td>
                            <a class="btn btn-xs btn-primary" (click)="play(playlist)">
                                Listen <i class="fa fa-play-circle-o"></i>
                            </a>
                        </td>
                        <td>
                            <a class="btn btn-xs btn-warning" [routerLink]="['/playlist/create', playlist._id]">
                                Edit <i class="fa fa-pencil"></i>
                            </a>
                            <a class="btn btn-xs btn-danger" (click)="delete(playlist['_id'])">
                                Remove <i class="fa fa-times"></i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="col-lg-12" *ngIf="playLists.length <= 0">
                <div class="alert alert-warning">
                    Click on <a class="btn btn-success" (click)="toCreate()"><i class="glyphicon glyphicon-plus-sign"></i> Create New</a>
                    to start create playlist.
                </div>
            </div>
        </div>
        </div>
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
    
    toCreate(): void{
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
        let userId:number = Number(this.loginService.getUser()._id);
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
            userPictureUrl: this.loginService.getUser().thumbnail,
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