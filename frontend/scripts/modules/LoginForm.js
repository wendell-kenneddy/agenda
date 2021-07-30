import { Alert } from './Alert.js';

export class LoginForm {
  constructor() {
    this.form = document.querySelector(`form.login-form`);
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
    const username = this.form.querySelector('input#name').value;
    const password = this.form.querySelector('input#password').value;
    const invalidPassword = password.length < 3 || password.length > 12;

    if (!username) this.errors.push('Nome necessário.');
    if (!password) this.errors.push('Senha necessário.');
    if (invalidPassword)
      this.errors.push('A senha deve conter entre 3 e 12 caracteres.');
  }
}
