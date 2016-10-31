import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { StoreHelper } from './store-helper';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {
  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });

  AUTH_HEADER_KEY: string = 'code';

  constructor(
    private http: Http,
    private storeHelper: StoreHelper
  ) { }

  updateAuth() {
    this.headers.set('authorization', this.storeHelper.get(this.AUTH_HEADER_KEY));
  }

  get(path: string): Observable<any> {
    return this.http.get(path, { headers: this.headers })
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  post(path: string, body): Observable<any> {
    return this.http.post(path, JSON.stringify(body), { headers: this.headers })
      .map(this.checkForError)
      .catch(err => Observable.throw(err));
  }

  put(path: string, body): Observable<any> {
    return this.http.put(path, JSON.stringify(body), { headers: this.headers })
      .map(this.checkForError)
      .catch(err => Observable.throw(err));
  }

  delete(path): Observable<any> {
    return this.http.delete(path, { headers: this.headers })
      .map(this.checkForError)
      .catch(err => Observable.throw(err));
  }

  setHeaders(headers) {
    Object.keys(headers).forEach(header => this.headers.set(header, headers[header]));
  }

  getJson(response: Response) {
    return response.json();
  }

  private checkForError(response: Response): Response | Observable<any> {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error['response'] = response;
      console.error(error);
      throw error;
    }
  }
}
