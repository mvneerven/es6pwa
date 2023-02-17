import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
import { routerTopics } from "../router";

export class Link extends LitElement {
  @property({ type: String })
  location: string | undefined;

  constructor() {
    super();
  }

  render() {
    return html`
      <a
        @click=${this.handleClick}
        href=${this.location || window.location.pathname}
        ><slot></slot
      ></a>
    `;
  }

  handleClick(e: Event & { target: HTMLAnchorElement }) {
    e.preventDefault();
    if (window.location.pathname !== location.href) {
      routerTopics.goTo.publish(this.location, this.tagName);
    }
  }
}

customElements.define("pwa-link", Link);
