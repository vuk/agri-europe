import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {ConfigService} from "./services/config.service";
import 'rxjs/add/operator/toPromise';
import {init} from "./appInit";
import { MenuComponent } from './menu/menu.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { GridDecorationComponent } from './minor-components/grid-decoration/grid-decoration.component';
import { CurtainComponent } from './minor-components/curtain/curtain.component';

const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboardControl: true
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    GridDecorationComponent,
    CurtainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    SwiperModule.forRoot(SWIPER_CONFIG)
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
