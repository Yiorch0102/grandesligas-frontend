import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo } from '../equipos/equipo'; 

export interface Jugador {
  id: number;
  nombre: string;
  edad: number;
  posicion: string;
  equipo?: Equipo; 
}

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  private apiUrl = 'http://localhost:8080/api/jugadores';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(this.apiUrl);
  }

  create(jugador: any): Observable<Jugador> {
    return this.http.post<Jugador>(this.apiUrl, jugador);
  }

  update(id: number, jugador: any): Observable<Jugador> {
    return this.http.put<Jugador>(`${this.apiUrl}/${id}`, jugador);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}