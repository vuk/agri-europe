import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {MenuComponent} from "./menu/menu.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'menu', component: MenuComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}