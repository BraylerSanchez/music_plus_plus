import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/share';
import {Http, Headers, Response, ResponseOptions} from '@angular/http'

import { IUser } from '../../interfaces/user/user.interface';

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

export const GoogleErrorReason = {
    popup_closed_by_user: 'La ventana emergente de google api fue cerrado por el usuario o su dispositivo la está bloqueando.',
    idpiframe_initialization_failed: 'Error en el api de google, este origen no esta registrado en las credenciales.'
}

@Injectable()
export class LoginService{

    private user: IUser;
    constructor(
        private http: Http
    ){
    }
    

    setUser(user: IUser){
        localStorage.setItem('ms_user', JSON.stringify(user));
        loginUserObserbable.next(user);
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
        localStorage.removeItem('ms_user');
        this.user = undefined;
        logoutUserObserbable.next();
    }

    login(user:IUser){
        return this.http.post(`api/v2/user/login`, user, headers).map( res => res.json());
    }
    
    getUserProfile(id: string){
        return this.http.get(`https://www.googleapis.com/gmail/v1/users/${id}/profile`, headers).map( res => res.json());
    }
}