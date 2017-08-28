import { Component, OnInit } from '@angular/core';
import {SwiperComponent, SwiperConfigInterface} from "ngx-swiper-wrapper";
import * as jQuery from 'jquery';

@Component({
  selector: 'app-agri-swiper',
  templateUrl: './agri-swiper.component.html',
  styleUrls: ['./agri-swiper.component.css']
})
export class AgriSwiperComponent implements OnInit {
  
  swiperConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto',
    autoplay: 3000,
    onSlideChangeStart: this.slideChangeStart,
    keyboardControl: true
  };

  constructor() { }

  ngOnInit() {
  }
  
  slideChangeStart(swiper: SwiperComponent) {
    console.log(swiper);
  }
}
