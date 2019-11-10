import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guard/auth.guard';


export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: './views/dashboard/dashboard.module#DashboardModule',
                data: { title: 'Dashboard', breadcrumb: 'DASHBOARD'}
            },
            {
                path: 'profile',
                loadChildren: './views/profile/profile.module#ProfileModule',
                data: { title: 'Profile', breadcrumb: 'PROFILE'}
            },
            {
                path: 'users',
                loadChildren: './views/cruds/cruds.module#CrudsModule',
                data: { title: 'Users', breadcrumb: 'USERS'}
            },
            {
                path: 'documents',
                loadChildren: './views/documents/document.module#DocumentModule',
                data: { title: 'Documents', breadcrumb: 'DOCUMENTS'}
            },
            {
                path: 'plans',
                loadChildren: './views/plans/plans.module#PlansModule',
                data: { title: 'Plans', breadcrumb: 'PLANS'}
            },
            {
                path: 'products',
                loadChildren: './views/products/products.module#ProductsModule',
                data: { title: 'Products', breadcrumb: 'PRODUCTS'}
            }
        ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: './views/sessions/sessions.module#SessionsModule',
        data: { title: 'Admin'}
      }
    ]
  },
  /*{
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        data: { title: 'Dashboard', breadcrumb: 'DASHBOARD'}
      },
      {
        path: 'material',
        loadChildren: './views/material/app-material.module#AppMaterialModule',
        data: { title: 'Material', breadcrumb: 'MATERIAL'}
      },
      {
        path: 'dialogs',
        loadChildren: './views/app-dialogs/app-dialogs.module#AppDialogsModule',
        data: { title: 'Dialogs', breadcrumb: 'DIALOGS'}
      },
      {
        path: 'profile',
        loadChildren: './views/profile/profile.module#ProfileModule',
        data: { title: 'Profile', breadcrumb: 'PROFILE'}
      },
      {
        path: 'others',
        loadChildren: './views/others/others.module#OthersModule',
        data: { title: 'Others', breadcrumb: 'OTHERS'}
      },
      {
        path: 'tables',
        loadChildren: './views/tables/tables.module#TablesModule',
        data: { title: 'Tables', breadcrumb: 'TABLES'}
      },
      {
        path: 'tour',
        loadChildren: './views/app-tour/app-tour.module#AppTourModule',
        data: { title: 'Tour', breadcrumb: 'TOUR'}
      },
      {
        path: 'forms',
        loadChildren: './views/forms/forms.module#AppFormsModule',
        data: { title: 'Forms', breadcrumb: 'FORMS'}
      },
      {
        path: 'charts',
        loadChildren: './views/charts/charts.module#AppChartsModule',
        data: { title: 'Charts', breadcrumb: 'CHARTS'}
      },
      {
        path: 'map',
        loadChildren: './views/map/map.module#AppMapModule',
        data: { title: 'Map', breadcrumb: 'MAP'}
      },
      {
        path: 'dragndrop',
        loadChildren: './views/dragndrop/dragndrop.module#DragndropModule',
        data: { title: 'Drag and Drop', breadcrumb: 'DND'}
      },
      {
        path: 'inbox',
        loadChildren: './views/app-inbox/app-inbox.module#AppInboxModule',
        data: { title: 'Inbox', breadcrumb: 'INBOX'}
      },
      {
        path: 'calendar',
        loadChildren: './views/app-calendar/app-calendar.module#AppCalendarModule',
        data: { title: 'Calendar', breadcrumb: 'CALENDAR'}
      },
      {
        path: 'chat',
        loadChildren: './views/app-chats/app-chats.module#AppChatsModule',
        data: { title: 'Chat', breadcrumb: 'CHAT'}
      },
      {
        path: 'cruds',
        loadChildren: './views/cruds/cruds.module#CrudsModule',
        data: { title: 'CRUDs', breadcrumb: 'CRUDs'}
      },
      {
        path: 'shop',
        loadChildren: './views/shop/shop.module#ShopModule',
        data: { title: 'Shop', breadcrumb: 'SHOP'}
      },
      {
        path: 'icons',
        loadChildren: './views/mat-icons/mat-icons.module#MatIconsModule',
        data: { title: 'Icons', breadcrumb: 'MATICONS'}
      }
    ]
  },*/
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

