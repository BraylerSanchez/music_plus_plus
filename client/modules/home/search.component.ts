import { Component } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';

@Component({
    styles: 
    [`
    .home .search-text{
        background-color: #333333 !important;
        color: white !important;
      }
    #channel{
            color: #ccc;
        }
    #thumbnail{
            border-radius: 5px;
        }
    `],
    template: `
      <div class="inner cover">
        <form class="home">
          <div class="input-group input-group-lg">
            <input class="form-control" (keyup)="handleKeyup($event)" placeholder="Search music on youtube" name="queryString" [(ngModel)]="queryString" aria-describedby="sizing-addon1"> 
            <span class="input-group-btn">
              <button class="btn btn-default search-button" type="button" (click)="search()">Go!</button>
            </span>
          </div>
        </form>
        
  <div *ngFor="let video of videos">
    <div class="media-left">
      <a href="#">
        <img id="thumbnail" class="media-object" src="{{ video.thumbnail }}" alt="...">
      </a>
    </div>
    <div class="media-body">
      <h4 class="media-heading">{{ video.title }}</h4>
      <span id="channel">{{ video.channel }}</span>
      <i (click)="onPlayMusic(video)" class="glyphicon glyphicon-play pull-right"></i>
    </div>
  </div>
        
      </div>`,
      providers: [PlayerService]
})
export class SearchComponent{
    private maxResults = 20;
    private queryString:string = '';
    private videos: Array<any>;
    constructor(playerService: PlayerService){
      //this.queryString = '';
      playerService.search(this.queryString)
      .subscribe( (videos) =>{        
        this.videos = videos;      
      });
    }
}
///

