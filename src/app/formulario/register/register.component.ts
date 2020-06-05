import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register: FormGroup;

  // Errors
  submit = false;
  displayName = {
    error: false,
    text: ''
  };
  email = {
    error: false,
    text: ''
  };
  pwd = {
    error: false,
    text: ''
  };
  pwd2 = {
    error: false,
    text: ''
  };

  // Errors

  constructor(
    private servAuth: FirebaseService
  ) { }

  ngOnInit(): void {
    this.register = new FormGroup({
      displayName: new FormControl(null, Validators.required),
      email: new FormControl(null, [ Validators.required, Validators.email ]),
      pwd: new FormControl(null, [ Validators.required, Validators.minLength(8), Validators.maxLength(20) ]),
      pwd2: new FormControl(null, [ Validators.required, Validators.minLength(8), Validators.maxLength(20) ])
    }, {
        validators: [this.sonIguales('pwd', 'pwd2')]
    } );
  }

  async submitRegister() {
    this.submit = true;
    this.activateErrors();
    if (this.register.invalid) {
      return;
    }
    const user: Usuario = {
      displayName: this.register.controls.displayName.value,
      email: this.register.controls.email.value,
      password: this.register.controls.pwd.value
    };
    await this.servAuth.signupEmailPwd(user);
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

  // Errors

  activateErrors() {
    this.displayName = this.retornoError('displayName');
    this.email = this.retornoError('email');
    this.pwd = this.retornoError('pwd');
    this.pwd2 = this.retornoError('pwd2');
  }

  retornoError(param: string) {
    if ( this.register.controls[param].errors?.required ) {
      return {
        error: true,
        text: `El campo ${param} es requerido`
      };
    } else if ( this.register.controls[param].errors?.email ) {
      return {
        error: true,
        text: `Debe ingresar un correo valido`
      };
    } else if (this.register.controls[param].errors?.minlength) {
      return {
        error: true,
        text: `
        Debe tener como minimo ${this.register.controls[param].errors?.minlength.requiredLength}
        caracteres, pero solo se detectaron ${this.register.controls[param].errors?.minlength.actualLength}
        caracteres`
      };
    } else if (this.register.errors?.sonIguales && (param === 'pwd' || param === 'pwd2') ) {
      return {
        error: true,
        text: `Las contraseñas ingresadas no coinciden`
      };
    } else {
      return {
        error: false,
        text: ''
      };
    }
  }

}
