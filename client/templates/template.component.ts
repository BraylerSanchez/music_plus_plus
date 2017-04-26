import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { PlayerComponent } from '../modules/player/components/player.component';
import { SideBarComponent } from './components/sidebar.component';

@Component({
  selector: 'app',
    template: `
    <sidebar></sidebar>
    <md-grid-list cols="1" rowHeight="fit" style="height: 100%">
      <md-grid-tile [style.background]="'#333'">
          <router-outlet></router-outlet>
      </md-grid-tile>
    </md-grid-list>`
})
export class TemplateComponent{
    @ViewChild(PlayerComponent) playerComponent: PlayerComponent;
    @ViewChild(SideBarComponent) sideBarComponent: SideBarComponent;
    
    constructor(){
    }
}