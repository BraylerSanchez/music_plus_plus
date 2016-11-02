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
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var PlayListDetailComponent = (function () {
    function PlayListDetailComponent(fb, router) {
        this.router = router;
        this.createListForm = fb.group({
            'name': ["Please enter a name", forms_1.Validators.required],
            'description': ["Please enter a description", forms_1.Validators.required]
        });
        this.queryString = "";
    }
    PlayListDetailComponent.prototype.toSelectSong = function () {
        this.router.navigate(['/search']);
    };
    PlayListDetailComponent = __decorate([
        core_1.Component({
            selector: 'playlistdetail',
            styles: ["\n        .label {\n            text-align: left;\n        }\n    \n    "
            ],
            template: " \n        <div class=\"container\">\n          <form class=\"form-horizontal\" [formGroup]=\"createListForm\" (click)=\"toSelectSong()\">\n            <div class=\"form-group\">\n                <div class=\"col-sm-5 col-sm-offset-2\">\n                    <label class=\"control-label col-sm-1\">Name:</label>\n                    <input class=\"form-control\" ngControl=\"name\" id=\"name\" type=\"text\" placeholder=\"Enter name\" required/>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <div class=\"col-sm-5 col-sm-offset-2\">\n                    <label class=\"control-label col-sm-1\">Description:</label>\n                    <input class=\"form-control\" ngControl=\"description\" id=\"description\" type=\"text\" placeholder=\"Enter description\" required/>\n                </div>\n            </div>\n            <div class=\"form-group col-sm-9\">\n                <button class=\"btn btn-success\" type=\"button\">Create</button>\n                <button class=\"btn btn-default\" type=\"button\">Cancel</button>\n            </div>\n          </form>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router])
    ], PlayListDetailComponent);
    return PlayListDetailComponent;
}());
exports.PlayListDetailComponent = PlayListDetailComponent;
//# sourceMappingURL=playlistdetail.component.js.map