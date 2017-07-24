import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Option} from "../interfaces/option";
import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeResolver implements Resolve<Option> {
    constructor(private _http: Http) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Option> | any {
        let videos = {};
        return this._http.get('http://localhost/agri-backend/wp-json/mk/options/?option=home_webm')
            .map((res: Response) => {
                videos['webm'] = res.json().value;
                return videos;
            })
            .flatMap((videos) => this._http.get('http://localhost/agri-backend/wp-json/mk/options/?option=home_mp4')).map((res: Response) => {
                videos['mp4'] = res.json().value;
                return videos;
            });
    }
}