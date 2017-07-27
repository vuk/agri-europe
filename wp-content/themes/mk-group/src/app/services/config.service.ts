import {Observable} from "rxjs/Observable";
import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Injectable()
export class ConfigService {

    config: Array<String>;

    constructor(private http: Http) {
    }

    init(): Observable<String[]> {
        return this.http.get('http://localhost/agri-backend/wp-json/mk/options')
            .map((res: Response) => {
                this.config = res.json().value;
                return this.config;
            });
    }

    getConfig(): Array<String> {
        return this.config;
    }
}