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
import {SwiperDirective, SwiperModule} from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { GridDecorationComponent } from './minor-components/grid-decoration/grid-decoration.component';
import { CurtainComponent } from './minor-components/curtain/curtain.component';
import { AgriSwiperComponent } from './minor-components/agri-swiper/agri-swiper.component';
import { SectorsComponent } from './sectors/sectors.component';
import { SingleSectorComponent } from './single-sector/single-sector.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './company/company.component';
import { FooterComponent } from './minor-components/footer/footer.component';
import { SectorComponent } from './sector/sector.component';
import { PageComponent } from './page/page.component';
import { CategoryComponent } from './category/category.component';

const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  autoplay: 0,
  keyboardControl: true
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    GridDecorationComponent,
    CurtainComponent,
    AgriSwiperComponent,
    SectorsComponent,
    SingleSectorComponent,
    CompaniesComponent,
    CompanyComponent,
    FooterComponent,
    SectorComponent,
    PageComponent,
    CategoryComponent
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
    },
    SwiperDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
