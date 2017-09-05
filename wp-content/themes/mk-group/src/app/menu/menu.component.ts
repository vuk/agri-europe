import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import * as jQuery from "jquery";
import {ConfigService} from "../services/config.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  constructor(private router: Router, private config: ConfigService) {
  }
  
  darkLogo: boolean = true;
  configuration: any;
  darkLogoUrl: string;
  lightLogoUrl: string;
  
  ngOnInit() {
    this.configuration = this.config.getConfig();
    this.darkLogoUrl = this.configuration['dark_logo'];
    this.lightLogoUrl = this.configuration['light_logo'];
  }
  
  showMenu() {
    let $menuAnimation = jQuery('.menu-animation');
    let $menu = jQuery('.menu-bar');
    $menuAnimation.addClass('open');
    $menu.addClass('white-bg');
    setTimeout(() => {
      this.router.navigate(['/sectors']);
      $menuAnimation.removeClass('open');
      $menu.removeClass('white-bg');
    }, 300);
  }
  
  onLogoChange(dark: boolean) {
    this.darkLogo = dark;
  }
  
}
