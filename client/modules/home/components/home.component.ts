import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { IPlayList } from '../../../interfaces/playlist/playlist.interface';
import { PlaylistService } from '../../../services/playlist/playlist.service'

@Component({
  styles: [`
      .search-input{
        margin-top: 15px;
        width: 100%;
      }
      
      .music-container{
        overflow-y: auto;
        max-height: 450px;
      }
      .card-img{
        margin: 0;
        width: 100%;
        height: 90px;
      }
      .music-card{    
        width: 175px;
        padding: 10px;
        margin: 10px;
        display: inline-block;
        height: 200px;
      }
      `],
  template: `
      <md-input-container class="search-input text-center">
        <input mdInput
         (keyup)="handleKeyup($event)" 
         name="queryString" [(ngModel)]="queryString"
          #searchInput placeholder="Search music and press ENTER" />
      </md-input-container>
      
      <div class="music-container">
        <md-card class="music-card" *ngFor="let playlist of playLists">
          <md-card-header>
            <md-card-title class="text-ellipsis" mdTooltip="{{playlist.userName}}">{{playlist.userName}}</md-card-title>
          </md-card-header>
          <img md-card-image class="card-img" [src]="playlist.userPictureUrl">
          <md-card-content style="margin-bottom: 5px;">
            <p class="text-ellipsis" mdTooltip="{{playlist.origin.name}}" >{{playlist.origin.name}}</p>
            {{playlist.origin.sounds.length}} sounds
          </md-card-content>
          <md-card-actions>
            <button md-raised-button color="primary" class="md-block" (click)="play(playlist.origin)">
              <md-icon>playlist_play</md-icon> Play now
            </button>
          </md-card-actions>
        </md-card>
      </div>`,
  providers: [PlaylistService]
})
export class HomeComponent {
  private queryString: string;
  private playLists: any[] = [];
  private profile: any;


  constructor(
    private router: Router,
    private playlistService: PlaylistService
  ) {
    this.queryString = '';
    this.searchSharedPlaylist();
  }
  handleKeyup(e: any) {
    if (e.keyCode == 13) {
      this.search();
    }
  }

  search(): void {
    if (this.queryString.length <= 0) {
      alert('Insert text to search.');
      return;
    }
    this.router.navigate(['/search', this.queryString])
  }

  searchSharedPlaylist(): void {
    this.playlistService.searchShared().subscribe((response) => {
      if (response.status == true) {
        this.playLists = response.playlist;

      } else {
        alert(response.message);
      }

    });
  }

  play(playlist: IPlayList) { //Este metodo reproduce listas locales, averiguar como reproducir las compartidas.
    this.playlistService.changePlaylist(playlist);
  }

}