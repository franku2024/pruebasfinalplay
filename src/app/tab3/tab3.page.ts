import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class Tab3Page implements OnInit {
  @ViewChild('modal', { static: false }) modal!: IonModal;
  formsReg: FormGroup;
  formLog: FormGroup;
  isRegister: boolean = true;  // Controla si el modal es para registro o logeo
  showSuccessAlert: boolean = false; // Variable para controlar la visibilidad del mensaje de éxito
  successMessage: string = ''; // Mensaje de éxito
  isAuthenticated: boolean = false;  // Variable para controlar la visibilidad del botón

  isModalVisible: boolean = false;


    // Variables para manejar el error alert
    showErrorAlert: boolean = false; // Controla si se muestra el error
    errorMessage: string = ''; // Mensaje de error

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.formsReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });

    this.formLog = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {}

    // Función para mostrar el mensaje de éxito
    showSuccess(message: string) {
      this.successMessage = message;
      this.showSuccessAlert = true;
      setTimeout(() => this.closeSuccessAlert(), 3000); // Cierra el mensaje después de 5 segundos
    }
  
    // Función para cerrar el mensaje de éxito
    closeSuccessAlert() {
      this.showSuccessAlert = false;
    }

      // Función para mostrar el alert de error
  showError(message: string) {
    this.errorMessage = message;
    this.showErrorAlert = true;
    setTimeout(() => this.closeErrorAlert(), 5000); // Cierra el mensaje después de 5 segundos
  }

  // Función para cerrar el alert de error
  closeErrorAlert() {
    this.showErrorAlert = false;
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }
  
  // Función para crear una cuenta en la base de datos de Firebase
  Registro() {
    this.authService.register(this.formsReg.value)
      .then(response => { 
        this.showSuccess('Registrado con exito!'); // Mostrar mensaje de éxito al registrarse
  this.isAuthenticated = true;  // Cambiar a true cuando el logeo es exitoso
        console.log('Registrado con exito',response);
      })
      .catch(error =>{ 
        this.showError('Error al registrarse'); // Muestra el mensaje de error
        console.log('ERROR AL REGISTRARSE',error)});
    console.log(this.formsReg.value);
  }

  // Función para validar las credenciales y logearse
  Logeo() {
    this.authService.Login(this.formLog.value)
      .then(response => {
        this.showSuccess('Logeado con exito!'); // Mostrar mensaje de éxito al logearse
        this.isAuthenticated = true;  // Cambiar a true cuando el logeo es exitoso
        console.log('Logeado con exito',response);
      })
      .catch(error => {
        this.showError('Error al Logearse'); // Muestra el mensaje de error
        console.log('Error al logearse',error)});
    console.log(this.formLog.value);
  }

  // Función para alternar entre registro y logeo
  toggleForm() {
    this.isRegister = !this.isRegister;  // Cambia entre registro y logeo
  }

  // Método que se llama cuando el modal está por mostrarse
  onWillPresent() {
    document.getElementById('content-background')?.setAttribute('inert', '');
  }

  // Método que se llama cuando el modal está por cerrarse
  onWillDismiss() {
    document.getElementById('content-background')?.removeAttribute('inert');
  }

  // Función para abrir el modal y determinar el estado (registro o logeo)
  openModal(formType: string) {
    this.isRegister = formType === 'register';
    this.modal.present(); // Abre el modal
  }
}
