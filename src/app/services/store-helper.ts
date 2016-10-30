import { Injectable } from '@angular/core';
import { AppState } from '../app.service';

@Injectable()
export class StoreHelper {
  constructor(private appState: AppState) { }

  get(prop) {
    return this.appState.state[prop];
  }

  update(prop, state) {
    const currentState = this.appState.state;
    this.appState.set(prop, state);
  }

  add(prop, state) {
    const currentState = this.appState.state;
    const collection = currentState[prop];

    if (collection == null) {
      // add new item to new collection
      this.appState.set(prop, [state]);
    } else {
      // update item in collection
      this.appState.set(prop, [state, ...collection]);
    }
  }

  findAndUpdateByName(prop, state) {
    const currentState = this.appState.state;
    const collection = currentState[prop];

    // Check collection exists
    if (collection == null) {
      // add new item to new collection
      this.appState.set(prop, state);
    } else {
      // update item in collection
      this.appState.set(prop, collection.map(item => {
        if (item.name !== state.name) {
          return item;
        }
        return Object.assign({}, item, state);
      }));
    }
  }

  findAndUpdate(prop, state) {
    const currentState = this.appState.state;
    const collection = currentState[prop];

    // Check collection exists
    if (collection == null) {
      // add new item to new collection
      this.appState.set(prop, state);
    } else {
      // update item in collection
      this.appState.set(prop, collection.map(item => {
        if (item.id !== state.id) {
          return item;
        }
        return Object.assign({}, item, state);
      }));
    }
  }

  findAndDelete(prop, id) {
    const currentState = this.appState.state;
    const collection = currentState[prop];
    this.appState.set(prop, collection.filter(item => item.id !== id));
  }

  findAndDeleteUser(prop, username) {
    const currentState = this.appState.state;
    const collection = currentState[prop];
    this.appState.set(prop, collection.filter(item => item.username !== username));
  }
}
