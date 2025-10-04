import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';

export const routes: Routes = [
  // Default route (e.g., http://localhost:4200/)
  { path: '', component: HomeComponent, title: 'Home Page' },

  // Route for the About page (e.g., http://localhost:4200/login)
  { path: 'login', component: LoginComponent, title: 'Login' },

  // Route for the Contact page (e.g., http://localhost:4200/register)
  { path: 'register', component: RegisterComponent, title: 'Register' },

  // Route for the Dashboard page (e.g., http://localhost:4200/dashboard)
  { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },

  // Optional: Wildcard route for a 404 Not Found page (must be the LAST route)
  //   { path: '**', redirectTo: '' }, // Redirects any unmatched path back to home
];
