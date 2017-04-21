import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/share';
import {Http, Headers, Response, ResponseOptions} from '@angular/http'

import { IUser } from '../../interfaces/user/user.interface';

declare var gapi: any;

var loginUserObserbable: any;
export const onLoginUser: Observable<IUser> = new Observable( (observable:any) =>{
    loginUserObserbable = observable; 
}).share();

var logoutUserObserbable: any;
export const onLogoutUser = new Observable( (observable:any) =>{
    logoutUserObserbable = observable; 
}).share();
const headers = new ResponseOptions({
    headers: new Headers({
        'Content-Type': 'application/json'
    })
})

@Injectable()
export class LoginService{
    private client_id: string = '347784008330-s9lnglrku00gchuh39bor6td9rsvm95u.apps.googleusercontent.com';
    private auth2: any;
    private user: IUser;
    constructor(
        private http: Http
    ){
        /*gapi.load('auth2', () => {
          this.auth2 = gapi.auth2.init({
              client_id: this.client_id
            });
        });
        var user = localStorage.getItem('ms_user');
        if( user ){
            this.user = JSON.parse(user);
        }*/
    }
    
    setUser(user: IUser){
        localStorage.setItem('ms_user', JSON.stringify(user));
        this.user = user;
    }
    
    getUser():IUser{
        var user = localStorage.getItem('ms_user');
        if( user ){
            this.user = JSON.parse(user);
        }
        return JSON.parse(user);
    }
    singOut(){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then( () => {
            localStorage.removeItem('ms_user');
            this.user = undefined;
            logoutUserObserbable.next();
        });
    }
    login(){
        this.auth2.grantOfflineAccess().then( (authResult:any)=>{
            if (authResult['code']) {
                this.auth2.currentUser.listen( (userResponse:any) =>{
                    var profile = userResponse.getBasicProfile();
                    var user = {
                        _id: profile.getId(),
                        name: profile.getGivenName(),
                        thumbnail: profile.getImageUrl()
                    }
                    this.setUser(user)
                    loginUserObserbable.next(user)
                })
              } else {
                  console.log('Error authenticating user.')
              }
        });
    }
    
    getUserProfile(id: string){
        return this.http.get(`https://www.googleapis.com/gmail/v1/users/${id}/profile`, headers).map( res => res.json());
    }
}