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

    <input type="text" pInputText/>
    <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>

    <footer>
      <span>Created by <a [href]="url">ADI CHEO</a></span>
    </footer>
  `
})
export class AppComponent {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://adicheo.com';
  private menuItems: MenuItem[];
  private locItems: MenuItem[];



  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
    this.locItems = [];
    this.locItems.push({label: 'Categories'});
    this.locItems.push({label: 'Sports'});
    this.locItems.push({label: 'Football'});
    this.locItems.push({label: 'Countries'});
    this.locItems.push({label: 'Spain'});
    this.locItems.push({label: 'F.C. Barcelona'});
    this.locItems.push({label: 'Squad'});
    this.locItems.push({label: 'Lionel Messi',
      url: 'https://en.wikipedia.org/wiki/Lionel_Messi'});

    this.menuItems = [
      {label: 'Index', icon: 'fa-download', routerLink: ['./']},
      {label: 'Home', icon: 'fa-download', routerLink: ['./home']},
      {label: 'Detail', icon: 'fa-download', routerLink: ['./detail']},
      {label: 'About', icon: 'fa-download', routerLink: ['./about']},
      {
        label: 'File',
        icon: 'fa-file-o',
        items: [{
          label: 'New',
          icon: 'fa-plus',
          items: [
            { label: 'Project' },
            { label: 'Other' },
          ]
        },
        { label: 'Open' },
        { label: 'Quit' }
        ]
      },
      {
        label: 'Edit',
        icon: 'fa-edit',
        items: [
          { label: 'Undo', icon: 'fa-mail-forward' },
          { label: 'Redo', icon: 'fa-mail-reply' }
        ]
      },
      {
        label: 'Help',
        icon: 'fa-question',
        items: [
          {
            label: 'Contents'
          },
          {
            label: 'Search',
            icon: 'fa-search',
            items: [
              {
                label: 'Text',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: 'File'
              }
            ]
          }
        ]
      },
      {
        label: 'Actions',
        icon: 'fa-gear',
        items: [
          {
            label: 'Edit',
            icon: 'fa-refresh',
            items: [
              { label: 'Save', icon: 'fa-save' },
              { label: 'Update', icon: 'fa-save' },
            ]
          },
          {
            label: 'Other',
            icon: 'fa-phone',
            items: [
              { label: 'Delete', icon: 'fa-minus' }
            ]
          }
        ]
      },
      {
        label: 'Quit', icon: 'fa-minus'
      }
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
