"use strict";
var router_1 = require('@angular/router');
var list_component_1 = require('./components/list.component');
var create_component_1 = require('./components/create.component');
exports.routes = [
    {
        path: 'playlist/list',
        component: list_component_1.PlayListComponent
    },
    {
        path: 'playlist/create',
        component: create_component_1.CreateListComponent
    }
];
exports.routing = router_1.RouterModule.forChild(exports.routes);
//# sourceMappingURL=playlist.routes.js.map