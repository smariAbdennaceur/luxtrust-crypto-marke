import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ProfileComponent } from './features/user/profile/profile.component';
import { SellComponent } from './features/market/sell/sell.component';
import { BuyComponent } from './features/market/buy/buy.component';
import { UserDetailsComponent } from './features/admin/user-details/user-details.component';
import { ListComponent } from './features/market/list/list.component';
import { DetailsComponent } from './features/market/details/details.component';

import { UserGuard } from './core/guards/user.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user', component: ProfileComponent, canActivate: [UserGuard] },
    {
      path: 'market',
      children: [
        { path: '', component: ListComponent },
        { path: 'sell', component: SellComponent, canActivate: [UserGuard] },
        { path: 'buy/:id', component: BuyComponent, canActivate: [UserGuard] },
        { path: 'details/:id', component: DetailsComponent }
      ]
    },
    {
      path: 'admin/user/:username',
      component: UserDetailsComponent,
      canActivate: [AdminGuard]
    },
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: '**', redirectTo: 'register' }
  ];
  


