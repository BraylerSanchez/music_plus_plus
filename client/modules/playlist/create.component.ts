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