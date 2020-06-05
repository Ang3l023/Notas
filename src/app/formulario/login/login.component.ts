import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FirebaseService } from '../../services/firebase.service';

import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  recordar = false;
  errors = false;

  login: FormGroup;
  user: Usuario = {
    displayName: '',
    email: '',
    password: ''
  };

  constructor(
    private servAuth: FirebaseService
  ) {
    this.getRecordar();
  }

  ngOnInit(): void {
    this.login = new FormGroup({
      email: new FormControl(this.user.email, [ Validators.required, Validators.email ]),
      pwd: new FormControl(this.user.password, [ Validators.required, Validators.minLength(8), Validators.maxLength(20) ]),
      remember: new FormControl(this.recordar)
    });
  }

  async submitForma() {
    if (this.login.invalid) {
      this.errors = true;
      this.user.password = '';
      return;
    }
    this.errors = false;
    this.setRecordar(this.login.controls.remember.value, this.login.controls.email.value );
    this.user.email = this.login.controls.email.value;
    this.user.password = this.login.controls.pwd.value;
    await this.servAuth.loginEmailPwd(this.user);
  }

  async submitGoogle() {
    await this.servAuth.loginGoogle();
  }

  getRecordar() {
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.recordar = true;
    }
  }

  setRecordar(remember: boolean, email: string) {
    if (remember) {
      localStorage.setItem('email', email);
    }
  }

}
