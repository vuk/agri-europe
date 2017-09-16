import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../services/config.service";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {MetaService} from "@nglibs/meta";
import {Location} from "@angular/common";
import {trigger, transition, style, animate} from '@angular/animations';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
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
    )
  ]
})
export class PageComponent implements OnInit {
  
  constructor(
    private config: ConfigService,
    private titleService: Title,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private readonly meta: MetaService) {
  }
  
  params: any;
  slug: string;
  article: any;
  loaded: boolean = false;
  menuItems: any;
  menuLoaded: boolean = false;
  articleHtml: string;
  background: any;
  submenu: any;
  long: number;
  lat: number;
  replaced: string;
  
  ngOnInit() {
    this.lat = 34.6904528;
    this.long = 33.0684307;
    this.submenu = [];
    this.config.setDarkLogo(true);
    this.params = this.activeRoute.params.subscribe(params => {
      this.slug = params['slug'];
      this.config.getPost('page', params['slug'])
        .subscribe((response) => {
          this.article = response;
          if (this.article.redirect) {
            let segments = this.article.redirect.split('/');
            this.router.navigate(['page', segments[segments.length - 2]]);
          }
          this.meta.setTitle(this.article.post_title + ' | ' + this.config.siteTitle);
          this.meta.setTag('og:image', this.article.featured_image);
          this.meta.setTag('og:description', this.article.post_content.substr(0, 100));
          this.meta.setTag('og:url', window.location.href);
          this.meta.setTag('og:type', 'website');
          this.titleService.setTitle(this.article.post_title + ' | ' + this.config.siteTitle);
          this.background = this.article.background_image;
          this.articleHtml = this.article.post_content_formatted;
          const regex = /<br\s*[\/]?>/gi;
          this.replaced = this.article.post_content.replace(regex, "\n");
          /*if (this.article.post_name === 'chairman' || this.article.post_name === 'board-of-directors') {
            this.config.getMenu('management')
              .subscribe((response) => {
                this.submenu = response;
              });
          }*/
          if (this.article.post_name === 'about-us' || this.article.post_name === 'history' || this.article.post_name === 'mission-vision-values') {
            this.config.getMenu('about')
              .subscribe((response) => {
                this.submenu = response;
              });
          }
          this.loaded = true;
        });
    });
    this.config.getMenu('main')
      .subscribe((response) => {
        this.menuItems = response;
        this.menuLoaded = true;
      });
    let $menu = jQuery('.menu-bar');
    $menu.addClass('white-bg');
  }
  
  goBack() {
    this.location.back();
  }

}
