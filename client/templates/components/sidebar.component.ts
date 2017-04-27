import { Component} from '@angular/core';
@Component({
  selector: 'sidebar-partial',
    styles: [``],
    template: `         
      <section class="vbox">
        <section class="w-f-md scrollable">
          <div class="slim-scroll" data-height="auto" data-disable-fade-out="true" data-distance="0" data-size="10px" data-railOpacity="0.2">
            <!-- nav -->                 
            <nav class="nav-primary hidden-xs">
              <ul class="nav bg clearfix">
                <li class="hidden-nav-xs padder m-t m-b-sm text-xs text-muted">
                  Menu
                </li>
                <li>
                  <a [routerLink]="['/home']" [routerLinkActive]="['text-success']">
                    <i class="icon-home icon"></i>
                    <span class="font-bold">Home</span>
                  </a>
                </li>
                <li>
                  <a [routerLink]="['/search/0']" [routerLinkActive]="['text-success']">
                    <i class="fa fa-search text-info"></i>
                    <span class="font-bold">Search</span>
                  </a>
                </li>
                <li>
                  <a [routerLink]="['/playlist/list']" *ngIf="user"  [routerLinkActive]="['text-success']">
                    <i class="icon-list icon  text-info-dker"></i>
                    <span class="font-bold">Playlist</span>
                  </a>
                </li>
                <li class="m-b hidden-nav-xs"></li>
              </ul>
              <!-- PLAY LIST -->
              <ul class="nav text-sm" *ngIf="user">
                <li class="hidden-nav-xs padder m-t m-b-sm text-xs text-muted">
                  <span class="pull-right"><a [routerLink]="['/playlist/create/0']"><i class="icon-plus i-lg"></i></a></span>
                  Playlist
                </li>
                <li>
                  <a href="#">
                    <i class="icon-music-tone icon"></i>
                    <span>Hip-Pop</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="icon-playlist icon text-success-lter"></i>
                    <b class="badge bg-success dker pull-right">9</b>
                    <span>Jazz</span>
                  </a>
                </li>
              </ul>
            </nav>
            <!-- / nav -->
          </div>
        </section>
    </section>`
})
export class SideBarComponent{
    private user:any = undefined;
    constructor(
    ){
    }
}