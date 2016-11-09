import { Component, ViewChild, OnInit, ElementRef, Renderer } from '@angular/core';
import { PlayerComponent } from '../modules/player/components/player.component';
import { SideBarComponent } from './sidebar.component';

@Component({
  selector: 'app',
    template: `
    <toaster-container></toaster-container>
    <sidebar></sidebar>
    <div class="site-wrapper">
      <div class="site-wrapper-inner">
        <div class="cover-container">
          <!--div class="masthead clearfix">
            <div class="inner">
              <h1 class="masthead-brand"><i class="fa fa-music fa-1x" (click)="search()"></i> Music</h1>
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
          </div -->
          <div class="inner cover">
            <router-outlet></router-outlet>
          </div>
          <div class="col-xs-12 mastfoot">
            <div class="inner">
              <p>by @los tigueres.</p>
            </div>
          </div>
          <player></player>
        </div>
      </div>
    </div>`,
    styles: [`
        sidebar{
            position: absolute;
            z-index: 100;
        }
      `
      ]
})
export class TemplateComponent implements OnInit{
    @ViewChild(PlayerComponent) playerComponent: PlayerComponent;
    @ViewChild(SideBarComponent) sideBarComponent: SideBarComponent;
    constructor(private elementRef:ElementRef, private renderer: Renderer){
        
    }
    
    ngOnInit(){
         this.renderer.listen( this.elementRef.nativeElement.children[2], 'click', (event) => {
             this.sideBarComponent.hide();
        })
    }
}