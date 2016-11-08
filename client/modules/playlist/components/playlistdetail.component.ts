import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPlayList } from '../../../interfaces/playlist/playlist.interface';
import { Sound } from '../../../interfaces/player/sound.interface';

@Component({
    selector: 'playlistdetail',
    styles: [ ``],
    template: ` 
        <div class="container col-lg-6 col-sm-offset-3">
          <form [formGroup]="createListForm" (submit)="toSaveDetails()">
            <div class="form-group text-left">
                <label class="control-label col-lg-12 no-padding-l-r">Name:</label>
                <input class="form-control" autofocus formControlName="name" id="name" type="text" placeholder="Enter name" required/>
            </div>
            <div class="form-group text-left">
                <label class="control-label col-lg-12 no-padding-l-r">Description:</label>
                <input class="form-control" formControlName="description" id="description" type="text" placeholder="Enter description" />
            </div>
          </form>
        </div>
    `
})

export class PlayListDetailComponent{
    @Output()
    private onSave = new EventEmitter() 
    public createListForm:any;
    
    @Input()
    private playlist: IPlayList;
    
    constructor(
        public fb: FormBuilder, 
        private router:Router
    ){
        this.createListForm = fb.group({
            'name': ['', Validators.required],
            'description': ['']
        });
    }
    
    public setPlaylist(playlist: IPlayList):void{
        this.playlist = playlist;
    }
    public getPlaylist(): IPlayList{
        return this.playlist;
    }
    
    toSaveDetails( ): void{
        this.playlist.name = this.createListForm.value.name;
        this.playlist.description = this.createListForm.value.description;
        this.onSave.next(this.playlist);
    }
}