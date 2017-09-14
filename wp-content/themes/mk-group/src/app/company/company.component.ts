import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from "../services/config.service";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {MetaService} from "@nglibs/meta";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  params: any;
  slug: string;
  company: any;
  muted: boolean;
  @ViewChild('videoRef') video: ElementRef;
  
  constructor(private route: ActivatedRoute, private configService: ConfigService, private titleService: Title, private readonly meta: MetaService) { }

  ngOnInit() {
    this.muted = localStorage.getItem('muted') === '1';
    let $menu = jQuery('.menu-bar');
    $menu.removeClass('white-bg');
    this.configService.setDarkLogo(false);
    this.params = this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.configService.getPost('company', this.slug)
        .subscribe(response => {
          this.company = response;
          setTimeout (() => {
            this.video.nativeElement.muted = this.muted;
          }, 200);
          this.titleService.setTitle(response.post_title + ' | ' + this.configService.siteTitle);
          this.meta.setTitle(response.post_title + ' | ' + this.configService.siteTitle);
          this.meta.setTag('og:image', this.company.video_poster);
          this.meta.setTag('og:description', this.company.post_content.substr(0, 100));
          this.meta.setTag('og:url', window.location.href);
          this.meta.setTag('og:type', 'website');
        })
    });
  }
  
  toggleMute () {
    this.muted = !this.muted;
    localStorage.setItem('muted', this.muted ? '1' : '0');
    this.video.nativeElement.muted = this.muted;
  }

}
