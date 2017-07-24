import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {HomeResolver} from "./services/home-resolver.service"

const appRoutes: Routes = [
    { path: '', component: HomeComponent, resolve: { video: HomeResolver }}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}