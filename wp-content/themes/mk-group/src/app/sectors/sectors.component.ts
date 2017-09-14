import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as jQuery from 'jquery';
import 'rxjs/add/operator/map';
import {ConfigService} from "../services/config.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {MetaService} from "@nglibs/meta";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-sectors-component',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css'],
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
export class SectorsComponent implements OnInit {

  constructor(private config: ConfigService, private router: Router, private titleService: Title, private readonly meta: MetaService) { }
  
  sectors: any;
  @Output()
  darkLogo: EventEmitter<boolean> = new EventEmitter<boolean>();
  menuItems: any;
  loaded: boolean = false;
  menuLoaded: boolean = false;

  ngOnInit() {
    this.config.setDarkLogo(true);
    this.titleService.setTitle('Sectors | ' + this.config.siteTitle);
    this.meta.setTitle('Sectors | ' + this.config.siteTitle);
    this.meta.setTag('og:image', this.config['video_bg']);
    this.meta.setTag('og:description', 'Sectors | ' + this.config.siteTitle);
    this.meta.setTag('og:url', window.location.href);
    this.meta.setTag('og:type', 'website');
    let $menu = jQuery('.menu-bar');
    $menu.addClass('white-bg');
    this.config.getSectors()
      .subscribe((response) => {
        this.sectors = response.slides;
        this.loaded = true;
      });
    this.config.getMenu('main')
      .subscribe((response) => {
        this.menuItems = response;
        this.menuLoaded = true;
      });
  }
  
  openSector(sector: any) {
    this.router.navigate(['/sectors/', sector.post_name])
  }

}
