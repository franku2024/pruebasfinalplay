import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, getDoc, docData, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Torneo } from './models/torneo'; // Asegúrate de importar el modelo correcto

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private torneosCollection = collection(this.firestore, 'torneos');

  constructor(private firestore: Firestore) {}

  // Función para guardar un torneo en Firestore
  crearTorneo(torneo: Torneo): Promise<any> {
    return addDoc(this.torneosCollection, torneo);
  }

  // Función para obtener todos los torneos
  obtenerTorneos(): Observable<Torneo[]> {
    return collectionData(this.torneosCollection, { idField: 'id' }) as Observable<Torneo[]>;
  }

  // Función para obtener un torneo por ID
  obtenerTorneoPorId(id: string): Observable<Torneo | undefined> {
    const torneoDocRef = doc(this.firestore, `torneos/${id}`);
    return docData(torneoDocRef, { idField: 'id' }) as Observable<Torneo | undefined>;
  }

  // Función para actualizar un torneo por ID
  actualizarTorneo(id: string, torneo: Partial<Torneo>): Promise<void> {
    const torneoDocRef = doc(this.firestore, `torneos/${id}`);
    return updateDoc(torneoDocRef, { ...torneo });
  }

  // Función para eliminar un torneo por ID
  eliminarTorneo(id: string): Promise<void> {
    const torneoDocRef = doc(this.firestore, `torneos/${id}`);
    return deleteDoc(torneoDocRef);
  }
}
