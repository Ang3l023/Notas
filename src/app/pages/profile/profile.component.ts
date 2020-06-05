import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FirebaseService } from '../../services/firebase.service';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  usuario: firebase.User;

  texto = 'Editar Datos';
  fecha = new Date();

  newUser: { displayName: string } = {
    displayName: ''
  };

  frmDP: FormGroup;
  frmUpdPwd: FormGroup;
  pwdNew = '';
  pwd2New = '';

  constructor(
    private servAuth: FirebaseService,
    private servAlert: AlertsService
  ) { }

  ngOnInit(): void {
    this.initForms();
  }

  async actualizarCambios() {
    if (this.frmDP.invalid) {
      return;
    }
    this.newUser = {
      displayName: this.frmDP.controls.displayName.value
    };
    const resp = await this.servAuth.updateProfile(this.newUser.displayName);
    this.newUser = {
      displayName: this.usuario.displayName
    };
  }

  async actualizarPwd() {
    if (this.frmUpdPwd.invalid) {
      if (this.frmUpdPwd.errors?.sonIguales) {
        this.servAlert.getAlert('error', 'Las contraseñas no coinciden');
      } else if (this.frmUpdPwd.controls.password.errors?.minlength) {
        this.servAlert.getAlert(
          'error',
          `Se requieren
          ${this.frmUpdPwd.controls.password.errors?.minlength.requiredLength} cáracteres
          y solo se detectaron
          ${this.frmUpdPwd.controls.password.errors?.minlength.actualLength} cárcteres`);
      }
      return;
    }
    this.pwdNew = this.frmUpdPwd.controls.password.value;

    const resp = await this.servAuth.updatePwd(this.pwdNew);

    this.pwdNew = '';
    this.pwd2New = '';

  }

  initForms() {
    this.usuario = this.servAuth.usuario || null;
    this.frmDP = new FormGroup({
      displayName: new FormControl(this.usuario.displayName, Validators.required)
    });
    this.frmUpdPwd = new FormGroup({
      password: new FormControl(this.pwdNew, [Validators.required, Validators.minLength(8)]),
      password2: new FormControl(this.pwd2New, [Validators.required, Validators.minLength(8)])
    }, {
      validators: [this.sonIguales('password', 'password2')]
    });
  }

  cambiarTexto() {
    if (this.texto === 'Actualizar Password') {
      this.texto = 'Editar Datos';
    } else {
      this.texto = 'Actualizar Password';
    }
  }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }

}
