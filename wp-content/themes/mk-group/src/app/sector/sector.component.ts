import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {trigger, transition, style, animate, state} from '@angular/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigService} from '../services/config.service';
import {Title} from '@angular/platform-browser';
import {MetaService} from '@ngx-meta/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('500ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('500ms', style({opacity: 0}))
        ])
      ]
    ),
    trigger('visibility', [
      state('shown', style({
        opacity: 1
      })),
      state('hidden', style({
        opacity: 0
      })),
      transition('* => *', animate('.3s'))
    ])
  ]
})
export class SectorComponent implements OnInit {
  params: any;
  slug: string;
  linksTo: string;
  companies: any;
  sector: any;
  preload: boolean;
  muted: boolean;
  moreCollapse = false;
  visibility: string;
  loaded = false;
  opositeVisibility: string;
  @ViewChild('videoRef') video: ElementRef;

  constructor(private location: Location, private route: ActivatedRoute,
              private configService: ConfigService, private router: Router,
              private titleService: Title, private readonly meta: MetaService) {
    // nothing to do
  }
  ngOnInit() {
    const iOS = /iPhone|iPod/.test(window.navigator.userAgent);
    const androidPhone = /Android/.test(window.navigator.userAgent) && /Mobile/.test(window.navigator.userAgent);
    console.log(iOS);
    this.muted = localStorage.getItem('muted') === '1';
    this.params = this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.configService.getPost('sector', this.slug)
        .subscribe((response) => {
            this.titleService.setTitle(response.post_title + ' | ' + this.configService.siteTitle);
            this.sector = response;
            this.togglePopup();
            if (iOS || androidPhone) {
              this.preload = false;
            } else {
              this.preload = this.configService.getCurrentStateType() !== 'company';
            }
            this.configService.setCurrentStateType('sector');
            this.meta.setTitle(response.post_title + ' | ' + this.configService.siteTitle);
            this.meta.setTag('og:image', this.configService['video_bg']);
            this.meta.setTag('og:description', response.post_title + ' | ' + this.configService.siteTitle);
            this.meta.setTag('og:url', window.location.href);
            this.meta.setTag('og:type', 'website');
            this.linksTo = response.links_to;
            if (this.linksTo === 'company_list') {
              this.configService.getCompanies(response.company_category_to_display.term_id)
                .subscribe((companies) => {
                  this.configService.setDarkLogo(true);
                  this.loaded = true;
                  const $menu = jQuery('.menu-bar');
                  $menu.addClass('white-bg');
                  this.companies = companies.slides;
                });
            } else {
              this.configService.setDarkLogo(false);
              const $menu = jQuery('.menu-bar');
              $menu.removeClass('white-bg');
              if (this.video) {
                this.video.nativeElement.muted = this.muted;
              }
            }
          },
          (err) => {
          });
    });
  }

  mouseOver(img, logoColor) {
    img.attributes.src.nodeValue = logoColor;
  }

  mouseOut(img, logoGray) {
    img.attributes.src.nodeValue = logoGray;
  }

  loadCompany(company: any) {
    this.router.navigate(['company', company.post_name]);
  }

  preloadEnded() {
    this.preload = false;
    if (this.linksTo === 'video_page') {
      setTimeout(() => {
        this.video.nativeElement.muted = this.muted;
      }, 100);
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('muted', this.muted ? '1' : '0');
    this.video.nativeElement.muted = this.muted;
  }

  togglePopup() {
    this.moreCollapse = !this.moreCollapse;
    this.visibility = this.moreCollapse ? 'shown' : 'hidden';
    this.opositeVisibility = this.moreCollapse ? 'hidden' : 'shown';
  }

  goBack() {
    this.location.back();
  }
}
