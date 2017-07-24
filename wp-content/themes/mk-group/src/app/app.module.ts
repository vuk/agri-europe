import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";
import {HomeResolver} from "./services/home-resolver.service";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

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
    providers: [HomeResolver],
    bootstrap: [AppComponent]
})
export class AppModule {
}
