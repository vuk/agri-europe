import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SectorsComponent} from './sectors/sectors.component';
import {SectorComponent} from './sector/sector.component';
import {PageComponent} from './page/page.component';
import {CategoryComponent} from './category/category.component';
import {CompanyComponent} from './company/company.component';
import {ArticleComponent} from './article/article.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sectors', component: SectorsComponent},
  {path: 'sectors/:slug', component: SectorComponent},
  {path: 'page/:slug', component: PageComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'category/:slug', component: CategoryComponent},
  {path: 'company/:slug', component: CompanyComponent},
  {path: 'article/:slug', component: ArticleComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
