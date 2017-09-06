import {Observable} from "rxjs/Observable";
import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import {Subject} from "rxjs/Subject";

@Injectable()
export class ConfigService {
  
  config: Array<string>;
  apiUrl: string = 'http://localhost/agri-backend/';
  
  darkLogo = false;
  darkLogoChange: Subject<boolean> = new Subject<boolean>();
  
  constructor(private http: Http) {
  }
  
  init(): Observable<String[]> {
    return this.http.get(this.apiUrl + 'wp-json/mk/options')
      .map((res: Response) => {
        this.config = res.json().value;
        return this.config;
      })
      .flatMap(() => this.http.get(this.apiUrl + 'wp-json/mk/post_type?post_type=slide&category=2'))
      .map((res: Response) => {
        this.config['homeHero'] = res.json();
        return this.config;
      });
  }
  
  getConfig(): Array<String> {
    return this.config;
  }
  
  getSectors(): Observable<any> {
    return this.http.get(this.apiUrl + 'wp-json/mk/post_type?post_type=sector&order=asc&orderby=menu_order')
      .map((res: Response) => res.json());
  }
  
  getMenu (menu): Observable<any> {
    return this.http.get(this.apiUrl + 'wp-json/mk/menu/?menu=' + menu)
      .map((res: Response) => res.json());
  }
  
  setDarkLogo (darkLogo: boolean) {
    this.darkLogo = darkLogo;
    this.darkLogoChange.next(this.darkLogo);
  }
  
  getDarkLogo (): boolean {
    return this.darkLogo;
  }
}