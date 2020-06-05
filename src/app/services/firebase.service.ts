import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

import { Usuario } from '../interfaces/usuario';

import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  usuario: firebase.User;

  constructor(
    private afauth: AngularFireAuth,
    private servAlert: AlertsService,
    private router: Router
  ) {
    this.isAuth()
      .then(
        user => this.usuario = user,
        err => err
      );
  }

  async loginEmailPwd(usuario: Usuario): Promise<boolean> {
    try {
      this.servAlert.getAlertLoading('info', 'Espere Por Favor');
      const auth = await this.afauth.signInWithEmailAndPassword(usuario.email, usuario.password);
      this.usuario = auth.user;
      this.servAlert.closeAlert();
      this.router.navigate(['/home']);
      return true;
    } catch (error) {
      this.servAlert.closeAlert();
      this.servAlert.getAlert('error', error.code);
      return false;
    }
  }

  async loginGoogle(): Promise<boolean> {
    try {
      this.servAlert.getAlertLoading('info', 'Iniciando sesion con Google');
      const auth: firebase.auth.UserCredential = await this.afauth.signInWithPopup( new firebase.auth.GoogleAuthProvider() );
      this.usuario = auth.user;
      this.servAlert.closeAlert();
      this.router.navigate(['/home']);
      return true;
    } catch (error) {
      this.servAlert.closeAlert();
      this.servAlert.getAlert('error', error.code);
      return false;
    }
  }

  async signupEmailPwd(user: Usuario): Promise<boolean> {
    try {
      this.servAlert.getAlertLoading('info', 'Espere Por Favor');
      const auth: firebase.auth.UserCredential = await this.afauth.createUserWithEmailAndPassword(user.email, user.password);
      this.usuario = auth.user;
      this.usuario.sendEmailVerification();
      this.usuario.updateProfile({
        displayName: user.displayName
      });
      this.servAlert.closeAlert();
      this.router.navigate(['/home']);
    } catch (error) {
      this.servAlert.closeAlert();
      this.servAlert.getAlert('error', error.code);
      return false;
    }
  }

  isAuth(): Promise<firebase.User> {
    return new Promise( (resolve, reject) => {
      this.afauth.authState
        .subscribe(
          res => resolve(res),
          err => reject(err)
        );
    } );
  }

  async logout(): Promise<boolean> {
    try {
      await this.afauth.signOut();
      this.usuario = null;
      this.router.navigate(['/login']);
      return true;
    } catch (error) {
      this.servAlert.getAlert('error', 'Algo salio mal');
      return false;
    }
  }

  async updatePwd(pwd: string) {
    try {
      this.servAlert.getAlertLoading('info', 'Espere Por Favor');
      await this.usuario.updatePassword(pwd);
      this.servAlert.closeAlert();
      this.servAlert.getAlert('success', 'Password actualizado con exito');
    } catch (error) {
      this.servAlert.closeAlert();
      this.servAlert.getAlert('error', error.message);
      return false;
    }
  }

  async updateProfile(displayName: string) {
    try {
      this.servAlert.getAlertLoading('info', 'Espere Por Favor');
      await this.usuario.updateProfile({
        displayName
      });
      this.servAlert.closeAlert();
      this.servAlert.getAlert('success', 'Datos actualizados con exito');
    } catch (error) {
      this.servAlert.closeAlert();
      this.servAlert.getAlert('error', error.message);
      return false;
    }
  }

}
