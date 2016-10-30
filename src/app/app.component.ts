/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';
import { MenuItem } from 'primeng/primeng';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css',
    '../../node_modules/primeng/resources/themes/vader/theme.css',
    '../../node_modules/primeng/resources/primeng.min.css'
  ],
  template: `
    <p-menubar [model]="menuItems"></p-menubar>
    <p-breadcrumb [model]="locItems"></p-breadcrumb>

    <main>
      <router-outlet></router-outlet>
    </main>

    <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>

    <footer>
      <span>Created by <a [href]="url">ADI CHEO</a></span>
    </footer>
  `
})
export class AppComponent {
  url = 'https://adicheo.com';
  private menuItems: MenuItem[];
  private locItems: MenuItem[];

  constructor(
    public appState: AppState) {
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
    this.locItems = [];
    this.locItems.push({ label: 'Categories' });

    this.menuItems = [
      { label: 'Index', icon: 'fa-download', routerLink: ['./'] },
      { label: 'User', icon: 'fa-download', routerLink: ['./user'] },
      { label: 'Home', icon: 'fa-download', routerLink: ['./home'] },
      { label: 'Detail', icon: 'fa-download', routerLink: ['./detail'] },
      { label: 'Auth', icon: 'fa-download', routerLink: ['./auth'] },
      { label: 'About', icon: 'fa-download', routerLink: ['./about'] }
    ];
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
