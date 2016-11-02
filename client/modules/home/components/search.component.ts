import { Component, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PlayerService, onPlayMusic, onStopMusic } from '../../../services/player/player.service';

@Component({
    styles: 
    [`
    .home .search-button{
        background-color: #333333 !important;
        color: white !important;
      }
      
      .playing{
        content:url("http://rs339.pbsrc.com/albums/n442/mcrmy_derick/equalizer.gif~c200");
        height: 10%;
        width: 10%;
      }
      
      .video{
        color: #333333;
      }

    .media-object{
            border-radius: 5px !important;
        }
    `],
    template: `
      <div class="inner cover">
        <form class="home">
          <div class="input-group input-group-lg">
            <input class="form-control" placeholder="Search music on youtube" name="queryString" [(ngModel)]="queryString" aria-describedby="sizing-addon1"> 
            <span class="input-group-btn">
              <button class="btn btn-default search-button" type="button" (click)="search()">Go!</button>
            </span>
          </div>
        </form>
        <div class="list-group">
          <div class="video list-group-item" *ngFor="let video of videos" (click)="play(video)">
            <div class="media-left">
              <span>
                <img id="
                " class="media-object" src="{{ video.thumbnail }}" alt="...">
              </span>
            </div>
            <div class="media-body text-left">
              <h4 id="title" class="media-heading">{{ video.title }}
              <img class="glyphicon pull-right" *ngIf="video.id == currentSound.id" [ngClass]="{ 'playing': video.id == currentSound.id }">
              </h4>
              <span id="channel">{{ video.channel }}</span>
              
              <span class="pull-right">{{ video.dateAt | date }}</span>
            </div>
          </div>
        </div>
      </div>`,
      providers: [PlayerService]
})
export class SearchComponent{
    private queryString:string;
    private videos: Array<any>;
    private currentSound: any = {
      id: ''
    };
    private audioContext:any;
    
    constructor(
      private playerService: PlayerService,
      private router: ActivatedRoute,
      private ngZone: NgZone
    ){
      this.queryString = '';
      this.videos = [];
      this.router.params.subscribe( (params) =>{
        if( params['query'] != '0'){
          this.queryString = params['query'];
          this.search();
        }
      })
      
      onPlayMusic
         .subscribe( (response) => {
            this.currentSound = response['details'];
      });
      onStopMusic
       .subscribe( (sound) => {
            this.currentSound = sound;
            this.ngZone.run(()=>{});
      });
    }
    
   search(): void{
      if( this.queryString.length <=0){
        alert('Insert text to search.');
        return;
      }
      this.playerService.search(this.queryString)
      .subscribe( (videos) =>{
        this.videos = videos;
      })
    }
    
    play(video){
      this.playerService.getMusic(video);
    }
}