import { Component, OnInit} from '@angular/core';
import { IPlayList } from '../../../interfaces/playlist/playlist.interface';
import { PlaylistService } from '../../../services/playlist/playlist.service';
@Component({
  templateUrl: 'client/modules/home/components/home.component.html',
  providers: [PlaylistService]
})
export class HomeComponent implements OnInit{
  private sharedPlaylists:Array<any> = [];
  constructor(
    private playlistService: PlaylistService
  ) {
  }

  ngOnInit(){
    	this.loadSharedPlaylist();
  }

  loadSharedPlaylist(){
    this.playlistService.searchShared().subscribe( (result:any) =>{
      if(result.status == true)
        this.sharedPlaylists = <Array<any>>result.playlist;
    })
  }

  play( playlist:IPlayList){
    this.playlistService.changePlaylist(playlist);
  }

}