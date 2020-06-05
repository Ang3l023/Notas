import { Injectable } from '@angular/core';

import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  getAlert(icon: SweetAlertIcon, text: string) {
    Swal.fire({
      icon,
      text
    });
  }

  getAlertTitle(icon: SweetAlertIcon, text: string, title: string) {
    Swal.fire({
      icon,
      title,
      text
    });
  }

  getAlertTitleHtml(icon: SweetAlertIcon, html: string, title: string) {
    Swal.fire({
      icon,
      title,
      html
    });
  }

  getAlertHtml(icon: SweetAlertIcon, html: string) {
    Swal.fire({
      icon,
      html
    });
  }

  getAlertLoading(icon: SweetAlertIcon, text: string, title?: string) {
    Swal.fire({
      icon,
      title,
      text
    });
    Swal.showLoading();
  }

  closeAlert() {
    Swal.close();
  }

}
