import { Routes } from '@angular/router';

export const routes: Routes = [



    {path: 'padre', loadComponent: () => import('./padre/padre').then(m => m.Padre)},

];
