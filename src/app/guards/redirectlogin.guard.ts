import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';

import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectloginGuard implements CanLoad {

  constructor(
    private servAuth: FirebaseService,
    private router: Router
  ) { }

  async canLoad(
    route: Route,
    segments: UrlSegment[]): Promise<boolean> {
    const user = await this.servAuth.isAuth();
    if (user) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
