import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    webmVideo = '';
    mp4Video = '';

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data
            .subscribe(
                (data: Data) => {
                    this.webmVideo = data['video'].webm;
                    this.mp4Video = data['video'].mp4;
                }
            );
    }

}
