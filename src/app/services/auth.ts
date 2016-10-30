import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  NavigationExtras,
  Params,
} from '@angular/router';
import 'rxjs/Rx';

import { StoreHelper } from './store-helper';
import { AppState } from '../app.service';
// import other services from files directly as the index might want to reimport this one.
import { ApiService } from './api';

@Injectable()
export class AuthService implements CanActivate {

  constructor(
    private storeHelper: StoreHelper,
    private api: ApiService,
    private router: Router,
    private appState: AppState,
  ) {
    const token = this.storeHelper.get(this.api.AUTH_HEADER_KEY);
    if (token) {
      this.setAuthTokens(token);
    }

  }

  // API Docs at https://swaggerhub.com/api/Magor/Authorize/1
  // # OAuth2

  // Request an authorization code
  // Request an access token
  authenticate() {
    // Use redirect to avoid storing secret on the client
    // User must enter credentials on auth form served by authorization server
    // The redirect comes back to us with a bunch of query string params, but doesn't add the original ? so we
    // add those to start from. The ngid=0 is currently just a placeholder, but could be used to get back to a specific
    // state of this app (or info in a browser cache / cookie).

    let loc = location;
    // get the current URL so we can redirect back to the same UI.


    window.location.href = '' +
      'https://www.facebook.com/v2.8/dialog/oauth?' +
      'client_id=928727850526775&' +
      'redirect_uri=' + loc.origin + '/%23/account/auth?ngid=0';
  }

  // # OAuth2 Client management
  isAuthorized(): boolean {
    let v = this.storeHelper.get(this.api.AUTH_HEADER_KEY);
    return Boolean(v);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    // let url: string = state.url;
    // let url = state.root;
    // route.params.forEach((params: Params) => {
    const isAuth = this.isAuthorized();

    if (!isAuth) {
      this.router.navigate(['auth']);
      return false;
    }
    return true;
  }

  setAuthTokens(tokenKey: string) {
    let tokenBearer: string = 'Bearer ' + tokenKey;

    this.storeHelper.update(this.api.AUTH_HEADER_KEY, tokenBearer);

    // sets the API headers to be based off of token
    this.api.updateAuth();
  }

  loginWithToken(token: string) {
    this.setAuthTokens(token);
    this.router.navigate(['sessions']);
  }

  signout() {
    this.storeHelper.update(this.api.AUTH_HEADER_KEY, '');

    this.router.navigate(['', 'auth']);
  }
}
