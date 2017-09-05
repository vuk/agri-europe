import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as jQuery from 'jquery';
import 'rxjs/add/operator/map';
import {ConfigService} from "../services/config.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sectors-component',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})
export class SectorsComponent implements OnInit {

  constructor(private config: ConfigService, private router: Router) { }
  
  sectors: any;
  @Output()
  darkLogo: EventEmitter<boolean> = new EventEmitter<boolean>();
  menuItems: any;
  loaded: boolean = false;
  menuLoaded: boolean = false;

  ngOnInit() {
    this.darkLogo.emit(true);
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
    let $menu = jQuery('.menu-bar');
    $menu.addClass('white-bg');
  }
  
  openSector(sector: any) {
    console.log(sector);
    this.router.navigate(['/sector/' + sector.post_name])
  }

}
