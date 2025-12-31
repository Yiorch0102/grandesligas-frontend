import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; 
import { AuthService } from '../../services/auth/auth'; // Ajusta la ruta si es necesario
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  // 1. EL OBJETO AHORA COINCIDE CON TU SWAGGER
  usuario = {
    nombre: '',
    username: '',
    email: '',
    password: '',
    rol: 'USER' // Valor por defecto (puedes cambiarlo a 'ADMIN' o lo que use tu BD)
  };

  constructor(private authService: AuthService, private router: Router) {}

  registrar() {
    // 2. Validación más estricta
    if (!this.usuario.nombre || !this.usuario.username || !this.usuario.email || !this.usuario.password) {
      Swal.fire('Faltan datos', 'Por favor completa todos los campos.', 'warning');
      return;
    }

    console.log('Enviando datos:', this.usuario); // Para depurar en consola

    this.authService.register(this.usuario).subscribe({
      next: (respuesta) => {
        Swal.fire({
          title: '¡Bienvenido!',
          text: 'Cuenta creada con éxito. Ahora inicia sesión.',
          icon: 'success',
          confirmButtonText: 'Ir al Login'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        // Si sigue saliendo 403, es el Token/Interceptor. Si sale 400, es el JSON.
        Swal.fire('Error', 'No se pudo registrar. Revisa la consola.', 'error');
      }
    });
  }
}