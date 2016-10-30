import { TestBed, inject } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';

import { StoreHelper, ApiService, AuthService, SseService, MediaService, UserService } from '../services';

// Load the implementations that should be tested
import { AppState } from '../app.service';
import { AuthCompoenent } from './auth.component';

describe('AuthCompoenent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http,
        useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      StoreHelper,
      ApiService,
      AuthService,
      SseService,
      MediaService,
      UserService,
      AppState,
      AuthCompoenent
    ],
    imports: [RouterTestingModule]
  }));

  it('should look at console', inject([AuthCompoenent], (auth) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();
  }));
});
