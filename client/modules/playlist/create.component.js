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
var CreateListComponent = (function () {
    function CreateListComponent(fb) {
        this.createListForm = fb.group({
            'name': ["Please enter a name", forms_1.Validators.required],
            'description': ["Please enter a description", forms_1.Validators.required]
        });
    }
    CreateListComponent.prototype.doCreateList = function () {
        console.log(this.createListForm.value);
        event.preventDefault();
    };
    CreateListComponent = __decorate([
        core_1.Component({
            selector: 'playlistcreate',
            styles: ["\n        .label {\n            text-align: left;\n        }\n    \n    "
            ],
            template: " \n        <h1>Create list</h1>\n        <div class=\"col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2\">\n          \n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], CreateListComponent);
    return CreateListComponent;
}());
exports.CreateListComponent = CreateListComponent;
//# sourceMappingURL=create.component.js.map