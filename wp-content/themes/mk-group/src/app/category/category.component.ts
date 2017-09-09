import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../services/config.service";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";

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
  
  constructor(private activeRoute: ActivatedRoute, private config: ConfigService, private titleService: Title) { }

  ngOnInit() {
    this.config.setDarkLogo(true);
    this.titleService.setTitle('Sectors | ' + this.config.siteTitle);
    this.params = this.activeRoute.params.subscribe(params => {
      this.config.getNews(params['slug'])
        .subscribe((response) => {
          this.news = response.slides;
          console.log(this.news);
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

}
