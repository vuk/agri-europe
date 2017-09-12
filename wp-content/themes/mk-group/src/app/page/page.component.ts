import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../services/config.service";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {MetaService} from "@nglibs/meta";
import {Location} from "@angular/common";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  
  constructor(
    private config: ConfigService,
    private titleService: Title,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private readonly meta: MetaService) {
  }
  
  params: any;
  slug: string;
  article: any;
  loaded: boolean = false;
  menuItems: any;
  menuLoaded: boolean = false;
  articleHtml: string;
  newsItems: any;
  
  ngOnInit() {
    this.config.setDarkLogo(true);
    this.params = this.activeRoute.params.subscribe(params => {
      this.slug = params['slug'];
      this.config.getPost('page', params['slug'])
        .subscribe((response) => {
          this.article = response;
          this.meta.setTitle(this.article.post_title + ' | Home Page');
          this.meta.setTag('og:image', this.article.featured_image);
          this.meta.setTag('og:description', this.article.post_content.substr(0, 100));
          this.meta.setTag('og:url', window.location.href);
          this.meta.setTag('og:type', 'website');
          this.titleService.setTitle(this.article.post_title + ' | ' + this.config.siteTitle);
          this.articleHtml = "<img class='postimage' src='" + this.article.featured_image + "'" + this.article.post_content_formatted;
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
