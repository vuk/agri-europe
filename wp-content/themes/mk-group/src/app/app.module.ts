import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";
import {ConfigService} from "./services/config.service";
import 'rxjs/add/operator/toPromise';
import {init} from "./appInit";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [
        ConfigService,
        {
            'provide': APP_INITIALIZER,
            'useFactory': init,
            'deps': [ConfigService],
            'multi': true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
