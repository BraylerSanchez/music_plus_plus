import { Routes, RouterModule } from '@angular/router';
import { PlayListComponent } from './components/list.component';
import { CanActivateViaAuthGuard } from '../../services/user/can.active.service';

export const routes: Routes = [
    {
        path: 'playlist/list',
        component: PlayListComponent,
        canActivate: [
        'CanAlwaysActivateGuard',
        CanActivateViaAuthGuard
      ]
    }
];

export const routing = RouterModule.forChild(routes);