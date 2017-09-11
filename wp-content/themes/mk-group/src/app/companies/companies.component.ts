import { Component, OnInit } from '@angular/core';
import {MetaService} from "@nglibs/meta";
import {ConfigService} from "../services/config.service";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor(private readonly meta: MetaService, private config: ConfigService) { }

  ngOnInit() {
    this.meta.setTitle('News | ' + this.config.siteTitle);
    this.meta.setTag('og:image', this.config['video_bg']);
    this.meta.setTag('og:description', 'News | ' + this.config.siteTitle);
    this.meta.setTag('og:url', window.location.href);
    this.meta.setTag('og:type', 'website');
  }

}
