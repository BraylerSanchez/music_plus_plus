import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    selector: 'playlistdetail',
    styles: [ `
        .label {
            text-align: left;
        }
    
    `
    ],
    template: ` 
        <div class="container">
          <form class="form-horizontal" [formGroup]="createListForm" (click)="toSelectSong()">
            <div class="form-group">
                <div class="col-sm-5 col-sm-offset-2">
                    <label class="control-label col-sm-1">Name:</label>
                    <input class="form-control" ngControl="name" id="name" type="text" placeholder="Enter name" required/>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-5 col-sm-offset-2">
                    <label class="control-label col-sm-1">Description:</label>
                    <input class="form-control" ngControl="description" id="description" type="text" placeholder="Enter description" required/>
                </div>
            </div>
            <div class="form-group col-sm-9">
                <button class="btn btn-success" type="button">Create</button>
                <button class="btn btn-default" type="button">Cancel</button>
            </div>
          </form>
        </div>
    `
})

export class PlayListDetailComponent{
    private createListForm:any;
    private queryString:string;
    constructor(fb: FormBuilder, private router:Router){
        this.createListForm = fb.group({
            'name': ["Please enter a name", Validators.required],
            'description': ["Please enter a description", Validators.required]
        });
        this.queryString = "";
    }
    
    toSelectSong(): void{
        this.router.navigate(['/search']);
    }
}