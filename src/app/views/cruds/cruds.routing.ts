import { Routes } from '@angular/router';
import { CrudNgxTableComponent } from './crud-ngx-table/crud-ngx-table.component';

export const CrudsRoutes: Routes = [
  { 
    path: '',
    component: CrudNgxTableComponent, 
    data: { title: 'Users', breadcrumb: 'NgX Table' }
  }
];