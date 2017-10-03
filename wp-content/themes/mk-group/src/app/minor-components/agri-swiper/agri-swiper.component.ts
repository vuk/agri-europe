import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {SwiperComponent, SwiperConfigInterface} from 'ngx-swiper-wrapper';
import * as jQuery from 'jquery';
import {ConfigService} from '../../services/config.service';
import {Router} from '@angular/router';

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
  muted;
  @ViewChild('videoRef') video: ElementRef;
  @ViewChild('agriSwiper') swiper: SwiperComponent;
  constructor(private configService: ConfigService, private router: Router) {
  }
  ngOnInit() {
    this.muted = localStorage.getItem('muted') === '1';
    this.config = this.configService.getConfig();
    this.slides = this.config.homeHero.slides;
    this.runSlider();
    setTimeout(() => {
      this.video.nativeElement.muted = this.muted;
    }, 200);
  }
  runSlider() {
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
            this.video.nativeElement.muted = this.muted;
          }, 500);
        }, 1000);
      }, this.config.time_delay);
    }
  }
  ngOnDestroy() {
    clearInterval(this.sliderInterval);
  }
  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('muted', this.muted ? '1' : '0');
    this.video.nativeElement.muted = this.muted;
  }
  videoEnded() {
    this.router.navigate(['/sectors']);
  }
}
