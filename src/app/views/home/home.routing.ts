import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';

import { AuthGuard } from '../../shared/guard/auth.guard';

export const HomeRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthGuard] }
];