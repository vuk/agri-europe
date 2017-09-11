import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../services/config.service";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MetaService} from "@nglibs/meta";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  
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
  
  ngOnInit() {
    this.config.setDarkLogo(true);
    this.params = this.activeRoute.params.subscribe(params => {
      this.slug = params['slug'];
      this.config.getPost('post', params['slug'])
        .subscribe((response) => {
          this.article = response;
          this.meta.setTitle(this.article.post_title + ' | Home Page');
          this.meta.setTag('og:image', this.article.featured_image);
          this.meta.setTag('og:description', this.article.post_content.substr(0, 100));
          this.meta.setTag('og:url', window.location.href);
          this.meta.setTag('og:type', 'website');
          this.titleService.setTitle(this.article.post_title + ' | ' + this.config.siteTitle);
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
