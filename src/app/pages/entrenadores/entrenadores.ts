import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { EntrenadorService, Entrenador } from '../../services/entrenadores/entrenador'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entrenadores',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './entrenadores.html',
  styleUrl: './entrenadores.css'
})
export class EntrenadoresComponent implements OnInit {

  entrenadores: Entrenador[] = [];
  loading = true;

  // Objeto para Crear
  nuevoEntrenador = {
    nombre: '',
    nacionalidad: ''
  };

  // Objeto para Editar
  entrenadorSeleccionado = {
    id: 0,
    nombre: '',
    nacionalidad: ''
  };

  constructor(
    private entrenadorService: EntrenadorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarEntrenadores();
  }

  cargarEntrenadores() {
    this.entrenadorService.getAll().subscribe({
      next: (data) => {
        this.entrenadores = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  borrarEntrenador(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Si borras al DT, el equipo se quedará sin entrenador.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, despedir'
    }).then((result) => {
      if (result.isConfirmed) {
        this.entrenadorService.delete(id).subscribe(() => {
          this.cargarEntrenadores(); 
          Swal.fire('¡Eliminado!', 'El entrenador ha sido eliminado.', 'success');
        });
      }
    });
  }

  guardarEntrenador() {
    this.entrenadorService.create(this.nuevoEntrenador).subscribe({
      next: () => {
        document.getElementById('cerrarModalCrear')?.click();
        Swal.fire('Éxito', 'Entrenador registrado', 'success');
        this.cargarEntrenadores();
        this.nuevoEntrenador = { nombre: '', nacionalidad: '' }; 
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo guardar', 'error');
      }
    });
  }

  abrirEditar(entrenador: Entrenador) {

    this.entrenadorSeleccionado = { ...entrenador };
  }

  actualizarEntrenador() {
    this.entrenadorService.update(this.entrenadorSeleccionado.id, this.entrenadorSeleccionado).subscribe({
      next: () => {
        document.getElementById('cerrarModalEditar')?.click();
        Swal.fire('Actualizado', 'Datos del entrenador modificados', 'success');
        this.cargarEntrenadores();
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar', 'error');
      }
    });
  }
}