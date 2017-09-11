import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {ConfigService} from "../services/config.service";
import {Title} from "@angular/platform-browser";
import {MetaService} from "@nglibs/meta";

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {
  
  params: any;
  slug: string;
  linksTo: string;
  companies: any;
  sector: any;
  
  constructor(private route: ActivatedRoute, private configService: ConfigService, private router: Router, private titleService: Title, private readonly meta: MetaService) {
  }
  
  ngOnInit() {
    this.params = this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.configService.getPost('sector', this.slug)
        .subscribe((response) => {
            this.titleService.setTitle(response.post_title + ' | ' + this.configService.siteTitle);
            this.sector = response;
            this.meta.setTitle(response.post_title + ' | ' + this.configService.siteTitle);
            this.meta.setTag('og:image', this.configService['video_bg']);
            this.meta.setTag('og:description', response.post_title + ' | ' + this.configService.siteTitle);
            this.meta.setTag('og:url', window.location.href);
            this.meta.setTag('og:type', 'website');
            this.linksTo = response.links_to;
            if (this.linksTo === 'company_list') {
              this.configService.getCompanies(response.company_category_to_display.term_id)
                .subscribe((companies) => {
                  this.companies = companies.slides;
                });
            } else {
              this.configService.setDarkLogo(false);
              let $menu = jQuery('.menu-bar');
              $menu.removeClass('white-bg');
            }
          },
          (err) => {
            console.log(err);
          });
    });
  }
  
  mouseOver(img, logoColor) {
    img.attributes.src.nodeValue = logoColor;
  }
  
  mouseOut(img, logoGray) {
    img.attributes.src.nodeValue = logoGray;
  }
  
  loadCompany(company: any) {
    this.router.navigate(['company', company.post_name]);
  }
  
  
}
