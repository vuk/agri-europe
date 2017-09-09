import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ConfigService} from "../services/config.service";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import * as jQuery from 'jquery';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('load', [
      state('in', style ({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate(500)
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  
  config: Array<String>;
  webmVideo: String = '';
  mp4Video: String = '';
  videoPoster: String = '';
  state: String = 'inactive';
  
  constructor(private configService: ConfigService, private titleService: Title) {
  }
  
  ngOnInit() {
    this.titleService.setTitle(this.configService.siteTitle + ' | Home Page');
    this.configService.setDarkLogo(false);
    this.config = this.configService.getConfig();
    this.webmVideo = this.config['home_webm'];
    this.mp4Video = this.config['home_mp4'];
    this.videoPoster = this.config['video_bg'];
    let $menu = jQuery('.menu-bar');
    $menu.removeClass('white-bg');
  }
  
}
