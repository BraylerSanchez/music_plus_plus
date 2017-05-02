import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { IPlayList, ISharedPlayList } from '../../../interfaces/playlist/playlist.interface';
import { PlayListModel } from '../../../models/playlist/playlist.model'
import { PlaylistService } from '../../../services/playlist/playlist.service';
import { LoginService } from '../../../services/user/login.service';
import { PlayerService } from '../../../services/player/player.service';
import {MdSnackBar} from '@angular/material';

@Component({
    templateUrl: 'client/modules/playlist/components/create.dialog.component.html',
    providers: [PlaylistService, LoginService, PlayerService]
})

export class CreatePlaylistDialog implements OnInit{
    private playlist:IPlayList;
    constructor(
        private router:Router, 
        private routerParams: ActivatedRoute,
        private playlistService: PlaylistService,
        private loginService: LoginService,
        private dialogRef: MdDialogRef<CreatePlaylistDialog>,
        private snackBar: MdSnackBar
    ){
        this.playlist = new PlayListModel();
    }
    
    ngOnInit(){
    }

    dialogOpen(playlist?:IPlayList){
        if(playlist)
            this.playlist = playlist;
        else{
            this.playlist.name = '';
            this.playlist.description = '';   
        }
    }

    save(){
        this.playlist.userAt = this.loginService.getUser().user_name;
        var response;
        if( this.playlist._id){
            response = this.playlistService.update( this.playlist._id, this.playlist);
        }else{
            response = this.playlistService.save(this.playlist);
        }
        response.subscribe((result) => {
            if(result.status === true){
                if( this.playlist.shared){
                    this.share(result.playlist)
                }
                this.snackBar.open(result.message, 'Playlist', {
                    duration: 5000,
                });
                this.dialogRef.close();
            }
            else{
                alert(result.message);
            }
        });
    }
    
    share(_playlist:IPlayList){
        var sharedPlaylist: ISharedPlayList ={
            origin: _playlist,
            playbacks: new Array<Date>(),
            userAt: this.loginService.getUser().user_name,
            userName: this.loginService.getUser().name,
            userPictureUrl: this.loginService.getUser().avatar_url,
            createAt: new Date()
        };
        this.playlistService.share(sharedPlaylist).subscribe((response) => {
            if( response.status == true){
                //Playlist shared success
            }else{
                console.warn('playlist shared error: ' + response.message)
            }
        });
    }
}