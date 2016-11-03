import { Component, ViewChild } from '@angular/core';
import { PlayerComponent } from '../modules/player/components/player.component';

@Component({
  selector: 'app',
    template: `
    <div class="site-wrapper">
      <div class="site-wrapper-inner">
        <div class="cover-container">
          <div class="masthead clearfix">
            <div class="inner">
              <h3 class="masthead-brand"><i class="fa fa-music fa-1x" (click)="search()"></i> Music</h3>
              <nav>
                <div class="media-body">
                  <ul class="nav masthead-nav">
                    <li [routerLinkActive]="['active']" >
                      <a [routerLink]="['/home']" >
                        Home
                      </a> 
                    </li>
                    <li [routerLinkActive]="['active']" ><a [routerLink]="['/playlist/list']" > Play List</a> </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          <div class="inner cover">
            <router-outlet></router-outlet>
          </div>
          <div class="mastfoot">
            <div class="inner">
              <p>by @los tigueres.</p>
            </div>
          </div>
          <player></player>
        </div>
      </div>
    </div>`,
    styles: [
      `
      .navItem{
        display: block;
        text-align: center;
      }
      `
      ]
})
export class TemplateComponent{
    @ViewChild(PlayerComponent) playerComponent: PlayerComponent;
    constructor(){
        
    }
}