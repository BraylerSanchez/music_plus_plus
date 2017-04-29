import { Component, OnInit, NgZone } from '@angular/core';
import { IPlayList } from '../../interfaces/playlist/playlist.interface';
import { Sound } from '../../interfaces/player/sound.interface';
import { PlayerService, onPlayMusic, onStopMusic, onSuspendMusic} from '../../services/player/player.service';
import { LoginService } from '../../services/user/login.service';
import {MdSnackBar} from '@angular/material';

import { PlaylistService, onAddSound, onRemoveSound, onPlaylistChange } from '../../services/playlist/playlist.service';

declare var jPlayerPlaylist:any, $:any;

@Component({
  selector: 'footer-partial',
    templateUrl: 'client/templates/components/footer.partial.component.html',
    providers: [PlayerService, PlaylistService]
})
export class FooterPartialComponent implements OnInit {
    private player:any;
    constructor(
      private playlistService: PlaylistService,
      private zone:NgZone,
      private snackBar: MdSnackBar
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
            if(sounds.length > 0){
                this.player.setPlaylist(sounds);
            }else{
                this.player.setPlaylist([]);
                this.player.pause();
            }
            this.snackBar.open(`Playlist changed to ${result.name} success`, 'Playlist', {
              duration: 5000,
            });
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