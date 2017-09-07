import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {MenuComponent} from "./menu/menu.component";
import {SectorsComponent} from "./sectors/sectors.component";
import {SectorComponent} from "./sector/sector.component";
import {PageComponent} from "./page/page.component";
import {CategoryComponent} from "./category/category.component";
import {CompanyComponent} from "./company/company.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sectors', component: SectorsComponent},
  {path: 'sectors/:slug', component: SectorComponent},
  {path: 'page/:slug', component: PageComponent},
  {path: 'category/:slug', component: CategoryComponent},
  {path: 'company/:slug', component: CompanyComponent},
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