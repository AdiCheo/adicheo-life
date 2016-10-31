import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AuthCompoenent } from './auth';
import { UserComponent } from './user';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: ':token', component: AuthCompoenent },
  { path: 'auth', component: AuthCompoenent },

  { path: '', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'detail', loadChildren: () => System.import('./+detail').then((comp: any) => {
      return comp.default;
    })
    ,
  },
  { path: '**', component: NoContentComponent },
];
