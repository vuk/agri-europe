import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {SwiperComponent, SwiperConfigInterface} from "ngx-swiper-wrapper";
import * as jQuery from 'jquery';
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-agri-swiper',
  templateUrl: './agri-swiper.component.html',
  styleUrls: ['./agri-swiper.component.css']
})
export class AgriSwiperComponent implements OnInit, OnDestroy {
  
  swiperConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto',
    keyboardControl: true
  };
  
  config = null;
  slides = [];
  sliderInterval;
  
  @ViewChild('agriSwiper') swiper: SwiperComponent;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.config = this.configService.getConfig();
    this.slides = this.config.homeHero.slides;
    this.runSlider();
  }
  
  runSlider () {
    if (this.slides.length > 1) {
      this.sliderInterval = setInterval(() => {
        jQuery('.curtain__tile').removeClass('transparent');
        jQuery('.curtain__tile').addClass('unfolded');
        setTimeout(() => {
          this.swiper.directiveRef.nextSlide();
          jQuery('.curtain__tile').addClass('opposite');
          setTimeout(() => {
            jQuery('.curtain__tile').addClass('transparent');
            jQuery('.curtain__tile').removeClass('unfolded');
            jQuery('.curtain__tile').removeClass('opposite');
          }, 500);
        }, 1000);
      }, this.config.time_delay);
    }
  }
  
  ngOnDestroy() {
    clearInterval(this.sliderInterval);
  }
}
