import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Torneo } from '../models/torneo';
import { FirestoreService } from '../firestore.service';
import { IonicModule } from '@ionic/angular'; 
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; 
import { CrearTorneoModalComponent } from '../crear-torneo-modal/crear-torneo-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule] 
})

export class Tab2Page {
  nuevoTorneo: Torneo = {
    nombre: '',
    descripcion: '',
    fotoTorneoUrl: '',
    cantidadEP: 0,
    equipos: [] 
  };

  torneos$: Observable<Torneo[]>;

  constructor(private firestoreService: FirestoreService, private modalController: ModalController) {
    this.torneos$ = this.firestoreService.obtenerTorneos(); 
  }

  // Método para abrir el modal de crear torneo
  async abrirModal() {
    const modal = await this.modalController.create({
      component: CrearTorneoModalComponent,
      componentProps: {
        nuevoTorneo: this.nuevoTorneo
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.firestoreService.crearTorneo(result.data).then(() => {
          console.log('Torneo creado con éxito');
        }).catch((error) => {
          console.error('Error al crear torneo:', error);
        });
      }
    });

    await modal.present();
  }

  // Método para agregar un equipo al torneo
  agregarEquipo() {
    if (this.nuevoTorneo && this.nuevoTorneo.equipos && this.nuevoTorneo.equipos.length < this.nuevoTorneo.cantidadEP) {
      this.nuevoTorneo.equipos.push({
        nombre: '',  
        fotoEquipoUrl: ''  
      });
    } else {
      alert('El número máximo de equipos es ' + this.nuevoTorneo.cantidadEP);
    }
  }

  // Método para eliminar un equipo
  eliminarEquipo(index: number) {
    if (this.nuevoTorneo && this.nuevoTorneo.equipos && this.nuevoTorneo.equipos.length > 0) {
      this.nuevoTorneo.equipos.splice(index, 1);
    }
  }
}
