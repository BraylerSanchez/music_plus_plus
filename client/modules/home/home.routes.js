"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./components/home.component');
var search_component_1 = require('./components/search.component');
exports.routes = [
    {
        path: 'home',
        component: home_component_1.HomeComponent
    }, {
        path: 'search/:query',
        component: search_component_1.SearchComponent
    }
];
exports.routing = router_1.RouterModule.forChild(exports.routes);
//# sourceMappingURL=home.routes.js.map