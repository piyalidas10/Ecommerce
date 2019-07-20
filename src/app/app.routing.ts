import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

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
        data: {title: 'Ecommerce login'}
    },
    {
        path: 'products/:cat',
        loadChildren: './pages/products/product-list/product-list.module#ProductListModule',
        data: {title: 'of Ecommerce Online'}
    },
    {
        path: 'product/details/:id',
        loadChildren: './pages/products/product-details/product-details.module#ProductDetailsModule'
    },
    {
        path: '**',
        loadChildren: './pages/pagenotfound/pagenotfound.module#PagenotfoundModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
