import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../services/config.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {MetaService} from '@ngx-meta/core';
import {trigger, transition, style, animate} from '@angular/animations';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
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
export class ArticleComponent implements OnInit {
  params: any;
  slug: string;
  article: any;
  loaded = false;
  menuItems: any;
  menuLoaded = false;
  articleHtml: string;
  newsItems: any;
  constructor(private config: ConfigService,
              private titleService: Title,
              private activeRoute: ActivatedRoute,
              private location: Location,
              private readonly meta: MetaService) {
  }
  ngOnInit() {
    this.config.setDarkLogo(true);
    this.params = this.activeRoute.params.subscribe(params => {
      this.slug = params['slug'];
      this.config.getPost('post', params['slug'])
        .subscribe((response) => {
          this.article = response;
          this.article.post_date = this.article.post_date.replace(/-/g, '/');
          this.meta.setTitle(this.article.post_title + ' | ' + this.config.siteTitle);
          this.meta.setTag('og:image', this.article.featured_image);
          this.meta.setTag('og:description', this.article.post_content.substr(0, 100));
          this.meta.setTag('og:url', window.location.href);
          this.meta.setTag('og:type', 'website');
          this.titleService.setTitle(this.article.post_title + ' | ' + this.config.siteTitle);
          this.articleHtml = '<img class=\'postimage\' src=\'' + this.article.featured_image + '\'/>' + this.article.post_content_formatted;
          this.loaded = true;
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
  goBack() {
    this.location.back();
  }
}
