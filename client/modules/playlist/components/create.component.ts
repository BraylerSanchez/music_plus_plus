import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchComponent } from '../../home/components/search.component';
import { PlayListDetailComponent } from './playlistdetail.component';
import { SongListComponent } from './songlist.component';
import { IPlayList } from '../../../interfaces/playlist/playlist.interface';
import { PlaylistService } from '../../../services/playlist/playlist.service';

@Component({
    selector: 'playlistcreate',
    styles: [ `
        search div.cover {
            margin-top: 0px !important;
        }
        
    `
    ],
    styleUrls: ['modules/playlist/components/wizardtemplate.css'],
    template: ` 
        <h3>Playlist create wizard</h3>
        <div class="container col-lg-12">
        	<div class="row">
        		<section>
                <div class="wizard">
                    <div class="wizard-inner">
                        <div class="connecting-line"></div>
                        <ul class="nav nav-tabs" role="tablist">
                            <li role="presentation" [ngClass]="{'active': step == 1, 'disabled': step > 1}">
                                <a role="tab" title="Creat list detail">
                                    <span class="round-tab">
                                        <i class="glyphicon glyphicon-pencil" aria-hidden="true"></i> 
                                    </span>
                                </a>
                            </li>
        
                            <li role="presentation" class="" [ngClass]="{'active': step == 2, 'disabled': step < 2}">
                                <a data-toogle="tab" title="Select songs">
                                    <span class="round-tab">
                                        <i class="glyphicon glyphicon-th-list" aria-hidden="true"></i>
                                    </span>
                                </a>
                            </li>
                            
                            <li role="presentation" [ngClass]="{'active': step=='3', 'disabled': step < 3}">
                                <a  title="Complete">
                                    <span class="round-tab">
                                        <i class="glyphicon glyphicon-ok" aria-hidden="true"></i>
                                    </span>
                                </a>
                            </li>
                            
                        </ul>
                    </div>
                    
                    <form role="form">
                        <div class="tab-content">
                        <div class="">
                            <a class="btn btn-default pull-left" (click)="toCancel()">
                                <i class="fa fa-times" ></i> Cancel
                            </a>
                            <button *ngIf="step === 1 || step === 2" class="btn btn-primary pull-right">
                                Next <i class="fa fa-arrow-right " aria-hidden="true" ></i> 
                            </button>
                            <h1> </h1>
                            <button *ngIf="step === 2 || step === 3" class="btn btn-primary pull-right">
                                <i class="fa fa-arrow-left " aria-hidden="true" ></i> Previous
                                
                            </button>
                            <button *ngIf="step === 3" class="btn btn-success pull-right">
                                Save <i class="fa fa-check" aria-hidden="true" ></i> 
                            </button>
                        </div>
                            <div class="tab-pane active" role="tabpanel" [ngClass]="{'active': step==1}">
                                <playlistdetail 
                                (onSave)="step1Save($event)"
                                [playlist]="playlist"
                                ></playlistdetail>
                            </div>
                            <div class="tab-pane" role="tabpanel" [ngClass]="{'active': step==2}">
                                <div class="col-sm-6">
                                    <h3>Play list:</h3>
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
                                <h3>Complete</h3>
                                <p>You have successfully completed all steps.</p>
                                <div class="form-group">
                                    <button class="btn btn-default pull-left" type="button" (click)="this.router.navigate(['/home'])">
                                        <i class="fa fa-arrow-left " aria-hidden="true" ></i> Cancel
                                    </button>
                                    <button class="btn btn-primary pull-right">
                                        Next <i class="fa fa-arrow-right " aria-hidden="true" ></i> 
                                    </button>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </form>
                </div>  
                </section>    
            </div>        
        </div>
    
    
    `,
    providers: [PlaylistService]
})

export class CreateListComponent{
    private step:number = 1;
    @ViewChild(SearchComponent) searchComponent: SearchComponent;
    @ViewChild(PlayListDetailComponent) playlistdetailComponent: PlayListDetailComponent;
    @ViewChild(SongListComponent) songlistComponent : SongListComponent;
    private playlist = { name: '', description: '', sounds: [] };
    
    constructor(
        private router:Router, 
        private routerParams: ActivatedRoute,
        private playlistService: PlaylistService
    ){
        this.routerParams.params.subscribe((params) => {
           var id = params['_id'];
           this.playlistService.get(id).subscribe((result) => {
               this.playlist = result.playlist;
           })
        });
    }
    
    toCancel(): void{
        this.router.navigate(['/playlist/list'])
    }
    
    step1Save(playlist){
        this.step = 2;
        this.playlist.name = playlist;
        this.playlist.description = playlist;
    }
}