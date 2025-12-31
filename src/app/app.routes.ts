import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { authGuard } from './core/guards/auth-guard'; 
import { EquiposComponent } from './pages/equipos/equipos';
import { EntrenadoresComponent } from './pages/entrenadores/entrenadores';
import { JugadoresComponent } from './pages/jugadores/jugadores';
import { RegisterComponent } from './auth/register/register';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    
    { path: 'register', component: RegisterComponent },
    
    { 
      path: 'dashboard', 
      loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
      canActivate: [authGuard] 
    },
    { 
      path: 'equipos', 
      component: EquiposComponent,
      canActivate: [authGuard] 
    },
    { 
      path: 'entrenadores', 
      component: EntrenadoresComponent, 
      canActivate: [authGuard] 
    },
    { 
      path: 'jugadores', 
      component: JugadoresComponent, 
      canActivate: [authGuard] 
    }

];