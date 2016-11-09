import { Component, NgZone, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayListDetailComponent } from './playlistdetail.component';
import { IPlayList } from '../../../interfaces/playlist/playlist.interface';

import { PlaylistService } from '../../../services/playlist/playlist.service';
import { LoginService } from '../../../services/user/login.service';



@Component({
    selector: 'summary',
    styles: [],
    template: `
        <div class="container col-xs-12">
            <h3>Summary</h3>
            <div class="col-lg-6">
                <h4>Name: </h4>
                <span>{{playlist.name}}</span>
            </div>
            <div class="col-lg-6">
                <h4>Description: </h4>
                <span>{{playlist.description}}</span>
            </div>
            <div class="col-lg-12 margin-top-xs"> 
                <ul class="list-group">
                    <li *ngFor="let sound of playlist.sounds" class="list-group-item">{{sound.title}}</li>
                </ul>
            </div>
        </div>
    `,
    providers: []
})



export class SummaryComponent{
    @Input()
    playlist: IPlayList;
    
    constructor(){
        
    }
}
