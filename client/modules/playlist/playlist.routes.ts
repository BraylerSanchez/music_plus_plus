import { Routes, RouterModule } from '@angular/router';
import { PlayListComponent } from './list.component';

export const routes: Routes = [
    {
        path: 'playlist/list',
        component: PlayListComponent
    }
];

export const routing = RouterModule.forChild(routes);