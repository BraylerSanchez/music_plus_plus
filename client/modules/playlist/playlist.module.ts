import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './playlist.routes';
import { CreatePlaylistDialog } from './components/create.dialog.component';

import { HomeModule } from '../home/home.module';
import { MaterialModule, MdIconModule, MdInputModule, MdGridListModule, MdListModule } from '@angular/material';

import { CanActivateViaAuthGuard } from '../../services/user/can.active.service';
import { LoginService } from '../../services/user/login.service';

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        FormsModule,
        CommonModule,
        MaterialModule,
        MdIconModule,
        MdInputModule,
        MdGridListModule,
        MdListModule,
        ReactiveFormsModule,
        HomeModule,
        routing
    ],
    declarations: [
        CreatePlaylistDialog
    ],
    entryComponents:[CreatePlaylistDialog],
    exports: [CreatePlaylistDialog],
    providers: [
        {
            provide: 'CanAlwaysActivateGuard',
            useValue: () => {
              return true;
            }
        },
        LoginService,
        CanActivateViaAuthGuard
    ]
})
export class PlaylistModule{
    constructor(){}
}