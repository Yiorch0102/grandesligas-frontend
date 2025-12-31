import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { EquipoService, Equipo } from '../../services/equipos/equipo'; 
import { LigaService, Liga } from '../../services/ligas/liga'; 
import { EntrenadorService, Entrenador } from '../../services/entrenadores/entrenador'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './equipos.html', 
  styleUrl: './equipos.css'      
})
export class EquiposComponent implements OnInit {

  equipos: Equipo[] = [];
  ligas: Liga[] = [];            
  entrenadores: Entrenador[] = []; 
  loading = true;


  nuevoEquipo = {
    nombre: '',
    estadio: '',
    ligaId: '',       
    entrenadorId: ''  
  };

  
  equipoSeleccionado = {
    id: 0,
    nombre: '',
    estadio: '',
    ligaId: null as any,       
    entrenadorId: null as any  
  };

  constructor(
    private equipoService: EquipoService,
    private ligaService: LigaService,
    private entrenadorService: EntrenadorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
   
    this.equipoService.getAll().subscribe(data => {
      this.equipos = data;
      this.loading = false;
      this.cdr.detectChanges();
    });

 
    this.ligaService.getAll().subscribe(data => this.ligas = data);

   
    this.entrenadorService.getAll().subscribe(data => this.entrenadores = data);
  }

  borrarEquipo(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se borrará el equipo permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.equipoService.delete(id).subscribe(() => {
      
          this.cargarDatos(); 
          
          Swal.fire('¡Eliminado!', 'El equipo ha sido eliminado.', 'success');
        });
      }
    });
  }

  guardarEquipo() {
    if (!this.nuevoEquipo.ligaId || !this.nuevoEquipo.entrenadorId) {
      Swal.fire('Error', 'Debes seleccionar una Liga y un Entrenador', 'error');
      return;
    }

    const equipoParaEnviar = {
      nombre: this.nuevoEquipo.nombre,
      estadio: this.nuevoEquipo.estadio,
      liga: {
        id: parseInt(this.nuevoEquipo.ligaId)
      },
      entrenador: {
        id: parseInt(this.nuevoEquipo.entrenadorId)
      }
    };

    this.equipoService.create(equipoParaEnviar).subscribe({
      next: () => {
        document.getElementById('cerrarModalCrear')?.click();
        Swal.fire('Éxito', 'Equipo creado correctamente', 'success');
        this.cargarDatos(); // Recargar para ver nombres de liga/DT
        this.nuevoEquipo = { nombre: '', estadio: '', ligaId: '', entrenadorId: '' };
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'No se pudo crear el equipo', 'error');
      }
    });
  }



  abrirEditar(equipo: Equipo) {
    
    this.equipoSeleccionado = {
      id: equipo.id,
      nombre: equipo.nombre,
      estadio: equipo.estadio,
      
      ligaId: equipo.liga?.id,
      entrenadorId: equipo.entrenador?.id
    };
  }

  actualizarEquipo() {
    if (!this.equipoSeleccionado.ligaId || !this.equipoSeleccionado.entrenadorId) {
      Swal.fire('Error', 'Debes seleccionar una Liga y un Entrenador', 'error');
      return;
    }

   
    const equipoActualizado = {
      id: this.equipoSeleccionado.id,
      nombre: this.equipoSeleccionado.nombre,
      estadio: this.equipoSeleccionado.estadio,
      liga: {
        id: parseInt(this.equipoSeleccionado.ligaId)
      },
      entrenador: {
        id: parseInt(this.equipoSeleccionado.entrenadorId)
      }
    };

    this.equipoService.update(this.equipoSeleccionado.id, equipoActualizado).subscribe({
      next: () => {
        document.getElementById('cerrarModalEditar')?.click();
        Swal.fire('¡Actualizado!', 'El equipo ha sido actualizado.', 'success');
        this.cargarDatos(); 
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'No se pudo actualizar el equipo', 'error');
      }
    });
  }
}