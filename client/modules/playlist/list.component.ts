import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'playList',
    styles: [`
    `],
    template: `
        <h1>List</h1>
            <i class="glyphicon glyphicon-plus-sign btn-lg" (click)="toCreate()"></i>
        <div>
            <h2>Lists added</h2>
        </div>
    `
})
export class PlayListComponent{
    private queryString:string;
    constructor(private router:Router){
        this.queryString = "";
    }
    
    toCreate(): void{
        this.router.navigate(['/playlist/create'])
    }
    
}