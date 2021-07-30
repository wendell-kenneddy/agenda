import { Alert } from './Alert.js';

export class DeleteContactHandler {
  constructor() {
    this.form = document.querySelector(`form.delete-form`);
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
    const password = this.form.querySelector('input#password').value;

    if (!password) this.errors.push('Senha necessária.');
  }
}
