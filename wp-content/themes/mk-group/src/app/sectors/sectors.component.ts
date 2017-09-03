import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-sectors-component',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})
export class SectorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let $menu = jQuery('.menu-bar');
    $menu.addClass('white-bg');
  }

}
