import { Routes } from '@angular/router';

export const routes: Routes = [





    {path: '', loadComponent: () => import('./views/login/login.component').then(m => m.LoginComponent)},
    {path: 'padre', loadComponent: () => import('./views/padre/padre').then(m => m.Padre)},

];
