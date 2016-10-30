import { Injectable } from '@angular/core';
import { StoreHelper } from './store-helper';
import { ApiService } from './api';
import 'rxjs/Rx';

@Injectable()
export class UserService {
  USERS_PATH: string;

  constructor(
    private storeHelper: StoreHelper,
    private api: ApiService
  ) {
  }

  // fetch all users
  getUsers() {
    // GET /users
    return this.api.get(this.USERS_PATH)
      .do(res => this.storeHelper.update('users', res));
  }
}
