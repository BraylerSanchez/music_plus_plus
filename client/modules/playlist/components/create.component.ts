import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SearchComponent } from '../../home/components/search.component';
import { PlayListDetailComponent } from './playlistdetail.component';


@Component({
    selector: 'playlistcreate',
    styles: [ `
    
    `
    ],
    styleUrls: ['modules/playlist/components/wizardtemplate.css'],
    template: ` 
        <h3>Playlist create wizard</h3>
        <div class="container col-sm-12">
        	<div class="row">
        		<section>
                <div class="wizard">
                    <div class="wizard-inner">
                        <div class="connecting-line"></div>
                        <ul class="nav nav-tabs" role="tablist">
                            <li role="presentation" [ngClass]="{'active': step=='step1'}">
                                <a (click)="step='step1'" role="tab" title="Creat list detail">
                                    <span class="round-tab">
                                        <i class="glyphicon glyphicon-pencil"></i>    
                                    </span>
                                </a>
                            </li>
        
                            <li role="presentation" class="disabled">
                                <a data-toogle="tab" aria-controls="step2" title="Select songs">
                                    <span class="round-tab">
                                        <i class="glyphicon glyphicon-folder-open"></i>
                                    </span>
                                </a>
                            </li>
                            
                            <li role="presentation" class="disabled">
                                <a href="#complete" data-toggle="tab" aria-controls="complete" role="tab" title="Complete">
                                    <span class="round-tab">
                                        <i class="glyphicon glyphicon-ok"></i>
                                    </span>
                                </a>
                            </li>
                            
                        </ul>
                    </div>
                    
                    <form role="form">
                        <div class="tab-content">
                            <div class="tab-pane active" role="tabpanel" id="step1">
                                <playlistdetail></playlistdetail>
                            </div>
                            <div class="tab-pane" role="tabpanel" id="step2">
                                
                            </div>
                            
                            <div class="tab-pane" role="tabpanel" id="complete">
                                <h3>Complete</h3>
                                <p>You have successfully completed all steps.</p>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </form>
                </div>  
                </section>    
            </div>        
        </div>
    
    
    `
})

export class CreateListComponent{
    private step:string = "step1";
    @ViewChild(SearchComponent) searchComponent: SearchComponent;
    @ViewChild(PlayListDetailComponent) playlistdetailComponent: PlayListDetailComponent;
    
    constructor(private router:Router){
        
    }
    
    toSelectSong(): void{
        this.router.navigate(['/search']);
    }
}