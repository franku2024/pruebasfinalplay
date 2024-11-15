import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Torneo, Equipo } from '../models/torneo'; // Asegúrate de importar Equipo
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-torneo-modal',
  templateUrl: './crear-torneo-modal.component.html',
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class CrearTorneoModalComponent {
  @Input() nuevoTorneo: Torneo = {
    nombre: '',
    descripcion: '',
    fotoTorneoUrl: '',
    cantidadEP: 4, // Valor inicial de la cantidad de equipos
    equipos: []    // Lista de equipos vacía inicialmente
  };
  
  @Output() torneoCreado: EventEmitter<Torneo> = new EventEmitter<Torneo>();

  equipos: Equipo[] = [];

  // Función que actualiza la cantidad de equipos cuando cambia la selección
  actualizarEquipos() {
    const cantidadEquipos = this.nuevoTorneo.cantidadEP;

    // Crear o eliminar equipos según la cantidad seleccionada
    while (this.equipos.length < cantidadEquipos) {
      this.equipos.push({ nombre: '', fotoEquipoUrl: '' }); // Crear un nuevo objeto Equipo vacío
    }
    while (this.equipos.length > cantidadEquipos) {
      this.equipos.pop(); // Eliminar equipos si es necesario
    }
  }

  // Llamar a actualizarEquipos cuando cambie la cantidad seleccionada
  ngOnChanges() {
    this.actualizarEquipos();
  }

  agregarEquipo() {
    if (this.equipos.length < this.nuevoTorneo.cantidadEP) {
      this.equipos.push({ nombre: '', fotoEquipoUrl: '' });
    }
  }

  eliminarEquipo(index: number) {
    this.equipos.splice(index, 1);
  }

  crearTorneo() {
    this.nuevoTorneo.equipos = [...this.equipos]; // Asigna los equipos a la propiedad del torneo
    this.torneoCreado.emit(this.nuevoTorneo); // Emite el torneo creado
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  constructor(private modalController: ModalController) {}
}
