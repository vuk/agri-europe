import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../services/config.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import * as jQuery from 'jquery';
import {MetaService} from '@ngx-meta/core';
import {trigger, transition, style, animate} from '@angular/animations';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
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
export class CategoryComponent implements OnInit {
  menuItems;
  menuLoaded: boolean;
  news;
  loaded = false;
  params: any;
  queryParams: any;
  page = 1;
  perPage = 4;
  maxPages = 1;
  slug: string;
  newsItems: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private config: ConfigService,
    private titleService: Title,
    private readonly meta: MetaService,
    private router: Router) { }

  ngOnInit() {
    this.loaded = false;
    this.config.setDarkLogo(true);
    this.titleService.setTitle('News | ' + this.config.siteTitle);
    this.meta.setTitle('News | ' + this.config.siteTitle);
    this.meta.setTag('og:image', this.config['video_bg']);
    this.meta.setTag('og:description', 'News | ' + this.config.siteTitle);
    this.meta.setTag('og:url', window.location.href);
    this.meta.setTag('og:type', 'website');
    this.params = this.activeRoute.params.subscribe(params => {
      this.queryParams = this.activeRoute.queryParams.subscribe(queryParams => {
        this.slug = params['slug'];
        if (queryParams['page']) {
          this.page = queryParams['page'];
        }
        this.config.getNews(params['slug'], this.perPage, this.page)
          .subscribe((response) => {
            this.news = response.slides;
            this.maxPages = response.page_count;
            this.loaded = true;
          });
      });
    });
    this.config.getMenu('main')
      .subscribe((response) => {
        this.menuItems = response;
        this.menuLoaded = true;
      });
    this.config.getMenu('news')
      .subscribe((response) => {
        this.newsItems = response;
      });
    const $menu = jQuery('.menu-bar');
    $menu.addClass('white-bg');
  }
  nextPage () {
    if (this.page < this.maxPages) {
      jQuery('.sector-curtain').removeClass('transparent');
      jQuery('.sector-curtain').addClass('unfolded');
      this.config.getNews(this.slug, this.perPage, ++this.page)
        .subscribe((response) => {
          this.router.navigate(['category', this.slug], {replaceUrl: true, queryParams: {
            page: this.page
          }});
          setTimeout(() => {
            jQuery('.sector-curtain').addClass('opposite');
            this.news = response.slides;
            jQuery('.sector-curtain').removeClass('transparent');
            jQuery('.sector-curtain').addClass('unfolded');
            setTimeout(() => {
              jQuery('.sector-curtain').addClass('transparent');
              jQuery('.sector-curtain').removeClass('unfolded');
              jQuery('.sector-curtain').removeClass('opposite');
            }, 500);
            this.maxPages = response.page_count;
            this.loaded = true;
          }, 500);
        });
    }
  }
  previousPage () {
    if (this.page - 1 > 0) {
      jQuery('.sector-curtain').removeClass('transparent');
      jQuery('.sector-curtain').addClass('unfolded');
      this.config.getNews(this.slug, this.perPage, --this.page)
        .subscribe((response) => {
          this.router.navigate(['category', this.slug], {replaceUrl: true, queryParams: {
            page: this.page
          }});
          setTimeout(() => {
            jQuery('.sector-curtain').addClass('opposite');
            this.news = response.slides;
            setTimeout(() => {
              jQuery('.sector-curtain').addClass('transparent');
              jQuery('.sector-curtain').removeClass('unfolded');
              jQuery('.sector-curtain').removeClass('opposite');
            }, 500);
            this.maxPages = response.page_count;
            this.loaded = true;
          }, 500);
        });
    }
  }
  goCategory(permalink) {
    this.router.navigateByUrl('/dummy', { skipLocationChange: true });
    setTimeout(() => this.router.navigate([permalink]));
  }
  openArticle (article: any) {
    this.router.navigate(['article', article.post_name]);
  }
}
