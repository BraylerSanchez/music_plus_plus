import { Routes, RouterModule } from '@angular/router';
import { PlayListComponent } from './list.component';
import { CreateListComponent } from './create.component';

export const routes: Routes = [
    {
        path: 'playlist/list',
        component: PlayListComponent
    },
    {
        path: 'playlist/create',
        component: CreateListComponent
    }
];

export const routing = RouterModule.forChild(routes);