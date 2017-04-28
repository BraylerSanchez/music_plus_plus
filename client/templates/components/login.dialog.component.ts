import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import { LoginService, GoogleErrorReason } from '../../services/user/login.service';
import { IUser } from '../../interfaces/user/user.interface';
import { UserModel } from '../../models/security/user.model';

declare var document:any, gapi:any, FB:any, window:any;

@Component({
  selector: 'login-dialog',
  styles: [`
    .login-dialog{
      color: #333;  
    }
    .dialog-container{
      border-top: solid 1px darkgrey;
      padding-bottom: 15px;
    }
    .social-icon{    
      height: 48px;
      width: 48px;
      margin-right: 32px;
    }
    .mat-button, mat-raised-button{
      margin-bottom: 15px;
      padding: 5px;
    }
    p.sub-title{    
      margin-bottom: 15px;
      margin-top: 15px;
      text-shadow: none;
    }
    button.fb{
      background-color: #4a6ea9;
      color: white;
      font-size: 12pt;
    }
    button.tw{
      background-color: #2da8e0;
      color: white;
      font-size: 12pt;
    }
    button.gg{
      background-color: white;
      color: #4285f4;
      font-size: 12pt;
      padding: 5px;
    }
    .social-text{
      top: 5px;
      position: relative;
    }
    button.close{
      background-color: white;
      border: none;
      cursor: pointer;
    }
  `],
  templateUrl: 'client/templates/components/login.dialog.component.html',
  providers: [LoginService]
})
export class LoginDialogComponent implements OnInit{
  private gConfig:any = {
    client_id: '347784008330-m2u9l7c3hp2stho4bc8bvf38cmi1tr2p.apps.googleusercontent.com',
    auth2: {}
  };
  private fbConfig = {
      appId      : '321912544641821',
      xfbml      : true,
      version    : 'v2.2'
  };

  constructor(
    private dialogRef: MdDialogRef<LoginDialogComponent>,
    private loginService: LoginService) {}

    ngOnInit(){
        this.gInit(document, 'script', 'google-sdk')
        this.fbInit (document, 'script', 'facebook-jssdk')
    }
    
    gInit(d:Document, s:string, id:string):void{
        var js , fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js['src'] = "https://apis.google.com/js/platform.js";
        js.setAttribute('async', 'true');
        js.setAttribute('defer', 'true');
        fjs.parentNode.insertBefore(js, fjs);
    }
    fbInit(d:Document, s:string, id:string):void{
        window.fbAsyncInit = () => {
            FB.init(this.fbConfig);
            FB.AppEvents.logPageView();
        };
        var js , fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js['src'] = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }

    gLogin(): void{
        this.dialogRef.close();
        gapi.load('auth2', () => {
            this.gConfig.auth2 = gapi.auth2.init({
                client_id: this.gConfig.client_id
            })
            this.gConfig.auth2.then( (a:any)=>{
                var r2 = a.grantOfflineAccess().then( (authResult:any)=>{
                    if (authResult['code']) {
                        var r = a.currentUser.listen( (userResponse:any) =>{
                            var profile = userResponse.getBasicProfile();
                            var user:IUser = new UserModel();
                            user.user_name = profile.getEmail();
                            user.avatar_url = profile.getImageUrl();
                            user.name = profile.getName();
                            user.last_name = profile.getFamilyName()
                            this.loginService.login(user).subscribe((response:any) =>{
                                if( response.result == true){
                                    this.loginService.setUser(response.user);
                                    alert('Bienvenidos a music plus plus.')
                                }
                                else{
                                    console.log(response.message)
                                    alert('Error del sistema.')
                                }
                            })
                        });
                    } else {
                        alert('No se pudo autenticar con el usuario.')
                    }
                });
                
                r2.then(()=>{ },
                (reason:any)=>{
                    if(reason)
                        alert(GoogleErrorReason[reason.error])
                })
            }).then( ()=> { },
            (reason:any)=>{
                alert(GoogleErrorReason[reason.error]);
            });
        });
    }

    fbLogin( ):void {
        this.dialogRef.close();
        FB.getLoginStatus((response:any)=> {
            if (response.status === 'connected') {
                FB.api('/' + response.authResponse.userID, (apiResponse:any) => {
                    var user:IUser = new UserModel();
                    user.user_name = apiResponse.email;
                    user.avatar_url = `http://graph.facebook.com/${response.authResponse.userID}/picture?type=normal`;
                    user.name = apiResponse.first_name;
                    user.last_name = apiResponse.last_name;
                    this.loginService.login(user).subscribe((response:any) =>{
                        if( response.result == true){
                            this.loginService.setUser(response.user);
                            //this.toaster.success('Bienvenidos a educate en linea.', 'User')
                        }
                        else{
                            console.log(response.message)
                            //this.toaster.error('Error del sistema.', 'User', {dismiss: 'click', showCloseButton: true})
                        }
                    })
                })
            } else {
                FB.login((recursiveResponse:any) =>{   ;
                    this.fbLogin();
                }, {
                    scope: 'email,user_birthday,user_friends'
                });
            }
        });
    }
}