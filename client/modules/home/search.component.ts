import { Component } from '@angular/core';

@Component({
    styles: [`
      .home .search-text{
        background-color: #333333 !important;
        color: white !important;
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
        <div class="list-group">
          <a *ngFor="let video of videos" class="list-group-item" >{{video.snippet.title}}
            <i (click)="play(video)" class="glyphicon glyphicon-play pull-right"></i>
          </a>
        </div>
      </div>`
})
export class SearchComponent{
    private maxResults = 20;
    private queryString:string = '';
    private videos: Array<any>;
    constructor(){
      this.queryString = '';
      this.videos = [];
    }
}