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
var player_service_1 = require('../../services/player/player.service');
var PlayerComponent = (function () {
    function PlayerComponent(playerService) {
        var _this = this;
        this.playerService = playerService;
        this.playerService.onPlayMusic()
            .subscribe(function (sound) {
            _this.currentSound = sound;
        });
    }
    PlayerComponent = __decorate([
        core_1.Component({
            selector: 'player',
            styles: ["\n        .player{\n            position:absolute;\n            z-index: 1000;\n            bottom: 0;\n            left: 0;\n            width: 100%;\n        }\n    "],
            template: "\n    <div class=\"col-lg-12 no-padding-l-r player\">\n        <h1>Hola mundo</h1>\n    </div>",
            providers: [player_service_1.PlayerService]
        }), 
        __metadata('design:paramtypes', [player_service_1.PlayerService])
    ], PlayerComponent);
    return PlayerComponent;
}());
exports.PlayerComponent = PlayerComponent;
//# sourceMappingURL=player.component.js.map