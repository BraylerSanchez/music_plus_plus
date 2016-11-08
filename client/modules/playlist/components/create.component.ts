import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchComponent } from '../../home/components/search.component';
import { PlayListDetailComponent } from './playlistdetail.component';
import { SongListComponent } from './songlist.component';
import { IPlayList } from '../../../interfaces/playlist/playlist.interface';
import { PlaylistService } from '../../../services/playlist/playlist.service';
import { LoginService } from '../../../services/user/login.service';

@Component({
    selector: 'playlistcreate',
    styles: [ `
        search div.cover {
            margin-top: 0px !important;
        }
        .buttons {
            margin-top: 5px;
        }
        
    `
    ],
    styleUrls: ['modules/playlist/components/wizardtemplate.css'],
    template: ` 
        <div class="inner cover">
            <h3>Playlist create wizard</h3>
            <div class="container col-lg-12">
            	<div class="row">
                    <div class="wizard">
                        <div class="wizard-inner">
                            <div class="connecting-line"></div>
                            <ul class="nav nav-tabs" role="tablist">
                                <li role="presentation" [ngClass]="{'active': step == 1}">
                                    <a role="tab" title="Creat list detail">
                                        <span class="round-tab">
                                            <i class="glyphicon glyphicon-pencil" aria-hidden="true"></i> 
                                        </span>
                                    </a>
                                </li>
                                <li role="presentation" class="" [ngClass]="{'active': step == 2}">
                                    <a data-toogle="tab" title="Select songs">
                                        <span class="round-tab">
                                            <i class="glyphicon glyphicon-th-list" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                </li>
                                <li role="presentation" [ngClass]="{'active': step=='3'}">
                                    <a  title="Complete">
                                        <span class="round-tab">
                                            <i class="glyphicon glyphicon-ok" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="margin-bottom-xs margin-top-xs col-xs-12 no-padding-l-r">
                        <a class="btn btn-warning pull-left" (click)="toCancel()">
                            <i class="fa fa-times" ></i> Cancel
                        </a>
                        <a *ngIf="step === 1 || step === 2" class="btn btn-primary pull-right" (click)="toNext()">
                            Next <i class="fa fa-arrow-right " aria-hidden="true" ></i> 
                        </a>
                        <a *ngIf="step === 3" class="btn btn-success pull-right" (click)="toSavePlayList()">
                            Save <i class="fa fa-floppy-o" aria-hidden="true" ></i> 
                        </a>
                        <a *ngIf="step === 2 || step === 3" class="btn btn-primary pull-right margin-right-xs" (click)="toPrevious()">
                            <i class="fa fa-arrow-left " aria-hidden="true" ></i> Previous
                        </a>
                    </div>
                    <div class="tab-content col-lg-xs no-padding-l-r">
                        <div class="tab-pane active" role="tabpanel" [ngClass]="{'active': step==1}">
                            <playlistdetail 
                                (onSave)="step1Save($event)"
                                [playlist]="playlist">
                            </playlistdetail>
                        </div>
                        <div class="tab-pane" role="tabpanel" [ngClass]="{'active': step==2}">
                            <div class="col-sm-6">
                                <songlist
                                    [playlist]="playlist"
                                ></songlist>
                            </div>
                            <div class="col-sm-6">
                                <h3>Search songs:</h3>
                                <search
                                    [playlist]="playlist"
                                ></search>
                            </div>
                        </div>
                        <div class="tab-pane" role="tabpanel" [ngClass]="{'active': step==3}">
                            <h3>Summary</h3>
                            <h4>Name: {{playlist.name}} </h4>
                            <h4>Description: {{playlist.description}} </h4>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>
    `,
    providers: [PlaylistService, LoginService]
})

export class CreateListComponent{
    private step:number = 1;
    @ViewChild(SearchComponent) searchComponent: SearchComponent;
    @ViewChild(PlayListDetailComponent) playlistdetailComponent: PlayListDetailComponent;
    @ViewChild(SongListComponent) songlistComponent : SongListComponent;
    private playlist = { name: '', description: '', sounds: [], userAt: "" };
    
    constructor(
        private router:Router, 
        private routerParams: ActivatedRoute,
        private playlistService: PlaylistService,
        private loginService: LoginService
    ){
        this.routerParams.params.subscribe((params) => {
           var id = params['_id'];
           if( id == 'default'){
               this.playlist = this.playlistService.getCurrentPlaylist();
           }else{
               this.playlistService.get(id).subscribe((result) => {
                   this.playlist = result.playlist;
               })
           }
        });
    }
    
    toCancel(): void{
        this.router.navigate(['/playlist/list'])
    }
    
    toNext(): void{
        if(this.playlistdetailComponent.createListForm.valid ){
            if( this.playlistdetailComponent.createListForm.value.name == 'default' ){
                alert('playlist name can\'n be "default"');
                return;
            }
            if(this.step == 1){
                this.playlist.name = this.playlistdetailComponent.createListForm.value.name;
                this.playlist.description = this.playlistdetailComponent.createListForm.value.description;
                this.step = 2;
            }
            else if(this.step == 2){
                this.playlist.name = this.playlistdetailComponent.createListForm.value.name;
                this.playlist.description = this.playlistdetailComponent.createListForm.value.description;
                this.step = 3;
            }
        }
        else{
            alert('Information required.')
        }
    }
    
    toPrevious(): void{
        if(this.step == 2){
            this.step = 1;
        }
        else if(this.step == 3){
            this.step = 2;
        }
    }
    step1Save(playlist){
        this.step = 2;
        this.playlist.name = playlist;
        this.playlist.description = playlist;
    }
    
    toSavePlayList(){
        this.playlist.userAt = this.loginService.getUser()._id;
        this.playlistService.save(this.playlist).subscribe((result) => {
            if(result.status === true){
                alert(result.message);
                this.router.navigate(['/playlist/create/0']);
            }
            else{
                alert(result.message);
            }
        });
    }
}