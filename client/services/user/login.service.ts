import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/share';

import { IUser } from '../../interfaces/user/user.interface';

declare var gapi: any;

var loginUserObserbable: any;
export const onLoginUser: Observable<IUser> = new Observable( (observable) =>{
    loginUserObserbable = observable; 
}).share();

var logoutUserObserbable: any;
export const onLogoutUser = new Observable( (observable) =>{
    logoutUserObserbable = observable; 
}).share();

@Injectable()
export class LoginService{
    private client_id: string = '347784008330-m2u9l7c3hp2stho4bc8bvf38cmi1tr2p.apps.googleusercontent.com';
    private auth2: any;
    private user: IUser;
    
    constructor(
    ){
        gapi.load('auth2', () => {
          this.auth2 = gapi.auth2.init({
              client_id: this.client_id
            });
        });
    }
    
    setUser(user: IUser){
        this.user = user;
    }
    
    getUser():IUser{
        return this.user;
    }
    singOut(){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then( () => {
            this.user = undefined;
            logoutUserObserbable.next();
        });
    }
    login(){
        this.auth2.grantOfflineAccess().then( (authResult)=>{
            if (authResult['code']) {
                var profile = this.auth2.currentUser.get().getBasicProfile();
                var user = {
                    _id: profile.getId(),
                    name: profile.getGivenName(),
                    thumbnail: profile.getImageUrl()
                }
                this.setUser(user)
                loginUserObserbable.next(user)
              } else {
                  console.log('Error authenticating user.')
              }
        });
    }
}