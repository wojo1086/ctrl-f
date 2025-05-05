import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'mice',
        loadComponent: () => import('./mice/mice.component').then(m => m.MiceComponent),
    }
];
