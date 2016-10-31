import { Component } from '@angular/core';
import { DataScrollerModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';

import { AppState } from '../app.service';
import { ApiService } from '../services';
import { Title } from './title';
import { XLarge } from './x-large';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent {
  cars;
  msgs;
  // Set our default values
  localState = { value: '' };

  constructor(
    public appState: AppState,
    public title: Title,
    private api: ApiService
  ) { }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
    this.loadData(null);
  }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
  }

  loadData(event) {
    // initialize
    if (!this.cars) {
      this.api.get(`http://localhost:8088/api/feed`)
        .do(res => (this.cars = res.rows))
        .do(res => (this.appState.set('feed', res.rows)))
        .subscribe();
    } else {
      let newArray = this.cars.slice(0);
      // this.api.get(`http://localhost:8088/api/feed`)
      //   .do(res => (newArray = res.rows))
      //   .do(res => (this.appState.add('feed', res.rows)))
      //   .subscribe();
      console.log(newArray);
      for (let i = 0; i < newArray.length; i++) {
        this.cars.push(newArray[i]);
      }
      this.msgs = [];
      this.msgs.push({ severity: 'info', summary: 'Data Loaded', detail: 'Between ' + event.first + ' and ' + (event.first + event.rows) });
    }
  }
}
