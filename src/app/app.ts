import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

import { AuthService } from './services/auth/auth'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule], 
  templateUrl: './app.html', // Verifica que se llame app.html y no app.component.html
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  
  showLayout = true;

  constructor(
    private router: Router,
    private authService: AuthService 
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      
      const url = event.urlAfterRedirects;
      
      // CORRECCIÓN: Cerramos el paréntesis del console.log y pasamos la variable url
      console.log('📍 URL Detectada:', url);

      // Lógica para ocultar menú en login/register
      if (url.includes('/login') || url.includes('/register')) {
        this.showLayout = false;
      } else {
        this.showLayout = true;
      }
      
      console.log('🎨 showLayout ahora es:', this.showLayout);
    });
  }

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }
}