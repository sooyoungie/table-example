import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./user/user.routes')
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/not-found'
  }
];