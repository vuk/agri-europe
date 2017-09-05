import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  address: string;
  office: string;
  company: string;
  city: string;
  config: any;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.config = this.configService.getConfig();
    this.address = this.config['office_address'];
    this.office = this.config['office'];
    this.company = this.config['company_name'];
    this.city = this.config['office_city'];
  }

}
