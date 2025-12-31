import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Liga } from '../ligas/liga'; 

export interface Entrenador {
  id: number;
  nombre: string;
  nacionalidad: string;
}


export interface Equipo {
  id: number;
  nombre: string;
  estadio: string;

  entrenador?: Entrenador; 
  liga: Liga; 
}

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private apiUrl = 'http://localhost:8080/api/equipos'; 

  constructor(private http: HttpClient) { }

  getAll(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.apiUrl);
  }

  create(equipo: any): Observable<Equipo> {
    return this.http.post<Equipo>(this.apiUrl, equipo);
  }

  update(id: number, equipo: any): Observable<Equipo> {
    return this.http.put<Equipo>(`${this.apiUrl}/${id}`, equipo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}