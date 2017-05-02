import { Component, OnInit, NgZone} from '@angular/core';
import { MdDialog } from '@angular/material';
import { LoginDialogComponent } from './login.dialog.component';
import { IUser } from '../../interfaces/user/user.interface';
import { IPlayList } from '../../interfaces/playlist/playlist.interface';
import { LoginService, onLoginUser, onLogoutUser } from '../../services/user/login.service';
import { PlaylistService, onPlaylistChange } from '../../services/playlist/playlist.service';
import { CreatePlaylistDialog } from '../../modules/playlist/components/create.component';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'sidebar-partial',
    styles: [``],
    templateUrl: 'client/templates/components/sidebar.partial.component.html',
    providers: [LoginService, PlaylistService]
})
export class SideBarComponent implements OnInit{
    private user:IUser = undefined;
    private playlists:Array<IPlayList> = [];
    constructor(
      private dialog:MdDialog,
      private loginService: LoginService,
      private playlistService: PlaylistService,
      private snackBar: MdSnackBar,
      private zone: NgZone
    ){
    }

    ngOnInit(){
      var user = <IUser>this.loginService.getUser();
      if( user){
        this.user = user;
        this.loadPlaylist();
      }
      
      onLoginUser.subscribe( (user:IUser) =>{
        this.user = user;
        this.loadPlaylist();
      })

      onLogoutUser.subscribe( () =>{
        this.user = undefined;
      })
      onPlaylistChange.subscribe( ()=>{
        this.loadPlaylist();
      })
    }

    login(){
      let dialog = this.dialog.open( LoginDialogComponent, {
        disableClose: true
      });
      dialog.afterClosed().subscribe( (data) =>{

      })
    }
    createPlaylist(playlist:IPlayList){
      let dialog = this.dialog.open( CreatePlaylistDialog, {
        disableClose: true
      });
      dialog.componentInstance.dialogOpen(playlist);
      dialog.afterClosed().subscribe( (data) =>{
          this.loadPlaylist();
      })
    }
    loadPlaylist(){
      this.playlistService.list(this.user.user_name).subscribe( (result:any) =>{
        if(result.status == true)
          this.playlists = <Array<IPlayList>>result.playlists;
          this.zone.run(()=>{})
      })
    }

    play( playlist:IPlayList){
      this.playlistService.changePlaylist(playlist);
    }
    editPalylist(event:Event, playlist:IPlayList){
      this.createPlaylist(playlist);
      event.stopPropagation();
      event.preventDefault();
    }
    detelePlaylist(event:Event, playlist:IPlayList){
      var confirmResult = confirm('Do yo want delete this playlist?');
      if(confirmResult){
        this.playlistService.delete(playlist._id).subscribe( (result:any)=>{
          this.snackBar.open(`${playlist.name} was deleted success.`, 'Playlist', {
            duration: 5000,
          });
          this.loadPlaylist();
        })
      }
      event.stopPropagation();
      event.preventDefault();
    }
}