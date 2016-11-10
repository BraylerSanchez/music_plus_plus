"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/share');
var loginUserObserbable;
exports.onLoginUser = new Observable_1.Observable(function (observable) {
    loginUserObserbable = observable;
}).share();
var logoutUserObserbable;
exports.onLogoutUser = new Observable_1.Observable(function (observable) {
    logoutUserObserbable = observable;
}).share();
var LoginService = (function () {
    function LoginService() {
        var _this = this;
        this.client_id = '347784008330-m2u9l7c3hp2stho4bc8bvf38cmi1tr2p.apps.googleusercontent.com';
        gapi.load('auth2', function () {
            _this.auth2 = gapi.auth2.init({
                client_id: _this.client_id
            });
        });
        var user = localStorage.getItem('ms_user');
        if (user) {
            this.user = JSON.parse(user);
        }
    }
    LoginService.prototype.setUser = function (user) {
        localStorage.setItem('ms_user', JSON.stringify(user));
        this.user = user;
    };
    LoginService.prototype.getUser = function () {
        var user = localStorage.getItem('ms_user');
        if (user) {
            this.user = JSON.parse(user);
        }
        return JSON.parse(user);
    };
    LoginService.prototype.singOut = function () {
        var _this = this;
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            localStorage.removeItem('ms_user');
            _this.user = undefined;
            logoutUserObserbable.next();
        });
    };
    LoginService.prototype.login = function () {
        var _this = this;
        this.auth2.grantOfflineAccess().then(function (authResult) {
            if (authResult['code']) {
                _this.auth2.currentUser.listen(function (userResponse) {
                    var profile = userResponse.getBasicProfile();
                    var user = {
                        _id: profile.getId(),
                        name: profile.getGivenName(),
                        thumbnail: profile.getImageUrl()
                    };
                    _this.setUser(user);
                    loginUserObserbable.next(user);
                });
            }
            else {
                console.log('Error authenticating user.');
            }
        });
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map