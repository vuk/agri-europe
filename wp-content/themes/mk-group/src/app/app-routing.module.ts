import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {MenuComponent} from "./menu/menu.component";
import {SectorsComponent} from "./sectors/sectors.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sectors', component: SectorsComponent},
  {path: '**', redirectTo: '/heroes', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}