import { LitElement, html } from "lit";

export class NameEditor extends LitElement {
  render() {
    return html`
      <label for="name">Type your name:</label>
      <input id="name" type="text" @change=${this.handleChange} />
    `;
  }

  /**
   *
   * @param {Event & {target: HTMLInputElement}} e
   */
  handleChange(e) {
    const nameChanged = new CustomEvent("nameChanged", {
      detail: { name: e.target.value },
      composed: true,
      bubbles: true,
    });
    this.dispatchEvent(nameChanged);
  }
}
customElements.define("pwa-name-editor", NameEditor);
