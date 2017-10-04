import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ConfigService {

  config: any;
  apiUrl = 'http://www.agrieurope.com.cy/backend/';
  siteTitle = 'Agri Europe';
  darkLogo = false;
  darkLogoChange: Subject<boolean> = new Subject<boolean>();
  hideLabelChange: Subject<boolean> = new Subject<boolean>();
  hideLabel: boolean;
  currentStateType: string;

  constructor(private http: HttpClient) {
  }

  init(): Observable<String[]> {
    return this.http.get(this.apiUrl + 'wp-json/mk/options')
      .map((res: Response) => {
        this.config = res['value'];
        return this.config;
      })
      .flatMap(() => this.http.get(this.apiUrl + 'wp-json/mk/post_type?post_type=slide&category=2&taxonomy=slide_category'))
      .map((res: Response) => {
        this.config['homeHero'] = res;
        return this.config;
      });
  }

  getConfig(): Array<String> {
    return this.config;
  }

  getSectors(): Observable<any> {
    return this.http.get(this.apiUrl + 'wp-json/mk/post_type?post_type=sector&order=asc&orderby=menu_order')
      .map((res: Response) => res);
  }

  getCompanies(category: number): Observable<any> {
    return this.http.get(this.apiUrl + 'wp-json/mk/post_type?post_type=company&category=' + category + '&taxonomy=company_category')
      .map((res: Response) => res);
  }

  getNews(category?: any, perPage?: number, page?: number): Observable<any> {
    let query = '';
    if (category) {
      query += '&category=' + category;
    }
    if (perPage) {
      query += '&per_page=' + perPage + '&page=' + page;
    }
    return this.http.get(this.apiUrl + 'wp-json/mk/post_type?post_type=post' + query)
      .map((res: Response) => res);
  }

  getMenu(menu): Observable<any> {
    return this.http.get(this.apiUrl + 'wp-json/mk/menu/?menu=' + menu)
      .map((res: Response) => res);
  }

  setDarkLogo(darkLogo: boolean) {
    this.darkLogo = darkLogo;
    this.darkLogoChange.next(this.darkLogo);
  }

  hideMenuLabel(hide: boolean) {
    this.hideLabel = hide;
    this.hideLabelChange.next(this.hideLabel);
  }

  getDarkLogo(): boolean {
    return this.darkLogo;
  }

  getPost(type: string, name?: string, id?: number): any {
    const params = name ? '&name=' + name : '&p=' + id;
    return this.http.get(this.apiUrl + 'wp-json/mk/single_post?post_type=' + type + params)
      .map((res: Response) => res);
  }

  setCurrentStateType (stateType: string) {
    this.currentStateType = stateType;
  }

  getCurrentStateType (): string {
    return this.currentStateType;
  }
}
