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
import { CompanyComponent } from './company/company.component';
import { FooterComponent } from './minor-components/footer/footer.component';
import { SectorComponent } from './sector/sector.component';
import { PageComponent } from './page/page.component';
import { CategoryComponent } from './category/category.component';
import { ArticleComponent } from './article/article.component';
import { MetaModule, MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { AgmCoreModule } from '@agm/core';
import { ExcerptPipe } from './excerpt.pipe';

const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  autoplay: 0,
  keyboardControl: true
};

export function metaFactory(): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' | ',
    applicationName: 'Agri Europe',
    defaults: {
      title: 'Agri Europe',
      description: 'Agri Europe',
      'og:image': 'https://upload.wikimedia.org/wikipedia/commons/f/f8/superraton.jpg',
      'og:type': 'website',
      'og:locale': 'en_US',
      'og:locale:alternate': 'sr_RS'
    }
  });
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    GridDecorationComponent,
    CurtainComponent,
    AgriSwiperComponent,
    SectorsComponent,
    CompanyComponent,
    FooterComponent,
    SectorComponent,
    PageComponent,
    CategoryComponent,
    ArticleComponent,
    ExcerptPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    SwiperModule.forRoot(SWIPER_CONFIG),
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory)
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCWFIftAlo511EyY2u3vX4hopoI6iHyj40'
    })
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
