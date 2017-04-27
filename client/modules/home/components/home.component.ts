import { Component} from '@angular/core';

@Component({
  styles: [``],
  template: `
      <a href="#" class="pull-right text-muted m-t-lg" data-toggle="class:fa-spin" ><i class="icon-refresh i-lg  inline" id="refresh"></i></a>
      <h2 class="font-thin m-b">Home <span class="musicbar animate inline m-l-sm" style="width:20px;height:20px">
        <span class="bar1 a1 bg-primary lter"></span>
        <span class="bar2 a2 bg-info lt"></span>
        <span class="bar3 a3 bg-success"></span>
        <span class="bar4 a4 bg-warning dk"></span>
        <span class="bar5 a5 bg-danger dker"></span>
      </span></h2>
      <div class="row row-sm">
        <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
          <div class="item">
            <div class="pos-rlt">
              <div class="bottom">
                <span class="badge bg-info m-l-sm m-b-sm">03:20</span>
              </div>
              <div class="item-overlay opacity r r-2x bg-black">
                <div class="text-info padder m-t-sm text-sm">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star-o text-muted"></i>
                </div>
                <div class="center text-center m-t-n">
                  <a href="#"><i class="icon-control-play i-2x"></i></a>
                </div>
                <div class="bottom padder m-b-sm">
                  <a href="#" class="pull-right">
                    <i class="fa fa-heart-o"></i>
                  </a>
                  <a href="#">
                    <i class="fa fa-plus-circle"></i>
                  </a>
                </div>
              </div>
              <a href="#"><img src="assest/images/p1.jpg" alt="" class="r r-2x img-full"></a>
            </div>
            <div class="padder-v">
              <a href="#" class="text-ellipsis">Tempered Song</a>
              <a href="#" class="text-ellipsis text-xs text-muted">Miaow</a>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-7">
          <h3 class="font-thin">New Songs</h3>
          <div class="row row-sm">
            <div class="col-xs-6 col-sm-3">
              <div class="item">
                <div class="pos-rlt">
                  <div class="item-overlay opacity r r-2x bg-black">
                    <div class="center text-center m-t-n">
                      <a href="#"><i class="fa fa-play-circle i-2x"></i></a>
                    </div>
                  </div>
                  <a href="#"><img src="assest/images/a2.png" alt="" class="r r-2x img-full"></a>
                </div>
                <div class="padder-v">
                  <a href="#" class="text-ellipsis">Spring rain</a>
                  <a href="#" class="text-ellipsis text-xs text-muted">Miaow</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <h3 class="font-thin">Top Songs</h3>
          <div class="list-group bg-white list-group-lg no-bg auto">                          
            <a href="#" class="list-group-item clearfix">
              <span class="pull-right h2 text-muted m-l">1</span>
              <span class="pull-left thumb-sm avatar m-r">
                <img src="assest/images/a4.png" alt="...">
              </span>
              <span class="clear">
                <span>Little Town</span>
                <small class="text-muted clear text-ellipsis">by Chris Fox</small>
              </span>
            </a>
          </div>
        </div>
      </div>`
})
export class HomeComponent {
  constructor(
  ) {
  }

}