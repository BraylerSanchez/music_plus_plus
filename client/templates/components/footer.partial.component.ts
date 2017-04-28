import { Component, OnInit, NgZone } from '@angular/core';
import { IPlayList } from '../../interfaces/playlist/playlist.interface';
import { Sound } from '../../interfaces/player/sound.interface';
import { PlayerService, onPlayMusic, onStopMusic, onSuspendMusic} from '../../services/player/player.service';
import { LoginService } from '../../services/user/login.service';

import { PlaylistService, onAddSound, onRemoveSound, onPlaylistChange } from '../../services/playlist/playlist.service';

declare var jPlayerPlaylist:any, $:any;

@Component({
  selector: 'footer-partial',
    template: `
      <div id="jp_container_N">
        <div class="jp-type-playlist">
          <div id="jplayer_N" class="jp-jplayer hide"></div>
          <div class="jp-gui">
            <div class="jp-video-play hide">
              <a class="jp-video-play-icon">play</a>
            </div>
            <div class="jp-interface">
              <div class="jp-controls">
                <div><a class="jp-previous"><i class="icon-control-rewind i-lg"></i></a></div>
                <div>
                  <a class="jp-play"><i class="icon-control-play i-2x"></i></a>
                  <a class="jp-pause hid"><i class="icon-control-pause i-2x"></i></a>
                </div>
                <div><a class="jp-next"><i class="icon-control-forward i-lg"></i></a></div>
                <div class="hide"><a class="jp-stop"><i class="fa fa-stop"></i></a></div>
                <div>
                <a class="" data-toggle="dropdown" data-target="#playlist"><i class="icon-list"></i></a></div>
                <div class="jp-progress hidden-xs">
                  <div class="jp-seek-bar dk">
                    <div class="jp-play-bar bg-info">
                    </div>
                    <div class="jp-title text-lt">
                      <ul>
                        <li></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="hidden-xs hidden-sm jp-current-time text-xs text-muted"></div>
                <div class="hidden-xs hidden-sm jp-duration text-xs text-muted"></div>
                <div class="hidden-xs hidden-sm">
                  <a class="jp-mute" title="mute"><i class="icon-volume-2"></i></a>
                  <a class="jp-unmute hid" title="unmute"><i class="icon-volume-off"></i></a>
                </div>
                <div class="hidden-xs hidden-sm jp-volume">
                  <div class="jp-volume-bar dk">
                    <div class="jp-volume-bar-value lter"></div>
                  </div>
                </div>
                <div>
                  <a class="jp-shuffle" title="shuffle"><i class="icon-shuffle text-muted"></i></a>
                  <a class="jp-shuffle-off hid" title="shuffle off"><i class="icon-shuffle text-lt"></i></a>
                </div>
                <div>
                  <a class="jp-repeat" title="repeat"><i class="icon-loop text-muted"></i></a>
                  <a class="jp-repeat-off hid" title="repeat off"><i class="icon-loop text-lt"></i></a>
                </div>
                <div class="hide">
                  <a class="jp-full-screen" title="full screen"><i class="fa fa-expand"></i></a>
                  <a class="jp-restore-screen" title="restore screen"><i class="fa fa-compress text-lt"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div class="jp-playlist dropup" id="playlist">
            <ul class="dropdown-menu aside-xl dker">
              <li class="list-group-item"></li>
            </ul>
          </div>
        </div>
      </div>
    `,
    styles: [`
    `],
    providers: [PlayerService, PlaylistService]
})
export class FooterPartialComponent implements OnInit {
    private player:any;
    constructor(
      private playlistService: PlaylistService,
      private zone:NgZone
    ) { }

    ngOnInit() {
      this.createPlayer();
      this.pauseEvent();
      this.playEvent();
      this.clickEvent();
      this.removeItemEvent();
      
      onAddSound.subscribe((result) => {
        var sound = <Sound>result.sound;
        this.player.add( this.convertSound(sound));
        this.player._refresh();
      })

      onPlaylistChange.subscribe( (result:IPlayList) => {
            var sounds = result.sounds.map((sound:Sound) =>{
              return this.convertSound(sound);
            });
            if(sounds.length <= 0){
                this.player.setPlaylist(sounds);
            }
            this.zone.run(()=>{});
      })
     }

     pauseEvent(){
      $(document).on($.jPlayer.event.pause, this.player.cssSelector.jPlayer,  function(){
        $('.musicbar').removeClass('animate');
        $('.jp-play-me').removeClass('active');
        $('.jp-play-me').parent('li').removeClass('active');
      });
     }

     playEvent(){
      $(document).on($.jPlayer.event.play, this.player.cssSelector.jPlayer,  function(){
        $('.musicbar').addClass('animate');
      });

     }
     removeItemEvent(){
       var self = this;
       $('.jp-playlist').on('click', '.jp-playlist-item-remove', () =>{
          var index = $(this).parents('li').index('.jp-playlist li');
          var playlist = <IPlayList>self.playlistService.getCurrentPlaylist();
          playlist.sounds.splice(index, 1);
          self.playlistService.setCurrentPlaylist(playlist);
      });
     }

     clickEvent(){
      $(document).on('click', '.jp-play-me', function(e:any){
        e && e.preventDefault();
        var $this = $(e.target);
        if (!$this.is('a')) $this = $this.closest('a');

        $('.jp-play-me').not($this).removeClass('active');
        $('.jp-play-me').parent('li').not($this.parent('li')).removeClass('active');

        $this.toggleClass('active');
        $this.parent('li').toggleClass('active');
        if( !$this.hasClass('active') ){
          this.player.pause();
        }else{
          var i = Math.floor(Math.random() * (1 + 7 - 1));
          this.player.play(i);
        }
        
      });
     }

     createPlayer(){
        var sounds:any[] = [];
        var playlist = <IPlayList>this.playlistService.getCurrentPlaylist();
        if( playlist ){
            sounds = playlist.sounds.map( (sound:Sound)=>{
              return this.convertSound(sound);
            });
        }

        this.player = new jPlayerPlaylist({
          jPlayer: "#jplayer_N",
          cssSelectorAncestor: "#jp_container_N"
        }, sounds, {
        playlistOptions: {
          enableRemoveControls: true,
          autoPlay: true
        },
        swfPath: "js/jPlayer",
        supplied: "webmv, ogv, m4v, oga, mp3",
        smoothPlayBar: true,
        keyEnabled: true,
        audioFullScreen: false
      });
    }
    convertSound(sound: Sound){
      return {
            title: sound.title,
            artist: sound.channel,
            mp3: `/api/v1/youtube/convert/${sound.id}`,
            poster: sound.thumbnail
        };
    }
}