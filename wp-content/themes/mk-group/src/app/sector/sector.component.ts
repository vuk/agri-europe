import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {ConfigService} from "../services/config.service";
import {Title} from "@angular/platform-browser";

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
  
  constructor(private route: ActivatedRoute, private configService: ConfigService, private router: Router, private titleService: Title) {
  }
  
  ngOnInit() {
    let $menu = jQuery('.menu-bar');
    $menu.addClass('white-bg');
    this.params = this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.configService.setDarkLogo(true);
      this.configService.getPost('sector', this.slug)
        .subscribe((response) => {
            this.titleService.setTitle(response.post_title + ' | ' + this.configService.siteTitle);
            this.linksTo = response.links_to;
            if (this.linksTo === 'company_list') {
              this.configService.getCompanies(response.company_category_to_display.term_id)
                .subscribe((companies) => {
                  this.companies = companies.slides;
                });
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
    console.log(company);
    this.router.navigate(['company', company.post_name]);
  }
  
  
}
