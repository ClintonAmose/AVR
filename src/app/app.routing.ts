import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'pages/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
