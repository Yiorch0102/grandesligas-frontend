import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Liga {
  id: number;
  nombre: string;
  pais: string;
  presidente: string;
}

@Injectable({
  providedIn: 'root'
})
export class LigaService {

  private apiUrl = 'http://localhost:8080/api/ligas';

  constructor(private http: HttpClient) { }

  // Obtener todas las ligas
  getAll(): Observable<Liga[]> {
    return this.http.get<Liga[]>(this.apiUrl);
  }

  // Crear una liga
  create(liga: any): Observable<Liga> {
    return this.http.post<Liga>(this.apiUrl, liga);
  }

  // Editar
  update(id: number, liga: any): Observable<Liga> {
    return this.http.put<Liga>(`${this.apiUrl}/${id}`, liga);
  }

  // Eliminar
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}