import { LitElement, html } from "lit";
import { customElement, eventOptions } from "lit/decorators.js";

@customElement("pwa-name-editor")
export class NameEditor extends LitElement {
  render() {
    return html`
      <label for="name">Enter your name:</label>
      <input id="name" type="text" @change=${this.handleChange} />
    `;
  }

  @eventOptions({ passive: true })
  handleChange(e: Event & { target: HTMLInputElement }) {
    const nameChanged = new CustomEvent("nameChanged", {
      detail: { name: e.target.value },
      composed: true,
      bubbles: true,
    });
    this.dispatchEvent(nameChanged);
  }
}
