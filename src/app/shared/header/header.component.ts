import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FirebaseService } from '../../services/firebase.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  search: FormGroup;

  constructor(
    private router: Router,
    private servAuth: FirebaseService
  ) { }

  ngOnInit(): void {
    this.search = new FormGroup({
      search: new FormControl(null, Validators.required)
    });
  }

  submitSearch() {
    if (this.search.invalid) {
      return;
    }
    this.router.navigate(['/home/search', this.search.controls.search.value]);
    $('#navbarToggleExternalContent').collapse('hide');
  }

  hide() {
    $('#navbarSupportedContent').collapse('hide');
  }

  async logout() {
    await this.servAuth.logout();
  }

}
