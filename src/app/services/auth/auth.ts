import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Para leer el token si hace falta

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth'; // Tu backend Java
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  // 1. Método para Iniciar Sesión
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  // 2. Método para Registrarse (Opcional por ahora)
  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  // 3. Guardar Token en el navegador
  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // 4. Obtener Token (para usarlo luego)
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // 5. Cerrar Sesión
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // 6. Verificar si está logueado
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token; // Devuelve true si existe, false si es null
  }
}