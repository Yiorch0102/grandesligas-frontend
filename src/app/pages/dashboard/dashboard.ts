import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { LigaService, Liga } from '../../services/ligas/liga'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  ligas: Liga[] = [];
  loading = true;

  nuevaLiga = {
    nombre: '',
    pais: '',
    presidente: ''
  };

  ligaSeleccionada = {
    id: 0,
    nombre: '',
    pais: '',
    presidente: ''
  };

  constructor(
    private ligaService: LigaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarLigas();
  }

  cargarLigas() {
    this.ligaService.getAll().subscribe({
      next: (data) => {
        this.ligas = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  borrarLiga(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.ligaService.delete(id).subscribe({
          next: () => {
            this.ligas = this.ligas.filter(l => l.id !== id);
            this.cdr.detectChanges();
            
            Swal.fire(
              '¡Eliminado!',
              'La liga ha sido eliminada.',
              'success'
            );
          },
          error: (err) => {
            console.error('Error:', err);
            Swal.fire('Error', 'No se pudo eliminar la liga', 'error');
          }
        });
      }
    });
  }

  guardarLiga() {
    this.ligaService.create(this.nuevaLiga).subscribe({
      next: (ligaCreada) => {
        this.ligas.push(ligaCreada);
        this.nuevaLiga = { nombre: '', pais: '', presidente: '' };
        
        document.getElementById('cerrarModal')?.click();
        
        this.cdr.detectChanges();
        
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Liga creada con éxito',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (err) => {
        console.error('Error al crear:', err);
        
        Swal.fire('Error', 'Error al guardar la liga', 'error');
      }
    });
  }

  abrirEditar(liga: Liga) {
    this.ligaSeleccionada = { ...liga };
  }

  actualizarLiga() {
    this.ligaService.update(this.ligaSeleccionada.id, this.ligaSeleccionada).subscribe({
      next: (ligaActualizada) => {
        const index = this.ligas.findIndex(l => l.id === ligaActualizada.id);
        if (index !== -1) {
          this.ligas[index] = ligaActualizada;
        }
   
        document.getElementById('cerrarModalEditar')?.click();
        
        this.cdr.detectChanges();
        
      
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Liga actualizada correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (err) => {
        console.error('Error al editar:', err);
        
        Swal.fire('Error', 'No se pudo actualizar la liga', 'error');
      }
    });
  }
}