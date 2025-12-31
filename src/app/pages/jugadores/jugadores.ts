import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JugadorService, Jugador } from '../../services/jugadores/jugador';
import { EquipoService, Equipo } from '../../services/equipos/equipo'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jugadores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jugadores.html', 
  styleUrl: './jugadores.css'
})
export class JugadoresComponent implements OnInit {

  jugadores: Jugador[] = [];
  equipos: Equipo[] = []; 
  loading = true;


  nuevoJugador = {
    nombre: '',
    edad: null as any, 
    posicion: '',
    equipoId: ''       
  };

  
  jugadorSeleccionado = {
    id: 0,
    nombre: '',
    edad: null as any,
    posicion: '',
    equipoId: null as any
  };

  constructor(
    private jugadorService: JugadorService,
    private equipoService: EquipoService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
 
    this.jugadorService.getAll().subscribe(data => {
      this.jugadores = data;
      this.loading = false;
      this.cdr.detectChanges();
    });

    
    this.equipoService.getAll().subscribe(data => this.equipos = data);
  }

  borrarJugador(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se eliminará al jugador permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.jugadorService.delete(id).subscribe(() => {
          this.cargarDatos();
          Swal.fire('Eliminado', 'Jugador eliminado', 'success');
        });
      }
    });
  }

  guardarJugador() {
   
    if (!this.nuevoJugador.nombre || !this.nuevoJugador.equipoId) {
      Swal.fire('Error', 'Nombre y Equipo son obligatorios', 'error');
      return;
    }

    
    const payload = {
      nombre: this.nuevoJugador.nombre,
      edad: this.nuevoJugador.edad,
      posicion: this.nuevoJugador.posicion,
      equipo: {
        id: parseInt(this.nuevoJugador.equipoId) 
      }
    };

    this.jugadorService.create(payload).subscribe({
      next: () => {
        document.getElementById('cerrarModalCrear')?.click();
        Swal.fire('Éxito', 'Jugador fichado correctamente', 'success');
        this.cargarDatos();
        this.nuevoJugador = { nombre: '', edad: null, posicion: '', equipoId: '' };
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'No se pudo guardar', 'error');
      }
    });
  }

  abrirEditar(jugador: Jugador) {
   
    this.jugadorSeleccionado = {
      id: jugador.id,
      nombre: jugador.nombre,
      edad: jugador.edad,
      posicion: jugador.posicion,
      equipoId: jugador.equipo?.id 
    };
  }

  actualizarJugador() {
    const payload = {
      id: this.jugadorSeleccionado.id,
      nombre: this.jugadorSeleccionado.nombre,
      edad: this.jugadorSeleccionado.edad,
      posicion: this.jugadorSeleccionado.posicion,
      equipo: {
        id: parseInt(this.jugadorSeleccionado.equipoId)
      }
    };

    this.jugadorService.update(this.jugadorSeleccionado.id, payload).subscribe({
      next: () => {
        document.getElementById('cerrarModalEditar')?.click();
        Swal.fire('Actualizado', 'Datos actualizados', 'success');
        this.cargarDatos();
      },
      error: (err) => Swal.fire('Error', 'Fallo al actualizar', 'error')
    });
  }
}