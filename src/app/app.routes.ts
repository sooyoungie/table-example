import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user/user.routes')
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'user'
  }
];