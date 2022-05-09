'use strict';

export class Sweetalert {
  static resultMessage(icon, title, message) {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
      timer: 2000,
      showConfirmButton: false
    });
  }
}
