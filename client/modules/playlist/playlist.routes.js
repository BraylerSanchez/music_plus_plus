"use strict";
var router_1 = require("@angular/router");
var list_component_1 = require("./components/list.component");
var create_component_1 = require("./components/create.component");
var can_active_service_1 = require("../../services/user/can.active.service");
exports.routes = [
    {
        path: 'playlist/list',
        component: list_component_1.PlayListComponent,
        canActivate: [
            'CanAlwaysActivateGuard',
            can_active_service_1.CanActivateViaAuthGuard
        ]
    },
    {
        path: 'playlist/create/:_id',
        component: create_component_1.CreateListComponent,
        canActivate: [
            'CanAlwaysActivateGuard',
            can_active_service_1.CanActivateViaAuthGuard
        ]
    }
];
exports.routing = router_1.RouterModule.forChild(exports.routes);
//# sourceMappingURL=playlist.routes.js.map