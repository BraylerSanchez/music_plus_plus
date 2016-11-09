import { Routes, RouterModule } from '@angular/router';
import { PlayListComponent } from './components/list.component';
import { CreateListComponent } from './components/create.component';


export const routes: Routes = [
    {
        path: 'playlist/list',
        component: PlayListComponent
    },
    {
        path: 'playlist/create/:_id',
        component: CreateListComponent
    }
];

export const routing = RouterModule.forChild(routes);