import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { authGuard } from '../guards/auth.guard';
import { CreateOrderComponent } from '../pages/create-order/create-order.component';
import { UpdateOrderComponent } from '../pages/update-order/update-order.component';

export const routes: Routes = [
  // Default route (e.g., http://localhost:4200/)
  { path: '', component: HomeComponent, title: 'Home Page' },

  // Route for the Login page (e.g., http://localhost:4200/login)
  { path: 'login', component: LoginComponent, title: 'Login' },

  // Route for the Register page (e.g., http://localhost:4200/register)
  { path: 'register', component: RegisterComponent, title: 'Register' },

  // Route for the Dashboard page (e.g., http://localhost:4200/dashboard)
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
    canActivate: [authGuard],
  },

  // Route for the Create Order page (e.g. http://localhost:4200/dashboard/create-order)
  {
    path: 'dashboard/create-order',
    component: CreateOrderComponent,
    title: 'Create Order',
    canActivate: [authGuard],
  },

  // Route for the Update Order page (e.g. http://localhost:4200/dashboard/update-order/:id)
  {
    path: 'dashboard/update-order/:id',
    component: UpdateOrderComponent,
    title: 'Update Order',
    canActivate: [authGuard],
  },

  // Optional: Wildcard route for a 404 Not Found page (must be the LAST route)
  //   { path: '**', redirectTo: '' }, // Redirects any unmatched path back to home
];
