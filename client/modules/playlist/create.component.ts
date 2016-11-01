import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'playlistcreate',
    styles: [ `
        .label {
            text-align: left;
        }
    
    `
    ],
    template: ` 
        <h1>Create list</h1>
        <div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2">
          <form class="form-horizontal" [formGroup]="createListForm" (submit)="doCreateList($event)">
            <div class="form-group">
              <label class="control-label col-sm-1" for="name">Name:</label>
              <input ngControl="name" type="text" placeholder="Enter name" id="name" class="form-control col-sm-6" />
            </div>
            <div class="form-group">
              <label class="control-label col-sm-1" for="description">Description:</label>
              <input ngControl="description" type="text" placeholder="Enter description" id="description" class="form-control col-sm-6"/>
            </div>
            <div class="form-group">
                <button class="btn btn-success" type="submit">Create</button>
                <button class="btn btn-default" type="button">Cancel</button>
            </div>
          </form>
        </div>
    `
})

export class CreateListComponent{
    private createListForm:any;
    constructor(fb: FormBuilder){
        this.createListForm = fb.group({
            'name': ["Please enter a name", Validators.required],
            'description': ["Please enter a description", Validators.required]
        });
    }
    
    doCreateList(){
        console.log(this.createListForm.value);
        event.preventDefault();
    }
}