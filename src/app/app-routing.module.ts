import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/Pages/login/login.component';
import { LayoutComponent } from './Component/Pages/layout/layout.component';
import { DashboardComponent } from './Component/Pages/dashboard/dashboard.component';
import { authGuard } from './guard/auth.guard';
import { AdminDashboardComponent } from './Component/Pages/admin-dashboard/admin-dashboard.component';
import { SellerDashboardComponent } from './Component/Pages/seller-dashboard/seller-dashboard.component';
import { SellerFormComponent } from './Component/Pages/seller-form/seller-form.component';
import { DashLayoutComponent } from './Component/Pages/dash-layout/dash-layout.component';
import { AdminLayoutComponent } from './Component/Pages/admin-layout/admin-layout.component';
import { CartComponent } from './Component/Pages/cart/cart.component';
import { SignupComponent } from './Component/Pages/signup/signup.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path: 'sellerDashboard',
        component: SellerDashboardComponent,
        canActivate:[authGuard]
      },
      {
        path:'sellerform',
        component: SellerFormComponent,
        canActivate:[authGuard]
      }
    ]
  },
  {
    path:'',
    component:DashLayoutComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[authGuard]
      }
    ]
  },
  {
    path:'cart',
    component:CartComponent,
    canActivate:[authGuard]
  },
  {
    path:'',
    component:AdminLayoutComponent,
    children:[   
      {
        path: 'adminDasbhboard',
        component: AdminDashboardComponent,
        canActivate:[authGuard]
      }
    ]
  },
  {
    path:'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
