import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/user/user.interface';
import { MdDialog } from '@angular/material';
import { LoginDialogComponent } from './login.dialog.component';
import { LoginService, onLoginUser, onLogoutUser } from '../../services/user/login.service';


@Component({
  selector: 'header-partial',
  templateUrl: 'client/templates/components/header.partial.component.html',
  styles: [`
      .search-xs{
        position: absolute !important;
        top: 0 !important;
        margin: 0 !important;
        padding-left: 48px !important;h
        padding-right: 48px !important;
        padding-right: 48px !important;
        width: 100% !important;
      }
    `],
    providers: [LoginService]
})
export class HeaderPartialComponent implements OnInit {
    private searchQuery:string = '';
    private searchXS: string = '';
    private user:IUser;

    constructor(
      private router:Router,
      private dialog:MdDialog,
      private loginService: LoginService
    ) { }

    ngOnInit() {
      var user = <IUser>this.loginService.getUser();
      if( user)
        this.user = user;
      
      onLoginUser.subscribe( (user:IUser) =>{
        this.user = user;
      })

      onLogoutUser.subscribe( () =>{
        this.user = undefined;
      })
     }

    showSearch(event:Event){
      this.searchXS = this.searchXS == ''? 'search-xs' : '';
      event.stopPropagation()
      event.preventDefault();
    }
    hideSearch(){
        this.searchXS = '';
    }
    search(){
      if(this.searchQuery != ''){
        this.hideSearch();
        this.router.navigate([`/search/${this.searchQuery}` ]);
      }
    }

    login(){
      let dialog = this.dialog.open( LoginDialogComponent, {
        disableClose: true
      });
      dialog.afterClosed().subscribe( (data) =>{

      })
    }
    logout(){
      var result = confirm('Do you want logout from music++?');
      if(result)
        this.loginService.singOut();
    }
}