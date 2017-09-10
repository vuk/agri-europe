import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../services/config.service";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Route, Router} from "@angular/router";
import * as jQuery from 'jquery';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  menuItems;
  menuLoaded: boolean;
  news;
  loaded: boolean;
  params;
  page: number = 1;
  perPage: number = 4;
  maxPages: number = 1;
  slug: string;
  
  constructor(private activeRoute: ActivatedRoute, private config: ConfigService, private titleService: Title, private router: Router) { }

  ngOnInit() {
    this.config.setDarkLogo(true);
    this.titleService.setTitle('News | ' + this.config.siteTitle);
    this.params = this.activeRoute.params.subscribe(params => {
      this.slug = params['slug'];
      this.config.getNews(params['slug'], this.perPage, this.page)
        .subscribe((response) => {
          this.news = response.slides;
          this.maxPages = response.page_count;
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
  
  nextPage () {
    if (this.page < this.maxPages) {
      jQuery('.sector-curtain').removeClass('transparent');
      jQuery('.sector-curtain').addClass('unfolded');
      this.config.getNews(this.slug, this.perPage, ++this.page)
        .subscribe((response) => {
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
  
  activatePreview(article) {
    jQuery('.sector-active').removeClass('activated');
    jQuery('[data-id=' + article.ID + ']').addClass('activated');
  }
  
  deactivatePreview(article) {
    jQuery('.sector-active').removeClass('activated');
  }
  
  openArticle (article: any) {
    console.log(article);
    this.router.navigate(['article', article.post_name]);
  }
}
