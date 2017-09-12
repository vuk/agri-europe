import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../services/config.service";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {MetaService} from "@nglibs/meta";
import {Location} from "@angular/common";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
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
  
  ngOnInit() {
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
          if (this.article.post_name === 'chairman' || this.article.post_name === 'board-of-directors') {
            this.config.getMenu('management')
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
