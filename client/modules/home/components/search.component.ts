import { Component, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PlayerService, onPlayMusic, onStopMusic } from '../../../services/player/player.service';

@Component({
    selector: 'search',
    styles: 
    [`
    .home .search-button{
        background-color: #333333 !important;
        color: white !important;
      }
      
      .playing{
        content:url("assest/images/equalizer.gif");
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
            <input class="form-control" (keyup)="handleKeyup($event)" placeholder="Search music on youtube" name="queryString" [(ngModel)]="queryString" aria-describedby="sizing-addon1"> 
            <span class="input-group-btn">
              <i class="fa fa-search btn btn-default search-button" type="button" (click)="search()"></i>
            </span>
          </div>
        </form>
        <div class="list-group">
          <div class="video list-group-item" *ngFor="let video of videos">
            <div class="media-left">
              <span>
                <img id="
                " class="media-object" src="{{ video.thumbnail }}" alt="...">
              </span>
            </div>
            <div class="media-body text-left">
              <div class="media-heading">
                <h4 id="title" >{{ video.title }}<i class="fa fa-plus pull-right"
                [ngClass]="{ 'fa-minus': video.isOnList, 'fa-plus': !video.isOnList }" (click)="addToList(video)"></i>
                <img class="glyphicon pull-right" *ngIf="video.id == currentSound.id" [ngClass]="{ 'playing': video.id == currentSound.id }">
                </h4>
              </div>
              <span (click)="play(video)" id="channel">{{ video.channel }}</span>
              <span class="pull-right">{{ video.dateAt | date }}</span>
              
            </div>
          </div>
        </div>
        <div *ngFor="let cancion of canciones; let i = index">
        <ul>
          <li>{{ i }} - {{ cancion.isOnList }} - {{cancion.title}}</li>
        </ul>
        </div>
      </div>`,
      providers: [PlayerService]
})
export class SearchComponent{
    private queryString:string;
    private videos: Array<any>;
    private canciones = [];
    private isOnList = false;
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
    
addToList(cancion: any){
    if(!cancion.isOnList){

      cancion.isOnList = !this.isOnList;
      this.canciones.push(cancion);

    }else{
      
      for( var i=this.canciones.length-1; i>=0; i--) {
        if( this.canciones[i].id == cancion.id){
          cancion.isOnList = this.isOnList;
          this.canciones.splice(i,1);
        }
      }
    }
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
      this.playerService.search(this.queryString)
      .subscribe( (videos) =>{
        this.videos = videos;
      })
    }
    
    play(video){
      this.playerService.getMusic(video);
    }
}