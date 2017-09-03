import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import * as jQuery  from "jquery";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit() {
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

}
