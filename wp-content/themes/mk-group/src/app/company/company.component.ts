import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from "../services/config.service";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {MetaService} from "@nglibs/meta";
import {animate, style, transition, trigger, state} from "@angular/animations";
import {Location} from "@angular/common";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  animations: [
    trigger('visibility', [
      state('shown', style({
        opacity: 1
      })),
      state('hidden', style({
        opacity: 0
      })),
      transition('* => *', animate('.3s'))
    ])
  ],
})
export class CompanyComponent implements OnInit {

  params: any;
  slug: string;
  company: any;
  muted: boolean;
  moreCollapse: boolean = false;
  visibility: string;
  opositeVisibility: string;
  @ViewChild('videoRef') video: ElementRef;
  
  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
    private titleService: Title,
    private location: Location,
    private readonly meta: MetaService) { }

  ngOnInit() {
    this.moreCollapse = false;
    this.configService.setCurrentStateType('company');
    this.muted = localStorage.getItem('muted') === '1';
    let $menu = jQuery('.menu-bar');
    $menu.removeClass('white-bg');
    this.configService.setDarkLogo(false);
    this.params = this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.configService.getPost('company', this.slug)
        .subscribe(response => {
          this.company = response;
          this.togglePopup();
          setTimeout (() => {
            this.video.nativeElement.muted = this.muted;
          }, 100);
          this.titleService.setTitle(response.post_title + ' | ' + this.configService.siteTitle);
          this.meta.setTitle(response.post_title + ' | ' + this.configService.siteTitle);
          this.meta.setTag('og:image', this.company.video_poster);
          this.meta.setTag('og:description', this.company.post_content.substr(0, 100));
          this.meta.setTag('og:url', window.location.href);
          this.meta.setTag('og:type', 'website');
        })
    });
  }
  
  toggleMute () {
    this.muted = !this.muted;
    localStorage.setItem('muted', this.muted ? '1' : '0');
    this.video.nativeElement.muted = this.muted;
  }
  
  togglePopup () {
    this.moreCollapse = !this.moreCollapse;
    this.visibility = this.moreCollapse ? 'shown' : 'hidden';
    this.opositeVisibility = this.moreCollapse ? 'hidden' : 'shown';
  }
  
  goBack() {
    this.location.back();
  }

}
