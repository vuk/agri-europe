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
    this.slides = this.config.homeHero.slides;
    console.log(this.slides);
    this.runSlider();
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
