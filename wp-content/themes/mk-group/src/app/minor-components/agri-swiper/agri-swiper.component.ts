import { Component, OnInit, ViewChild } from '@angular/core';
import {SwiperComponent, SwiperConfigInterface} from "ngx-swiper-wrapper";
import * as jQuery from 'jquery';
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-agri-swiper',
  templateUrl: './agri-swiper.component.html',
  styleUrls: ['./agri-swiper.component.css']
})
export class AgriSwiperComponent implements OnInit {
  
  swiperConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto',
    keyboardControl: true
  };
  
  config = null;
  slides = [];
  swDirective = null;
  
  @ViewChild(SwiperComponent)
  private swiper: SwiperComponent;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.config = this.configService.getConfig();
    this.slides = [
      {
        mp4Video: this.config['home_mp4'],
        webmVideo: this.config['home_webm'],
        poster: this.config['video_bg']
      }
    ];
    if (this.config['home_mp42']) {
      this.slides.push({
        mp4Video: this.config['home_mp42'],
        webmVideo: this.config['home_webm2'],
        poster: this.config['video_bg2']
      })
    }
    if (this.config['home_mp43']) {
      this.slides.push({
        mp4Video: this.config['home_mp43'],
        webmVideo: this.config['home_webm3'],
        poster: this.config['video_bg3']
      })
    }
    if (this.config['home_mp44']) {
      this.slides.push({
        mp4Video: this.config['home_mp44'],
        webmVideo: this.config['home_webm4'],
        poster: this.config['video_bg4']
      })
    }
    if (this.config['home_mp45']) {
      this.slides.push({
        mp4Video: this.config['home_mp45'],
        webmVideo: this.config['home_webm5'],
        poster: this.config['video_bg5']
      })
    }
    this.runSlider();
    console.log(this.slides);
  }
  
  runSlider () {
    setInterval(() => {
      jQuery('.curtain__tile').removeClass('transparent');
      jQuery('.curtain__tile').addClass('unfolded');
      setTimeout(() => {
        this.swiper.nextSlide();
        jQuery('.curtain__tile').addClass('opposite');
        setTimeout(() => {
          jQuery('.curtain__tile').addClass('transparent');
          jQuery('.curtain__tile').removeClass('unfolded');
          jQuery('.curtain__tile').removeClass('opposite');
        }, 500);
      }, 1000);
      /*jQuery('.curtain__tile').css({
        transform: 'translateX(100%)'
      });*/
    }, 5000);
  }
}
