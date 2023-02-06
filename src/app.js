import { LitElement, css, html } from "lit";
import "./nameEditor";

class Es6PwaApp extends LitElement {
  static styles = css`
    p {
      color: blue;
    }
  `;

  static properties = {
    name: { type: String },
  };

  constructor() {
    super();
    this.name = "Somebody";
  }

  render() {
    return html`
      <p>Hello, ${this.name}!</p>
      <pwa-name-editor @nameChanged=${this.handleNameChange}></pwa-name-editor>
    `;
  }

  /**
   *
   * @param {CustomEvent<{ name: string; }>} e
   */
  handleNameChange(e) {
    console.log(e);
    this.name = e.detail.name;
  }
}

customElements.define("pwa-app", Es6PwaApp);
