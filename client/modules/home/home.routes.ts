import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { SearchComponent } from './components/search.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },{
        path: 'search/:query',
        component: SearchComponent
    }
];

export const routing = RouterModule.forChild(routes);