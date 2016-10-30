import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StoreHelper, ApiService, AuthService } from '../services';

@Component({
  selector: 'auth-container',
  styles: [`
    .auth {
      height: 100%;
    }
    input {
      border-bottom: 1px solid lightgrey;
    }
    .ng-invalid.ng-dirty {
      border-bottom: 1px solid red;
    }
    form {
      width: 100%;
      border-radius: 2px;
      background-color: white;
      padding: 20px;
      height: 400px;
    }
    .inputs {
      height: 100%;
      position: relative;
    }
    .link {
      color: lightblue;
    }
    .link:hover {
      background-color: transparent;
    }
    .title {
      font-size: 28px;
      font-weight: 300;
      text-transform: capitalize;
    }
    .error {
      color: red;
      position: absolute;
      right: 20px;
    }
    .def-user-options {
      padding: 15px;
      border-radius: 2px;
      position: relative;
      color: white;
      margin: 20px;
    }
  `],
  template: `
    <div class="row center-xs middle-xs">
      <div
        class="def-user-options shadow-1 col-xs-4 title"
        [ngStyle]="{'background-color': 'gold'}"
        (click)="authenticate('')"
      >
        OAuth Login
      </div>
    </div>
  `
})
export class AuthCompoenent implements OnInit {

  mode: string = 'signin';
  linkText: string = 'Create an Account';

  constructor(
    private router: Router,
    private storeHelper: StoreHelper,
    private apiService: ApiService,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute
  ) {

    this.activatedRoute.queryParams.subscribe(
      (param: Params) => {
        if (param['access_token']) {
          console.log('Redirect login access_token: ' + param['access_token']);
          this.auth.loginWithToken(param['access_token']);
        }
      });
  }

  ngOnInit() { }

  authenticate() {
    this.auth.authenticate();
  }

}
