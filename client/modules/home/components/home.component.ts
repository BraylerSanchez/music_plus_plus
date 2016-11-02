import { Component, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router'

@Component({
    styles: [`
      .home .search-button{
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
          <a *ngFor="let video of videos" class="list-group-item" >{{video.title}}
            <i *ngIf="currentSound.id != video.id" (click)="play(video)" class="glyphicon glyphicon-play pull-right"></i>
            <i *ngIf="currentSound.id == video.id" (click)="stop(video)" class="glyphicon glyphicon-pause pull-right"></i>
          </a>
        </div>
      </div>`
})
export class HomeComponent{
    private queryString:string;
    
    constructor(
      private router: Router
    ){
      this.queryString = '';
    }
    handleKeyup(e){
      if( e.keyCode == 13){
        this.search();
      }  
    }
    
    search(): void{
      if( this.queryString.length <=0){
        alert('Insert text to search.');
        return;
      }
      this.router.navigate(['/search', this.queryString])
    }
 }