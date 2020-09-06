import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';
import {Constants} from './constants/constants';

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './pages/home/home.module#HomeModule',
        data: {title: 'Ecommerce POC by Piyali Das'}
    },
    {
        path: 'login',
        loadChildren: './pages/login/login.module#LoginModule',
        canActivate: [LoginGuard],
        data: {title: 'Ecommerce login'}
    },
    {
        path: 'register',
        loadChildren: './pages/register/register.module#RegisterModule',
        canActivate: [LoginGuard],
        data: {title: 'Ecommerce Register'}
    },
    {
        path: 'products/:cat',
        loadChildren: './pages/products/product-list/product-list.module#ProductListModule',
        data: {title: 'of Ecommerce Online'}
    },
    {
        path: 'product/details/:id',
        loadChildren: './pages/products/product-details/product-details.module#ProductDetailsModule',
        data: {title: 'Product Details'}
    },
    {
        path: 'cart',
        loadChildren: './pages/cart/cart.module#CartModule',
        canActivate: [AuthGuard],
        data: {title: 'Ecommerce Cart'}
    },
    {
        path: 'admin',
        loadChildren: './admin/dashboard/dashboard.module#DashboardModule',
        data: {title: 'Ecommerce POC by Piyali Das'}
    },
    {
        path: '**',
        loadChildren: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [AuthGuard, LoginGuard, Constants]
})
export class AppRoutingModule { }
