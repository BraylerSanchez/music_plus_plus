import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './playlist.routes';
import { PlayListComponent } from './components/list.component';
import { CreateListComponent } from './components/create.component';

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
        PlayListComponent,
        CreateListComponent
    ],
    providers: [
        {
            provide: 'CanAlwaysActivateGuard',
            useValue: () => {
              return true;
            }
        },
        LoginService,
        CanActivateViaAuthGuard
    ],
    bootstrap: [
        PlayListComponent
    ]
})
export class PlaylistModule{
    constructor(){}
}