export class Alert {
  constructor(messages) {
    this.messages = messages;
    this.alert = null;
  }

  static removeExistingAlert() {
    const existingAlert = document.querySelector('div.alert');

    if (!existingAlert) return;

    document.body.removeChild(existingAlert);
  }

  show() {
    if (!this.messages || this.messages.length == 0) return;

    Alert.removeExistingAlert();
    this.createAlert();
    this.appendAlert();
  }

  cleanupMessages() {
    for (const message in this.messages) {
      if (typeof message !== 'string') this.messages[message] = '';
    }

    this.messages = this.messages;
  }

  createAlert() {
    this.cleanupMessages();

    const div = document.createElement('div');
    div.classList.add('alert');
    div.setAttribute('role', 'alert');

    for (const message of this.messages) {
      const p = document.createElement('p');
      p.innerText = message;
      div.appendChild(p);
    }

    this.alert = div;
  }

  appendAlert() {
    const mainEl = document.querySelector('body > main');
    document.body.insertBefore(this.alert, mainEl);
  }
}
