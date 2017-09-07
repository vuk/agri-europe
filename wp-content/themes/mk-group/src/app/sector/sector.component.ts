import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {ConfigService} from "../services/config.service";

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {
  
  params: any;
  slug: string;
  
  constructor(private route: ActivatedRoute, private configService: ConfigService) {
  }
  
  ngOnInit() {
    this.params = this.route.params.subscribe(params => {
      this.slug = params['slug']; // (+) converts string 'id' to a number
      console.log(this.slug);
      this.configService.getPost('sector', this.slug)
        .subscribe((response) => {
            console.log(response);
          },
          (err) => {
            console.log(err);
          });
    });
  }
  
}
