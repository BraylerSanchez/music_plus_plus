import { Component, NgZone, OnInit } from '@angular/core';
import { LoginService, onLoginUser, onLogoutUser } from '../../services/user/login.service';
import { Router } from '@angular/router';
@Component({
    selector: 'menu',
    template: `
    <md-list>
        <h1 md-subheader class="header">MUSIC++</h1>
        <md-list-item [routerLinkActive]="['active']" [routerLink]="['/home']" class="pointer">
            <md-icon md-list-icon>home</md-icon>
            <h3 md-line > Home</h3>
        </md-list-item>
        <md-divider></md-divider>
        <md-list-item [routerLinkActive]="['active']" class="pointer" [routerLink]="['/search/0']">
            <md-icon md-list-icon>search</md-icon>
            <h3 md-line>Search</h3>
        </md-list-item>
        <md-divider></md-divider>
        <md-list-item [routerLinkActive]="['active']" [routerLink]="['/playlist/list']" *ngIf="user" class="pointer">
            <md-icon md-list-icon>playlist_play</md-icon>
            <h3 md-line > Play list</h3>
        </md-list-item>
        <md-divider></md-divider>
        <md-list-item (click)="login()" class="pointer" *ngIf="!user" >
            <md-icon md-list-icon>person</md-icon>
            <h3 md-line>Login</h3>
        </md-list-item>
        <md-list-item class="pointer" *ngIf="user" (click)="logout()" >
            <md-icon md-list-icon>exit_to_app</md-icon>
            <h3 md-line>Logout</h3>
        </md-list-item>
    </md-list>`,
    providers: [LoginService]
})
export class MenuWidgetComponent implements OnInit{
    
    private user: any;

    constructor(
        private loginService: LoginService,
        private ngZone: NgZone,
        private router: Router
    ){
        onLoginUser.subscribe( (user) =>{
            this.user = user;
            this.ngZone.run(()=>{});
        })
        onLogoutUser.subscribe( ()=>{
            this.user = undefined;
            this.ngZone.run(()=>{});
        })
    }
        
    ngOnInit(){
        this.user = this.loginService.getUser();
    }
    
    login(){
        this.loginService.login();
    }

    logout(){
        this.loginService.singOut();
        this.router.navigate(['/home']);
    }
 }