import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../services/config.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    config: Array<String>;
    webmVideo: String = '';
    mp4Video: String = '';
    videoPoster: String = '';

    constructor(private configService: ConfigService) {
    }

    ngOnInit() {
        this.config = this.configService.getConfig();
        this.webmVideo = this.config['home_webm'];
        this.mp4Video = this.config['home_mp4'];
        this.videoPoster = this.config['video_bg'];
    }

}
