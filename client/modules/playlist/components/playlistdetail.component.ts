import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPlayList } from '../../../interfaces/playlist/playlist.interface';
import { Sound } from '../../../interfaces/player/sound.interface';

@Component({
    selector: 'playlistdetail',
    styles: [ ``],
    template: ` 
        <div class="container">
          <form class="form-horizontal" [formGroup]="createListForm" (submit)="toSaveDetails()">
            <div class="form-group">
                <div class="col-sm-5 col-sm-offset-2">
                    <label class="control-label col-sm-1">Name:</label>
                    <input class="form-control" formControlName="name" id="name" type="text" placeholder="Enter name" required/>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-5 col-sm-offset-2">
                    <label class="control-label col-sm-1">Description:</label>
                    <input class="form-control" formControlName="description" id="description" type="text" placeholder="Enter description" />
                </div>
            </div>
            <div class="form-group col-sm-9">
                <button class="btn btn-success" type="submit" [disabled] = "!createListForm.valid" >Create</button>
                <button class="btn btn-default" type="button">Cancel</button>
            </div>
          </form>
        </div>
    `
})

export class PlayListDetailComponent{
    @Output()
    private onSave = new EventEmitter() 
    private createListForm:any;
    
    @Input()
    private playlist: IPlayList;
    
    constructor(
        private fb: FormBuilder, 
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
        console.log(this.playlist);
         this.onSave.next(this.playlist)
        // this.router.navigate(['/home']);
    }
}