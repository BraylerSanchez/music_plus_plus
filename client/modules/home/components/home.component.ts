import { Component, ChangeDetectorRef, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistService } from '../../../services/playlist/playlist.service'

@Component({
    styles: [`
      .home .search-button{
        background-color: #333333 !important;
        color: white !important;
      }
.vcenter {
  margin-top: 30px;
}
  .vcenter span{
    font-size: 8pt;
  }
img{
  width: 100%;
}
.shared-container{
      padding: 5px !important;
}
      `
    ],
    template: `
      <div class="inner cover">
        <form class="home">
          <div class="input-group input-group-lg">
            <input class="form-control" (keyup)="handleKeyup($event)" placeholder="Search music on youtube" name="queryString" [(ngModel)]="queryString" aria-describedby="sizing-addon1"> 
            <span class="input-group-btn">
              <i class="btn btn-default fa fa-search search-button" type="button" (click)="search()"></i>
            </span>
          </div>
        </form>
          <div class="col-xs-12 no-padding-l-r margin-top-md" >
              <div class="col-xs-12 col-xs-6 col-md-4 col-lg-3 margin-top-md" *ngFor="let playlist of playLists">
                  <div class="col-xs-12 no-padding-l-r" style="background-color: #fff;border: #969696 solid 1px;">
                    <div class="col-xs-12 no-padding-l-r">
                      <img class="img-responsive" src={{playlist.userPictureUrl}} />
                    </div>
                    <div class="col-xs-12 shared-container">
                      <div class="text-left col-xs-12 no-padding-l-r">
                        <h6>{{playlist.origin.name}}<br/><small>{{playlist.origin.description}}</small></h6>
                      </div>
                      
                      <div class="col-xs-12 no-padding-l-r">
                          <button type="button" class="btn btn-xs btn-primary pull-right btn-block" (click)="play(playlist.origin)">
                            <i class=" fa fa-play"></i> Listen
                          </button>
                      </div>
                      <div class="vcenter col-xs-12 no-padding-l-r">
                        <div class="col-xs-6 no-padding-l-r text-left">
                          <span>{{playlist.userName}}</span> 
                        </div>
                        <div class="col-xs-6 no-padding-l-r text-right">
                          <span>{{playlist.origin.sounds.length}} Song(s)</span>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
      </div>`,
      providers: [PlaylistService]
})
export class HomeComponent{
    private queryString:string;
    private playLists = [];
    private profile: any;
    
    
    constructor(
      private router: Router,
      private playlistService: PlaylistService
    ){
      this.queryString = '';
      this.searchSharedPlaylist();
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
    
    searchSharedPlaylist():void{
      this.playlistService.searchShared().subscribe((response) => {
        if(response.status == true){
          this.playLists = response.playlist;
          
        }else{
          alert(response.message);
        }
        
      });
    }
    
    play(playlist){ //Este metodo reproduce listas locales, averiguar como reproducir las compartidas.
        this.playlistService.changePlaylist(playlist);
    }
   
 }