import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
import { goTo } from "../router";

export class Link extends LitElement {
  @property({ type: String })
  location: string;

  constructor() {
    super();
  }

  render() {
    return html`
      <a @click=${this.handleClick} href=${this.location}><slot></slot></a>
    `;
  }

  handleClick(e: Event & { target: HTMLAnchorElement }) {
    e.preventDefault();
    if (window.location.pathname !== location.href) {
      goTo(this.location);
    }
  }
}

customElements.define("pwa-link", Link);
