import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  credentials = {
    email: '',    
    password: ''
  };

  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    console.log('Intentando loguear con:', this.credentials); 
    
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        console.log('¡Token recibido!', res);
        this.router.navigate(['/dashboard']); 
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorMessage = 'Usuario o contraseña incorrectos.';
      }
    });
  }
}