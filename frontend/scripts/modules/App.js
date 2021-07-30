import { ContactForm } from './ContactForm.js';
import { DeleteContactHandler } from './DeleteContactHandler.js';
import { LoginForm } from './LoginForm.js';

export class App {
  static init() {
    const loginForm = new LoginForm();
    const contactForm = new ContactForm();
    const deleteContactHandler = new DeleteContactHandler();

    if (loginForm.form) loginForm.watchSubmit();
    if (contactForm.form) contactForm.watchSubmit();
    if (deleteContactHandler.form) deleteContactHandler.watchSubmit();
  }
}
