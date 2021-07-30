import { Alert } from './Alert.js';
import validator from 'validator';

export class ContactForm {
  constructor() {
    this.form = document.querySelector(`form.contact-form`);
    this.errors = [];
  }

  watchSubmit() {
    if (!this.form) return;

    this.form.addEventListener('submit', e => {
      e.preventDefault();

      this.clearErrors();
      this.validate();

      if (this.errors.length > 0) {
        const alert = new Alert(this.errors);
        alert.show();
        return;
      }

      Alert.removeExistingAlert();
      this.form.submit();
    });
  }

  clearErrors() {
    this.errors = [];
  }

  validate() {
    const name = this.form.querySelector('input#name').value;
    const email = this.form.querySelector('input#email').value;
    const phone = this.form.querySelector('input#phone').value;

    if (!name) this.errors.push('Nome necessário.');

    if (email && !validator.isEmail(email))
      this.errors.push('E-mail inválido.');

    if (!email && !phone)
      this.errors.push(
        'Ao menos um meio de contato deve ser fornecido: e-mail ou telefone.'
      );
  }
}
