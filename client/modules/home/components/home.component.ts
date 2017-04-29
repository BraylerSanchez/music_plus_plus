import { Component, OnInit} from '@angular/core';
import { IPlayList, ISharedPlayList } from '../../../interfaces/playlist/playlist.interface';
import { PlaylistService } from '../../../services/playlist/playlist.service';
@Component({
  templateUrl: 'client/modules/home/components/home.component.html',
  providers: [PlaylistService]
})
export class HomeComponent implements OnInit{
  private sharedPlaylists:Array<ISharedPlayList> = [];
  constructor(
    private playlistService: PlaylistService
  ) {
  }

  ngOnInit(){
    this.reload();
  }

  loadSharedPlaylist(){
    this.playlistService.searchShared().subscribe( (result:any) =>{
      if(result.status == true)
        this.sharedPlaylists = <Array<ISharedPlayList>>result.playlist;
    })
  }

  play( playlist:IPlayList){
    this.playlistService.changePlaylist(playlist);
  }

    reload(){
      this.loadSharedPlaylist();
    }
}