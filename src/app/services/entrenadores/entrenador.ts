import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Entrenador {
  id: number;
  nombre: string;
  nacionalidad: string;
}

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {

  private apiUrl = 'http://localhost:8080/api/entrenadores';

  constructor(private http: HttpClient) { }


  getAll(): Observable<Entrenador[]> {
    return this.http.get<Entrenador[]>(this.apiUrl);
  }

 
  
  create(entrenador: any): Observable<Entrenador> {
    return this.http.post<Entrenador>(this.apiUrl, entrenador);
  }

  update(id: number, entrenador: any): Observable<Entrenador> {
    return this.http.put<Entrenador>(`${this.apiUrl}/${id}`, entrenador);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}