import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as jQuery from 'jquery';
import {ConfigService} from '../services/config.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  _subscription;
  _subscription2;
  langSelectorActive = false;
  activeLang = 'en';
  availableLangs = ['gr', 'sr'];
  darkLogo: boolean;
  configuration: any;
  darkLogoUrl: string;
  lightLogoUrl: string;
  hideLabel: boolean;

  constructor(private router: Router, private config: ConfigService) {
    this.darkLogo = config.darkLogo;
    this._subscription = config.darkLogoChange.subscribe((value) => {
      this.darkLogo = value;
    });
    this._subscription2 = config.hideLabelChange.subscribe((value) => {
      // this.hideLabel = value;
    });
  }

  ngOnInit() {
    this.configuration = this.config.getConfig();
    this.darkLogoUrl = this.configuration['dark_logo'];
    this.lightLogoUrl = this.configuration['light_logo'];
  }
  showMenu() {
    const $menuAnimation = jQuery('.menu-animation');
    const $menu = jQuery('.menu-bar');
    $menuAnimation.addClass('open');
    $menu.addClass('white-bg');
    setTimeout(() => {
      this.router.navigate(['/sectors']);
      $menuAnimation.removeClass('open');
      $menu.removeClass('white-bg');
    }, 300);
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this._subscription.unsubscribe();
    this._subscription2.unsubscribe();
  }
}
