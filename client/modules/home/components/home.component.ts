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
      `],
  template: `
      <md-input-container class="search-input text-center">
        <input mdInput
         (keyup)="handleKeyup($event)" 
         name="queryString" [(ngModel)]="queryString"
          #searchInput placeholder="Search music and press ENTER" />
      </md-input-container>
      <md-card *ngFor="let playlist of playLists" >
        <md-card-header>
          <div md-card-avatar class="example-header-image"></div>
          <md-card-title>{{playlist.origin.name}}</md-card-title>
          <md-card-subtitle>{{playlist.origin.description}}</md-card-subtitle>
        </md-card-header>
        <img md-card-image src={{playlist.userPictureUrl}} />

        <md-card-content>
          <p>{{playlist.userName}} </p>
          <p>{{playlist.origin.sounds.length}} Song(s)</p>
        </md-card-content>

        <md-card-actions>
          <button md-button (click)="play(playlist.origin)">Listen</button>
          <button md-button>SHARE</button>
        </md-card-actions>
      </md-card>`,
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